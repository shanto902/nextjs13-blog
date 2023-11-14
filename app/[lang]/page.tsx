import PaddingContainer from "@/components/layout/PaddingContainer";
import Image from "next/image";
import PostList from "@/components/post/PostList";
import MainSlider from "@/components/elements/MainSlider";
import directus from "@/lib/directus";
import { notFound } from "next/navigation";
import magazineImage from "@/assets/magpic.png";
import { getDictionary } from "@/lib/getDictionary";
import Link from "next/link";
import { Banner, Post, Review, University } from "@/types/collection";
import { shimmer, toBase64 } from "@/utils/shimmer";

const HomePage = async ({
  params,
}: {
  params: {
    lang: string;
  };
}) => {
  const locale = params.lang;

  // FROM GETTING ALL STUDENTS POSTS
  const getAllPosts = async () => {
    try {
      const posts = await directus.items("post").readByQuery({
        filter: {
          status: {
            _eq: "published",
          },
        },
        fields: [
          "*",
          "author.id",
          "author.first_name",
          "author.last_name",
          "author.translations.first_name",
          "author.translations.last_name",
          "category.slug",
          "category.id",
          "category.title",
          "category.translations.*",
          "translations.*",
          "university.*",
        ],
      });
      if (locale === "en") {
        return posts?.data;
      } else {
        const localizedPost = posts?.data?.map((post: Post) => {
          return {
            ...post,
            title: post?.translations[0]?.title,
            description: post?.translations[0]?.description,
            body: post?.translations[0]?.body,
            author: {
              first_name: post?.author?.translations[0]?.first_name,
              last_name: post?.author?.translations[0]?.last_name,
            },
            category: {
              ...post.category,
              title: post?.category?.translations[0]?.title,
              description: post?.category?.translations[0]?.description,
            },
          };
        });
        return localizedPost;
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching posts");
    }
  };

  const posts = await getAllPosts();

  if (!posts) {
    notFound();
  }
  posts.sort(
    (a, b) =>
      new Date(a.date_created).getTime() - new Date(b.date_created).getTime(),
  );

  // FOR GET ALL UNIVERSITY BASED PROJECTS

  const homePage = await directus.singleton("home_page").read({
    fields: ["*"],
  });
  // const homePageData = getHomePageContents()

  const getStudentsProjectData = async () => {
    try {
      const university = await directus.items("university").readByQuery({
        filter: {
          status: {
            _eq: "published",
          },
        },
        fields: [
          "id",
          "name",
          "is_main_slider",
          "translations.*",
          "posts.id",
          "posts.image",
          "posts.cover_photo",
          "posts.slug",
          "posts.translations.*",
          "posts.category.id",
          "posts.category.title",
          "posts.category.slug",
          "posts.category.translations.*",
          "posts.university.name",
          "posts.university.id",
        ],
      });

      if (locale === "en") {
        return university?.data;
      } else {
        const localizedUniversity: University[] = (university?.data || []).map(
          (fetchedUniversity) => {
            return {
              ...fetchedUniversity,
              posts: (fetchedUniversity?.posts || []).map((post: Post) => {
                return {
                  ...post,
                  title: post?.translations[0]?.title,
                  category: post?.category
                    ? {
                        ...post?.category,
                        title: post?.category?.translations[0].title,
                      }
                    : "",
                  university: post?.university
                    ? {
                        ...post?.university,
                      }
                    : "",
                };
              }),
            };
          },
        );

        return localizedUniversity;
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching category");
    }
  };

  const universities = await getStudentsProjectData();
  if (!universities) {
    notFound();
  }

  const dictionary = await getDictionary(locale);

  const getAllBanners = async () => {
    try {
      const banners = await directus.items("banner").readByQuery({
        filter: {
          status: {
            _eq: "published",
          },
        },
        fields: ["*", "translations.*"],
      });

      if (locale === "en") {
        return banners?.data || [];
      } else {
        const localizedBanner = banners?.data?.map((banner: Banner) => {
          return {
            ...banner,
            title: banner?.translations[0]?.title,
            description: banner?.translations[0]?.description,
          };
        });

        return localizedBanner || [];
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching Banners");
    }
  };

  const banners = await getAllBanners();

  const getAllBookReview = async () => {
    try {
      const reviews = await directus.items("book_review").readByQuery({
        fields: ["*", "translations.*"],
      });

      if (locale === "en") {
        return reviews?.data || [];
      } else {
        const localizedReview = reviews?.data?.map((review: Review) => {
          return {
            ...review,
            title: review?.translations[0]?.title,
            review: review?.translations[0]?.review,
          };
        });

        return localizedReview || [];
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching reviews");
    }
  };

  const lastBookReview: Review = (await getAllBookReview()).slice(-1)[0];

  return (
    <PaddingContainer>
      <Image
        className=" object-cover object-center w-full mb-10"
        width={1980}
        height={760}
        alt="Cover Photo"
        src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${
          locale === "bn"
            ? homePage?.cover_photo
            : homePage?.cover_photo_english
        }?key=optimized`}
        placeholder={`data:image/svg+xml;base64,${toBase64(
          shimmer(1980, 760),
        )}`}
      />

      <div>
        <MainSlider banners={banners} locale={locale} />
      </div>

      <main className=" h-auto space-y-10 mt-10">
        <PostList
          universityId={homePage?.student_project_slider as string}
          locale={locale}
          posts={posts}
          universities={universities || []}
          studentProjects={posts || []}
          main_ad_photo={homePage?.main_ad_photo}
          main_ad_link={homePage?.main_ad_link}
        />

        <div className=" grid grid-cols-1 md:grid-cols-2 ">
          <div className=" order-last md:order-none px-5">
            <h2 className="text-2xl font-semibold  my-2 bg-base-100 text-center">
              {dictionary?.magazineHome?.title}
            </h2>

            <Image src={magazineImage} alt={"Magazine Picture"} />
            <div className=" mt-10  ">
              <div className="flex flex-row gap-5 my-4  justify-center">
                <Link
                  href={`/${locale}/published-magazine`}
                  className=" btn btn-sm font-normal  bg-accent text-secondary hover:text-accent "
                >
                  {dictionary?.magazineHome?.published}
                </Link>
                <Link
                  href={`/${locale}/archived`}
                  className=" btn  font-normal bg-accent btn-sm text-secondary hover:text-accent "
                >
                  {dictionary?.magazineHome?.website}
                </Link>
              </div>
            </div>
          </div>
          <div className="  md:border-l-2 px-5 place-item-end lg:pl-10 flex flex-col justify-between items-stretch h-full ">
            <h2 className=" text-2xl font-semibold  my-2 text-center">
              {dictionary?.mainBody?.bookReview}
            </h2>
            <Link href={`/${locale}/book-review`} className=" self-center">
              <Image
                className=" aspect-square mx-auto  object-cover object-center"
                width={500}
                height={500}
                alt="Advertise Link"
                src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${lastBookReview?.book_cover}?key=optimized`}
                placeholder={`data:image/svg+xml;base64,${toBase64(
                  shimmer(500, 500),
                )}`}
              />
              <h3 className=" text-center text-xl font-semibold my-4">
                {lastBookReview?.title}
              </h3>
            </Link>

            <Link
              className=" self-end btn btn-sm font-normal my-4  normal-case leading-relaxed bg-accent text-secondary hover:text-accent w-full"
              href={`/${locale}/market-cost`}
            >
              {dictionary?.mainBody?.costBtn}
            </Link>
          </div>
        </div>
      </main>
    </PaddingContainer>
  );
};

export default HomePage;

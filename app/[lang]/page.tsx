import PaddingContainer from "@/components/layout/PaddingContainer";
import Image from "next/image";
import PostList from "@/components/post/PostList";
import coverPhoto from "@/assets/cover-photo.png";
import MainSlider from "@/components/elements/MainSlider";
import directus from "@/lib/directus";
import { notFound } from "next/navigation";
import magazineImage from "@/assets/magpic.png";
import { getDictionary } from "@/lib/getDictionary";
import Link from "next/link";
import { Banner, Post, University } from "@/types/collection";
import { shimmer, toBase64 } from "@/utils/shimmer";

const page = async ({
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
        return posts.data;
      } else {
        const localizedPost = posts.data?.map((post: Post) => {
          return {
            ...post,
            title: post.translations[0].title,
            description: post.translations[0].description,
            body: post.translations[0].body,
            author: {
              first_name: post.author.translations[0].first_name,
              last_name: post.author.translations[0].last_name,
            },
            category: {
              ...post.category,
              title: post.category.translations[0].title,
              description: post.category.translations[0].description,
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

  // FOR GET ALL UNIVERSITY BASED PROJECTS

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
              posts: (fetchedUniversity.posts || []).map(
                (post: Post) => {
                  return {
                    ...post,
                    title: post.translations[0].title,
                    category: post.category
                      ? {
                          ...post.category,
                          title: post.category.translations[0].title,
                        }
                      : "",
                    university: post.university
                      ? {
                          ...post.university,
                        }
                      : "",
                  };
                },
              ),
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
        const localizedBanner = banners.data?.map((banner: Banner) => {
          return {
            ...banner,
            title: banner.translations[0].title,
            description: banner.translations[0].description,
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


  const getAdvertisementImage = async () => {
    try {
      const advertisementImage = await directus.items("advertisement").readByQuery({
        filter: {
          status: {
            _eq: "published",
          },
        },
        fields: ["image", "link"],
      });

      return advertisementImage.data || [];
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching Banners");
    }
  };

  const advertisement = await getAdvertisementImage();

  return (
    <PaddingContainer>
      <Image
        className=" object-cover object-center w-full mb-10"
        src={coverPhoto}
        width={800}
        height={500}
        alt="Cover Photo"
      />

      <MainSlider banners={banners} />

      <main className=" h-auto space-y-10 mt-10">
        <PostList
          locale={locale}
          posts={posts}
          universities={universities || []}
          studentProjects={posts || []}
          advertisement={advertisement}
        />
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className=" relative order-last md:order-none">
            <Image src={magazineImage} alt={"Magazine Picture"} />
            <div className="  absolute top-10 right-0 flex flex-col gap-5 items-end">
              <h2 className="text-lg bg-base-100 pl-2">{dictionary.magazineHome.title}</h2>
              <Link
                href={`/${locale}/published-magazine`}
                className=" btn btn-outline bg-base-100 w-fit"
              >
                {dictionary.magazineHome.published}
              </Link>
              <Link
                href={`/${locale}/archived`}
                className=" btn btn-outline bg-base-100  w-fit"
              >
                {dictionary.magazineHome.website}
              </Link>
            </div>
          </div>
          <div className="  md:border-l place-item-end pl-10 ">

     
        {
          advertisement &&
          advertisement.map((adv,index)=> <Link className="md:ml-10 " key={index} href={adv.link}>
          <Image      className=" aspect-square   object-cover object-center"
              width={500}
              height={500}
              alt="Advertise Link"
              src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${adv.image}?key=optimized`}
              placeholder={`data:image/svg+xml;base64,${toBase64(
                shimmer(500, 500),
              )}`}/>
          </Link>)
        }

        <Link className=" btn mt-10 normal-case leading-relaxed bg-accent text-secondary hover:text-accent w-full" href={""}>
        {dictionary.mainBody.costBtn}
        </Link>
  
          </div>
        </div>
      </main>
    </PaddingContainer>
  );
};

export default page;

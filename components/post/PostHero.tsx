import { Post } from "@/types/collection"
import PostContent from "./PostContent"
import Image from "next/image"

interface PostHeroProps {
    post : Post
    locale: string;
}

const PostHero = ({post, locale}: PostHeroProps) => {
  return (
    <div>
        <PostContent locale={locale} isPagePost post={post}/>
    <Image className="h-[300px] md:h-[500px] rounded-md object-cover object-center mt-6" width={1280} height={500} alt={post.title} src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${post.image}?key=optimized`} />

    </div>

  )
}

export default PostHero
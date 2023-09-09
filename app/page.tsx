import PaddingContainer from '@/components/layout/PaddingContainer'
import PostCard from '@/components/post/PostCard'
import Image from 'next/image'
import { DUMMY_POSTS } from '@/DUMMY_DATA'
import PostList from '@/components/post/PostList'
import CTACard from '@/components/elements/CTACard'


export default function Home() {
  return (
    <PaddingContainer>
      <main className=' h-auto space-y-10'>
    <PostCard post={DUMMY_POSTS[0]}/>
    <PostList posts={DUMMY_POSTS.filter((_post,index) => index > 0 && index <3)}  />
    <CTACard/>
    <PostCard reverse post={DUMMY_POSTS[3]}/>
    <PostList posts={DUMMY_POSTS.filter((_post,index) => index > 3 && index <6)}  />
      </main>
    </PaddingContainer>
  )
}

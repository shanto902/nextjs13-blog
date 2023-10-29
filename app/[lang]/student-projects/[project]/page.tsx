import directus from '@/lib/directus';
import { StudentPost } from '@/types/collection';
import React from 'react'

export const generateStaticParams = async () => {
    try {
      const posts = await directus.items("studentProjects").readByQuery({
        filter: {
          status: {
            _eq: "published",
          },
        },
        fields: ["slug"],
      });
      const params = posts?.data?.map((post: StudentPost) => {
        return {
          category: "student_projects",
          project: post.slug as string,
          lang: "en",
        };
      });
      const localizedParams = posts?.data?.map((post: StudentPost) => {
        return {
          category: "student_projects",
          project: post.slug as string,
          lang: "bn",
        };
      });
  
      const allParams = params?.concat(localizedParams ?? []);
      return allParams || [];
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching posts");
    }
  };
  

const page =async ({
    params,
  }: {
    params: {
      project: string;
      lang: string;
    };
  })  => {
     
  return (
    <div>page</div>
  )
}

export default page
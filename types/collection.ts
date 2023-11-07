export interface Post {
  project_description: string;
  id: string;
  status: string;
  title: string;
  description: string;
  category: Category;
  author: Author;
  slug: string;
  image: string;
  body: string;
  date_created: string;
  date_updated: string;
  left_ad?: string;
  translations: Translations[];
  bottom_ad?: string;
  university: University;
  cover_photo: string;
  right_ad?: string;
}

export interface PostCounter {
  id: number;
  post_id:string;
  counter:number;
}

export interface Translations {
  id: string;
  title: string;
  description: string;
  body: string;
  first_name: string;
  last_name: string;
  image_side_title: string;
  review: string;
}

export interface Category {
  id: string;
  title: string;
  slug: string;
  description?: string;
  translations: Translations[];
}

export interface Comments {
  id: string;
  name: string;
  date_created: string;
  description: string;
}

export interface Magazine {
  id: string;
  title: string;
  number: number;
  image: string;
  date_created: string;
  description: string;
  translations: Translations[];
}
export interface Author {
  id: string;
  first_name: string;
  last_name: string;
  translations: Translations[];
}

export interface Banner {
  id: string;
  title: string;
  description: string;
  image: string;
  translations: Translations[];
}

export interface Advertisement {
  image: string;
  link: string;
}

export interface jointEditor {
  image: string;
  name: string;
  info: string;
}

export interface University {
  universityId: unknown;
  map(
    arg0: (university: University) => import("react").JSX.Element,
  ): import("react").ReactNode;
  id: string;
  name: string;
  status: string;
  posts: Post[];
  tag_line: string;
  is_main_slider: boolean;
}

export interface Review {
  book_cover: string;
  id?: string;
  date_created: string;
  title: string;
  review: string;
  translations: Translations[];
  sort?: string;
}

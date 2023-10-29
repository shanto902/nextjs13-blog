export interface Post {
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
  left_add?: string;
  translations: Translations[];
  bottom_add?: string;
  image_side_title: string;
  university: University;
}

export interface Translations {
  id: string;
  title: string;
  description: string;
  body: string;
  first_name: string;
  last_name: string;
  image_side_title: string;
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

export interface University {
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

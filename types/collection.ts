export interface Post {
  id: string;
  status: string;
  title: string;
  description: string;
  category: Category;
  author: Author;
  slug: string;
  image: string;
  blurImg:string;
  body: string;
  date_created: string;
  date_updated: string;
  left_add?: string;
  translations: Translations[];
  bottom_add?: string;
}

export interface Translations {
  id: string;
  title: string;
  description: string;
  body: string;
  first_name: string;
  last_name: string;
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
  blurImg:string;
  translations: Translations[];
  
}

export interface StudentPost {
  id: string;
  title: string;
  description: string;
  university: string;
  author: Author;
  slug: string;
  image: string;
  blurImg:string;
  body: string;
  date_created: string;
  date_updated: string;
}

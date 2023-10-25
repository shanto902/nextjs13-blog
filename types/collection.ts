export interface Post {
  id: string;
  title: string;
  description: string;
  category: Category;
  author: Author;
  slug: string;
  image: string;
  body: string;
  date_created: string;
  date_updated: string;
  left_add? : string;
  bottom_add? : string;
}

export interface Category {
  id: string;
  title: string;
  slug?: string;
  description?: string;
}

export interface Author {
  id: string;
  first_name: string;
  last_name: string;
}

export interface Banner {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface StudentPost {
  id: string;
  title: string;
  description: string;
  university: string;
  author: Author;
  slug: string;
  image: string;
  body: string;
  date_created: string;
  date_updated: string;
}

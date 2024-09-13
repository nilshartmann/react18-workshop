export type BlogPost = {
  id: string;
  title: string;
  body: string;
  date: string;
  tags: string[];
};

export type NewBlogPost = {
  title: string;
  body: string;
  tags: string[];
};

export type BlogPostTeaser = {
  id: string;
  title: string;
  date: string;
};

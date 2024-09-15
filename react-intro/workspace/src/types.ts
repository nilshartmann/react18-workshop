export type BlogPost = {
  id: string;
  title: string;
  body: string;
  date: string;
  tags: string[];
  likes?: number;
};

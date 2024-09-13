import { BlogPost } from "./types";
import { useQuery } from "@tanstack/react-query";
import ky from "ky";
import LoadingIndicator from "./LoadingIndicator.tsx";
import PostList from "./PostList.tsx";

export default function PostListPage() {
  const postListQuery = useQuery({
    queryKey: ["posts"],
    queryFn() {
      return ky.get<BlogPost[]>("http://localhost:7000/posts").json();
    }
  });

  if (postListQuery.isPending) {
    return <LoadingIndicator>Posts loading...</LoadingIndicator>;
  }

  if (postListQuery.isError) {
    return <h1>Loading failed 😢</h1>;
  }

  return (
    <div>
      <h1>Blog Posts</h1>
      <PostList posts={postListQuery.data} />
    </div>
  );
}

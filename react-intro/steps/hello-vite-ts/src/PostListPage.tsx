import { BlogPost } from "./types";
import { useQuery } from "@tanstack/react-query";
import ky from "ky";
import LoadingIndicator from "./LoadingIndicator.tsx";
import { formatDate } from "./date-formatter.ts";
import PostList from "./PostList.tsx";

export default function PostListPage() {
  const postListQuery = useQuery({
    queryKey: ["posts"],
    async queryFn() {
      return ky.get<BlogPost[]>("http://localhost:7000/posts").json();
    }
  });

  if (postListQuery.isPending) {
    return <LoadingIndicator>Posts loading...</LoadingIndicator>;
  }

  if (postListQuery.isError) {
    return <h1>Loading failed 😢</h1>;
  }

  return <PostList posts={postListQuery.data} />;
}

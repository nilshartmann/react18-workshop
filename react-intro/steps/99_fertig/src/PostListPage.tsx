import { BlogPost } from "./types";
import { useQuery } from "@tanstack/react-query";
import ky from "ky";
import LoadingIndicator from "./LoadingIndicator.tsx";
import PostList from "./PostList.tsx";
import { useState } from "react";

export default function PostListPage() {
  const [orderByLikes, setOrderByLikes] = useState(false);

  const postListQuery = useQuery({
    queryKey: ["posts", orderByLikes],
    queryFn() {
      return ky
        .get<BlogPost[]>(`http://localhost:7000/posts${orderByLikes ? "?orderBy=likes" : ""}`)
        .json();
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
      <div className={"PageHeader"}>
        <h1>Blog Posts</h1>
        <button className={"small"} onClick={() => setOrderByLikes(!orderByLikes)}>
          {orderByLikes ? "Newest first" : "Order by Likes"}
        </button>
      </div>
      <PostList posts={postListQuery.data} />
    </div>
  );
}

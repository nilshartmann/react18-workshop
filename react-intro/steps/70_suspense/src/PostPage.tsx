import { Link, useParams } from "react-router-dom";
import { useQueryErrorResetBoundary, useSuspenseQuery } from "@tanstack/react-query";
import ky from "ky";
import { BlogPostSchema } from "./types.ts";
import { formatDate } from "./date-formatter.ts";
import { Suspense } from "react";
import LoadingIndicator from "./LoadingIndicator.tsx";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

export default function PostPage() {
  const { reset } = useQueryErrorResetBoundary();

  const { postId } = useParams();
  if (!postId) {
    throw new Error("No postId in search params");
  }

  return (
    <ErrorBoundary FallbackComponent={PostErrorFallback} onReset={reset}>
      <Suspense fallback={<LoadingIndicator />}>
        <PostView postId={postId} />
      </Suspense>
    </ErrorBoundary>
  );
}

function PostErrorFallback(p: FallbackProps) {
  console.error("Loading post failed", p.error);
  return (
    <div className={"Container"}>
      <h1>Loading Post failed</h1>
      <div>{p.error.toString()}</div>
      <button onClick={() => p.resetErrorBoundary()}>Retry</button>
    </div>
  );
}

type PostViewProps = { postId: string };
function PostView({ postId }: PostViewProps) {
  const { data: p } = useSuspenseQuery({
    queryKey: ["posts", postId],
    async queryFn() {
      const data = await ky.get(`http://localhost:7000/posts/${postId}?slow`).json();
      const post = BlogPostSchema.parse(data);
      return post;
    }
  });

  return (
    <article className="Container">
      <p className="Date">{formatDate(p.date)}</p>
      <h1>{p.title}</h1>
      <p>{p.body}</p>
      <div className="Tags">
        {p.tags?.map(tag => (
          <span key={tag} className={"Tag"}>
            {tag}
          </span>
        ))}
      </div>
      {!!p.likes && p.likes > 0 && (
        <p className={"Tag"}>
          <b>{p.likes}</b> Likes
        </p>
      )}
      <div>
        <Link to={"/"}>Back to posts</Link>
      </div>
    </article>
  );
}

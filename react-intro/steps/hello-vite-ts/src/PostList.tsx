import { BlogPost } from "./types";
import { formatDate } from "./date-formatter.ts";

type PostListProps = {
  posts: BlogPost[];
};
export default function PostList({ posts }: PostListProps) {
  return (
    <div>
      {posts.map(p => (
        <article key={p.id} className="Container">
          <p className="Date">{formatDate(p.date)}</p>
          <h1>{p.title}</h1>
          <p>{p.body}</p>
          {p.tags?.length > 0 && (
            <div className="Tags">
              <b>Tags: </b>
              {p.tags?.join(", ")}
            </div>
          )}
        </article>
      ))}
    </div>
  );
}

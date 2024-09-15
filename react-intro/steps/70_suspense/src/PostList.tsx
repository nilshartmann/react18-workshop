import { BlogPost } from "./types";
import { formatDate } from "./date-formatter.ts";
import { Link } from "react-router-dom";

type PostListProps = {
  posts: BlogPost[];
};
export default function PostList({ posts }: PostListProps) {
  return (
    <div>
      {posts.map(p => (
        <article key={p.id} className="Container">
          <p className="Date">{formatDate(p.date)}</p>
          <Link to={`/posts/${p.id}`}>
            <h1>{p.title}</h1>
          </Link>
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
        </article>
      ))}
    </div>
  );
}
import moment from "moment";
import { BlogPost } from "./types";

function formattedDate(date: string) {
  return moment(date).format("DD.MM.YYYY");
}

type PostListProps = {
  posts: BlogPost[];
  onAddPost(): void;
};

export default function PostList({ posts, onAddPost }: PostListProps) {
  return (
    <>
      <button onClick={onAddPost}>Add Post</button>
      {posts.map(p => (
        <article key={p.id} className="Container">
          <p className="Date">{formattedDate(p.date)}</p>
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
    </>
  );
}

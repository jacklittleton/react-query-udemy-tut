import { fetchComments } from "./api";
import "./PostDetail.css";
import { useQuery } from '@tanstack/react-query';

export function PostDetail({ post, deleteMutation }) {
  // replace with useQuery
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['post-comments', post.id],
    queryFn: () => fetchComments(post.id),
  });

  if (isLoading) {
    return <h3>loading…</h3>;
  }

  if (isError) {
    return (
      <>
        <h3>Something went wrong.</h3>
        <p>{error.toString()}</p>
      </>
    );
  }

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <div>
        <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
        {deleteMutation.isPending && <p className="loading">Deleting the post</p>}
        {deleteMutation.isError && <p className="error">Error deleting the post: {deleteMutation.error.toString()}</p>}
        {deleteMutation.isSuccess && <p className="success">Post was deleted</p>}
      </div>
      <div>
        <button>Update title</button>
      </div>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}

import { useQuery } from "@tanstack/react-query";
import { fetchComments } from "./api";
import "./PostDetail.css";

export function PostDetail({ post, deleteMutation, updateMutation }) {

  const id = post.id;
  // replace with useQuery
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['postComments', id],
    queryFn: () => fetchComments(id),
    staleTime: 5000,
  });

  if (isLoading) {
    return <h3>Loading...</h3>
  }

  if (isError) {
    return <h3>Something went wrong...<span>{error.toString()}</span></h3>
  }

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <div style={{ display: "flex" }}>
        <div>
          <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
          {
            deleteMutation.isPending && <p className="loading">Deleting the post</p>
          }
          {
            deleteMutation.isError &&
            <p className="error">
              Error deleting the post: {deleteMutation.error.toString()}
            </p>}
          {
            deleteMutation.isSuccess &&
            <p className="success">
              Post "successfully" deleted
            </p>
          }
        </div>
        <div>
          <button onClick={() => updateMutation.mutate(post.id)}>
            Update title
          </button>
          {
            updateMutation.isError &&
            <p className="error">
              Error updating the post: {updateMutation.error.toString()}
            </p>}
          {
            updateMutation.isSuccess &&
            <p className="success">
              Post was "successfully" updated
            </p>
          }
        </div>
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

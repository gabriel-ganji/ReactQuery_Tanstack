import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchPosts, deletePost, updatePost } from "./api";
import { PostDetail } from "./PostDetail";
const maxPostPage = 10;

export function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);

  // replace with useQuery
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["posts", currentPage],
    queryFn: () => fetchPosts(currentPage),
    staleTime: 20000, //2secs
  });

  if (isLoading) {
    return <h3>Loading...</h3>
  }

  if (isError) {
    return <h3>Something went wrong...<span>{error.toString()}</span></h3>
  }

  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button disabled={currentPage <= 1}
          onClick={() => {
            setCurrentPage((prev) => prev - 1)
          }}>
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button disabled={currentPage === maxPostPage}
          onClick={() => {
            setCurrentPage((prev) => prev + 1)
          }}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}

import { useEffect, useState } from "react";

import { fetchPosts, deletePost, updatePost } from "./api";
import { PostDetail } from "./PostDetail";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const maxPostPage = 10;

export function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (currentPage < maxPostPage) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery({
        queryKey: ["posts", nextPage],
        queryFn: () => fetchPosts(nextPage),
        staleTime: 10000,
      });
    }
  }, [currentPage, queryClient]);

  // replace with useQuery
  const { data, isError, error, isLoading, errorUpdateCount } = useQuery({
    queryKey: ["posts", currentPage],
    queryFn: () => fetchPosts(currentPage),
    staleTime: 5000,
  });

  if (isLoading) {
    return (<h3>loading…</h3>)
  }

  if (isError) {
    return (
      <>
        <h3>Something went wrong. error count: {errorUpdateCount}</h3>
        <h4>{error.toString()}</h4>

      </>
    );
  }

  return (
    <>
      <ul>
        {data?.map((post) => (
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
        <button disabled={currentPage <= 1} onClick={() => {
          setCurrentPage((previousValue) => previousValue - 1);
        }}>
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button disabled={currentPage >= maxPostPage} onClick={() => {
          setCurrentPage((previousValue) => previousValue + 1);
        }}>
          Next page
        </button>
      </div>
      <hr/>
      {selectedPost && <PostDetail post={selectedPost}/>}
    </>
  );
}

import { usePost } from "../contexts/PostProvider";

import Loading from "../ui/Loading";
import Error from "../ui/Error";
import PostList from "../components/PostList";

const Posts = () => {
  const { posts, isLoading, isError } = usePost();

  if (isError) return <Error message={isError} />;

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h1>Posts</h1>
          <PostList posts={posts} />
        </>
      )}
    </>
  );
};

export default Posts;

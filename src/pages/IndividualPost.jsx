import { useParams } from "react-router-dom";
import { usePost } from "../contexts/PostProvider";
import { useEffect } from "react";

import Loading from "../ui/Loading";
import Error from "../ui/Error";

const IndividualPost = () => {
  const { id } = useParams();

  const { title, body, isLoading, isError, fetchEachPost } = usePost();

  useEffect(() => {
    fetchEachPost(id);
  }, [id, fetchEachPost]);

  if (isError) return <Error message={isError} />;

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <h1>Post Id: {id}</h1>
          <h3>{title}</h3>
          <p>{body}</p>
        </div>
      )}
    </>
  );
};

export default IndividualPost;

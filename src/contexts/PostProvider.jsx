import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

const PostContext = createContext();

function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const host = "jsonplaceholder.typicode.com";

  useEffect(() => {
    const controller = new AbortController();
    async function fetchPosts() {
      try {
        setIsLoading(true);
        setIsError("");

        const res = await fetch(`https://${host}/posts`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Something went wrong!");

        const data = await res.json();

        setIsLoading(false);
        setPosts(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setIsLoading(false);
          setIsError(error.message);
        }
      }
    }

    fetchPosts();

    return () => {
      controller.abort();
    };
  }, []);

  const fetchEachPost = useCallback(async function fetchEachPost(id) {
    try {
      setIsLoading(true);
      setIsError("");

      const res = await fetch(`https://${host}/posts/${id}`);
      if (!res.ok) throw new Error("Something went wrong!");

      const data = await res.json();

      setIsLoading(false);
      setTitle(data.title);
      setBody(data.body);
    } catch (error) {
      setIsLoading(false);
      setIsError(error.message);
    }
  }, []);

  return (
    <PostContext.Provider
      value={{
        posts,
        isLoading,
        isError,
        title,
        body,
        fetchEachPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

function usePost() {
  const context = useContext(PostContext);

  if (context === undefined)
    throw new Error("PostContext was calling outside of PostProvider!");

  return context;
}

export { PostProvider, usePost };

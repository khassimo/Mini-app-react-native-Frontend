import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const PostContext = createContext();

const PostProvider = ({children}) => {
  // global state
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  //get post
  const getAllPost = async () => {
    setLoading(true);
    try {
      setLoading(true);
      const { data } = await axios.get("/post/get-post/");
      setLoading(false);
      setPosts(data?.posts);
    } catch (error) {
      setLoading(false);
      alert("Error while getting posts");
      console.log(error);
    }
  };

  // initialement
  useEffect(() => {
    getAllPost();
  }, [posts]);

  return (
    <PostContext.Provider value={[posts, setPosts]}>
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, PostProvider };

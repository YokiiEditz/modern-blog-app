import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

const BlogContext = createContext();

export const useBlogs = () => {
  return useContext(BlogContext);
};

export const API_URL = import.meta.env.VITE_SERVER_APP_URL;

export const BlogProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({}); //JWT info

  const [blogPost, setBlogPost] = useState([]); //all posts

  const [dataChanged, setDataChanged] = useState(false); //check if data changes in any HTTP methods

  useEffect(() => {
    getPosts();
    // console.log("data chnaged occured");
  }, [dataChanged]);

  const getPosts = async () => {
    try {
      const response = await fetch(API_URL + "/post");

      if (!response.ok) {
        console.log(`Error: ${response.status}`);
      }
      const posts = await response.json();
      // console.log("posts", posts);

      setBlogPost(posts);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  const handleFetchData = async () => {
    const token = sessionStorage.getItem("jwt");
    console.log("fetch token", token);

    await fetch(API_URL + "/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);

        // console.log("user info", userInfo);
      });
    });
  };

  const contextValues = {
    dataChanged,
    setDataChanged,

    handleFetchData,

    blogPost,
    setBlogPost,
    getPosts,

    userInfo,
    setUserInfo,
  };

  return (
    <>
      <BlogContext.Provider value={contextValues}>
        {children}
      </BlogContext.Provider>
    </>
  );
};

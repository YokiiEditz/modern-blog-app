import { useBlogs } from "../context/BlogContext";

import AllPosts from "../components/AllPosts";

const HomePage = () => {
  const { blogPost } = useBlogs();

  return (
    <div>
      {blogPost &&
        blogPost.map((blog, idx) => <AllPosts blog={blog} key={idx} />)}
    </div>
  );
};

export default HomePage;

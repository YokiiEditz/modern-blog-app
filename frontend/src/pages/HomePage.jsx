import { useBlogs } from "../context/BlogContext";
import AllPosts from "../components/AllPosts";

const HomePage = () => {
  return (
    <div>
      <div className="d-flex justify-content-between">
        <h1>Recent Posts</h1>
        {/* <Button variant="dark">
          <Link to="category">Category</Link>
        </Button> */}
      </div>
      <Posts /> {/* Posts defined in below here. */}
    </div>
  );
};

export default HomePage;

export const Posts = () => {
  const { blogPost } = useBlogs();
  // console.log("blogpost", blogPost);

  return (
    <div>
      {blogPost.map((blog, idx) => (
        <AllPosts blog={blog} key={idx} />
      ))}
    </div>
  );
};

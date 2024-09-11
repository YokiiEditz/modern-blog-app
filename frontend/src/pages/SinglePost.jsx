import { useEffect, useState } from "react";
import { API_URL, useBlogs } from "../context/BlogContext";
// import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Breadcrumb, Container, Button, Row, Col } from "react-bootstrap";

const SinglePost = () => {
  const [postInfo, setPostInfo] = useState([]);
  const { dataChanged, userInfo } = useBlogs();

  const { id } = useParams();
  const postId = id;

  useEffect(() => {
    const getPostById = async () => {
      try {
        // console.log("API URL:", API_URL + `/post/${postId}`);

        fetch(API_URL + `/post/${postId}`).then((response) => {
          response.json().then((posts) => {
            // console.log("Data:", posts);
            setPostInfo(posts);
          });
        });
      } catch (error) {
        console.error("Error fetching post by ID:", error);
      }
    };
    getPostById();
  }, [dataChanged]);

  const { title, category, description, author, createdAt, updatedAt } =
    postInfo;

  console.log("usefinfo from conetxt", userInfo);

  return (
    <div>
      <div className="py-3" style={{ minHeight: "84vh" }}>
        <section>
          <Breadcrumb>
            <Breadcrumb.Item active>
              <Link to="/">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Blogs</Breadcrumb.Item>
          </Breadcrumb>
        </section>

        {postInfo && (
          <Container className="pb-3">
            <Row xs={1} md={2}>
              <Col md={8} className="py-1 px-1">
                <section className="px-3 py-2 border border-2 rounded-2">
                  <div>
                    <h1>{title}</h1>
                    <span>{category}</span>
                    <hr />
                    <p className="py-1">{description}</p>
                  </div>

                  {userInfo?.id === postInfo?.author?._id && (
                    <div className="d-flex justify-content-between">
                      <Button
                        variant="primary"
                        className="d-flex gap-1 align-items-center"
                      >
                        {/* <FiEdit size={20} /> */}
                        Edit this Post
                      </Button>

                      <Button
                        variant="danger"
                        className="d-flex gap-1 align-items-center"
                      >
                        {/* <MdDeleteForever size={20} /> */}
                        Delete this Post
                      </Button>
                    </div>
                  )}
                </section>
              </Col>

              <Col md={4} className="py-1 px-1" style={{ fontSize: "14px" }}>
                <div className="px-2 py-2  border border-2 rounded-2">
                  <h2 className="text-secondary">Author</h2>

                  <div className="d-flex gap-2">
                    <label className="fw-bold">Name:</label>
                    <span className="fw-bold text-primary">
                      {author?.username}
                    </span>
                  </div>
                  {/* <div className="d-flex gap-2">
                    <label className="fw-bold">Post created:</label>
                    {createdAt && <span>{createdAt}</span>}
                  </div>
                  <div className="d-flex gap-2">
                    <label className="fw-bold">Post updated:</label>
                    {updatedAt && <span>{updatedAt}</span>}
                  </div> */}
                </div>
              </Col>
            </Row>
          </Container>
        )}

        {/*
        <Button
          variant="secondary"
          className="mx-1 mt-5 py-2 px-2 d-flex gap-1 align-items-center"
          onClick={() => navigate("/")}
        >
          <IoMdArrowBack size={20} />
          Back to Home
        </Button>

        {popup && <Popup text="Post Deleted" color="red" />} */}
      </div>
    </div>
  );
};

export default SinglePost;

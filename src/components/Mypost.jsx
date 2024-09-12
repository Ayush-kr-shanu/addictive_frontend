import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { GetPostByUser, DeletePost, User } from "../API"; // Import DeletePost API
import Cookies from "js-cookie";

function MyPage() {
  const [userData, setUserData] = useState({});
  const [post, setPost] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          const token = Cookies.get("token");
          const response = await User(userId, token);
          setUserData(response || {});
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }
  }, [userId]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = Cookies.get("token");
        const response = await GetPostByUser(userId, token);
        setPost(response || []);
      } catch (error) {
        console.error("Fetch posts error:", error);
        setPost([]);
      }
    };

    fetchPosts();
  }, [userId]);

  const handleDelete = async (postId) => {
    try {
      const token = Cookies.get("token");
      await DeletePost(postId, token);
      // Remove the deleted post from the state
      setPost(post.filter((item) => item._id !== postId));
    } catch (error) {
      console.error("Delete post error:", error);
    }
  };

  return (
    <Row>
      <Col xs={12} md={3}>
        <div
          className="sidebar"
          style={{
            height: "100vh",
            width: "22%",
            color: "white",
            backgroundColor: "#19bed4",
            padding: "30px",
            position: "fixed",
            top: "0",
            left: "0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <img
              src={userData.profilePicUrl}
              alt="Profile Pic"
              style={{
                width: "150px",
                height: "150px",
                border: "2px solid white",
                borderRadius: "50%",
                marginBottom: "20px",
              }}
            />
            <h1 style={{ fontSize: "25px", margin: "10px 0" }}>
              {userData.firstName} {userData.lastName}
            </h1>
            <p style={{ margin: "5px 0" }}>Email: {userData.email}</p>
            <p style={{ margin: "5px 0" }}>Phone: {userData.phone}</p>
            <p style={{ margin: "5px 0" }}>Bio: {userData.bio}</p>
          </div>
        </div>
      </Col>
      <Col xs={12} md={6} style={{ paddingRight: "10%", overflowX: "hidden" }}>
        <div>
          <div style={{ marginTop: "20px" }}>
            <a href="/addpost" style={{ marginRight: "20px" }}>
              <button>Add New Post</button>
            </a>
            <a href="/">
            <button>Home Page</button>
            </a>
          </div>
        </div>
        <div>
          {post.length > 0 ? post.map((item) => (
            <div key={item._id} style={{ marginTop: "20px" }}>
              <img
                src={item.userId.profilePictureUrl}
                alt="Profile Pic"
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  float: "left",
                }}
              />
              <h1
                style={{
                  marginLeft: "60px",
                  marginTop: "0px",
                  fontSize: "20px",
                }}
              >
                {item.userId.firstName} {item.userId.lastName}
                <span
                  style={{
                    fontSize: "15px",
                    marginLeft: "10px",
                    color: "#888888",
                  }}
                >
                  {item.title}
                </span>
              </h1>

              <video
                src={item.videoUrl}
                style={{
                  width: "320px",
                  height: "240px",
                  marginLeft: "60px",
                  marginBottom: "10px",
                }}
                controls
                preload="metadata"
              />

              <p
                style={{
                  marginLeft: "60px",
                  marginTop: "10px",
                  fontSize: "15px",
                }}
              >
                {item.description}
              </p>

              <div style={{ clear: "both" }}></div>

              <button
                onClick={() => handleDelete(item._id)}
                style={{
                  marginLeft: "60px",
                  padding: "5px 10px",
                  backgroundColor: "#e74c3c",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>

              <hr style={{ marginTop: "10px", marginBottom: "10px" }} />
            </div>
          )): 
            <div style={{ marginTop: "20px" }}>No posts found</div>
          }
        </div>
      </Col>
    </Row>
  );
}

export default MyPage;

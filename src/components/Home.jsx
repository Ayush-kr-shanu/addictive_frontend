import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { GetPosts, UpdateUser, UploadFile, User } from "../API";
import Cookies from "js-cookie";

function HomePage() {
  const [userData, setUserData] = useState({});
  const [post, setPost] = useState([]);
  const userId = localStorage.getItem("userId");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          const token = Cookies.get("token");
          const response = await User(userId, token);
          console.log(response);
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
        const response = await GetPosts(token);
        setPost(response || []);
      } catch (error) {
        console.error("Fetch posts error:", error);
        setPost([]);
      }
    };

    fetchPosts();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const userId = localStorage.getItem("userId");
    const folder = "profile-pic";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);
    formData.append("folder", folder);

    try {
      const token = Cookies.get("token");
      const response = await UploadFile(formData, token);
      setUserData({ ...userData, profilePicture: response.file.fileName });
    } catch (error) {
      console.error("File upload error:", error);
    }
  };

  const handleUpdateUserData = async () => {
    const {firstName, lastName, email, phone, bio, profilePicture } = userData;
    console.log(userData)
  
    // Prepare the data to be updated
    const updatedData = {
      firstName,
      lastName,
      email,
      phone,
      bio,
      profilePicture
    };
  
    try {
      const token = Cookies.get("token");
      const response = await UpdateUser(userId, updatedData, token);
      setUserData({ ...userData, ...updatedData });
      setIsEditing(false); // Hide edit form after successful update
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
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
          {!isEditing ? (
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
              <button
                onClick={toggleEditMode}
                style={{
                  marginTop: "20px",
                  padding: "10px 20px",
                  fontSize: "16px",
                  backgroundColor: "#fff",
                  color: "#19bed4",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
            </div>
          ) : (
            <div>
              <input
                type="text"
                value={userData.firstName}
                onChange={(e) =>
                  setUserData({ ...userData, firstName: e.target.value })
                }
                placeholder="First Name"
                style={{ marginBottom: "10px" }}
              />
              <input
                type="text"
                value={userData.lastName}
                onChange={(e) =>
                  setUserData({ ...userData, lastName: e.target.value })
                }
                placeholder="Last Name"
                style={{ marginBottom: "10px" }}
              />
              <input
                type="text"
                value={userData.phone}
                onChange={(e) =>
                  setUserData({ ...userData, phone: e.target.value })
                }
                placeholder="Phone"
                style={{ marginBottom: "10px" }}
              />
              <textarea
                value={userData.bio}
                onChange={(e) =>
                  setUserData({ ...userData, bio: e.target.value })
                }
                placeholder="Bio"
                style={{ marginBottom: "10px" }}
              />
              <input
                type="file"
                onChange={handleFileUpload}
                style={{ marginBottom: "10px" }}
              />
              <button
                onClick={handleUpdateUserData}
                style={{
                  marginTop: "10px",
                  padding: "10px 20px",
                  fontSize: "16px",
                  backgroundColor: "#fff",
                  color: "#19bed4",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Save
              </button>
              <button
                onClick={toggleEditMode}
                style={{
                  marginTop: "10px",
                  padding: "10px 20px",
                  fontSize: "16px",
                  backgroundColor: "#fff",
                  color: "#19bed4",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </Col>
      <Col xs={12} md={6} style={{ paddingRight: "10%", overflowx: "hidden" }}>
        <div>
          <div style={{ marginTop: "20px" }}>
            <a href="/addpost" style={{ marginRight: "20px" }}>
              <button>Add New Post</button>
            </a>
            <a href="/my-page">
            <button >My Posts</button>
            </a>
          </div>
        </div>
        <div>
          {post.map((item) => (
            <div key={item._id} style={{ marginTop: "20px" }}>
              {/* Profile picture and name with title */}
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

              {/* Video  */}
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

              {/* Description */}
              <p
                style={{
                  marginLeft: "60px",
                  marginTop: "10px",
                  fontSize: "15px",
                }}
              >
                {item.description}
              </p>

              {/* Clear float */}
              <div style={{ clear: "both" }}></div>

              {/* Horizontal divider */}
              <hr style={{ marginTop: "10px", marginBottom: "10px" }} />
            </div>
          ))}
        </div>
      </Col>
    </Row>
  );
}

export default HomePage;

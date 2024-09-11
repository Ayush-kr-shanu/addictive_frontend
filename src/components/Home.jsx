import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";

function HomePage() {
    const [userData, setUserData] = useState({
        userId: "",
        firstName: "",
        lastName: "",
        profilePic: "",
        email: "",
        phone: "",
        bio: ""
    });

    useEffect(() => {
        setUserData({
            userId: localStorage.getItem("userId"),
            firstName: localStorage.getItem("firstName"),
            lastName: localStorage.getItem("lastName"),
            profilePic: localStorage.getItem("profilePic"),
            email: localStorage.getItem("email"),
            phone: localStorage.getItem("phone"),
            bio: localStorage.getItem("bio")
        });
    }, []);

    return (
        <Row>
            <Col xs={12} md={3}>
                <div className="sidebar" style={{height: "100vh", width:"22%", color: "white", backgroundColor:"#19bed4", paddingLeft: "30px", position:"fixed ", top:"0", left:"0"}}>
                    <img src={userData.profilePic} alt="Profile Pic" style={{width:"150px", height:"150px", border: "2px solid white", borderRadius: "50%", marginLeft:"10%", marginTop:"10%",}}/>
                    <h1 style={{fontSize:"25px", marginTop: "10px"}}>Name: {userData.firstName} {userData.lastName}</h1>
                    <p>Email: {userData.email}</p>
                    <p>Phone: {userData.phone}</p>
                    <p>Bio: {userData.bio}</p>
                    <button>Edit</button>
                </div>
            </Col>
            <Col xs={12} md={6} style={{paddingRight:"10%", overflowx:"hidden"}}>
                <div>
                    <div style={{marginTop: "20px"}}>
                    <a href="/addpost" style={{marginRight: "20px"}}><button>Add New Post</button></a>
                    <button>My Posts</button>
                    </div>
                </div>
            </Col>
        </Row>
    );
}

export default HomePage;

import React, { useState } from "react";
import Cookies from "js-cookie";
import {Post, UploadFile } from "../API";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

function Addpost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const userId = localStorage.getItem("userId");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 6 * 1024 * 1024) {
      toast.error("Please upload a video less than 6 MB.");
      return;
    }
  
    setFile(selectedFile);
  };

  const handleFileUpload = async () => {
    if (!file) return "";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);
    formData.append("folder", "video");

    try {
      const token = Cookies.get("token");
      const response = await UploadFile(formData, token);
      return response.file.fileName;
    } catch (error) {
      console.error("File upload error:", error);
      return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fileName = await handleFileUpload();

      const postData = {
        title,
        description,
        fileName,
        userId,
      };

      const token = Cookies.get("token");
      await Post(postData, token);

      setTitle("");
      setDescription("");
      toast.success("Created Post successfully")
      setFile(null);
      Navigate("/")
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div>
      <style>
        {`
          div {
            max-width: 600px;
            margin: auto;
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          
          h1 {
            text-align: center;
            color: #333;
            margin-bottom: 20px;
          }
          
          form {
            display: flex;
            flex-direction: column;
          }
          
          input[type="text"],
          textarea,
          input[type="file"] {
            margin-bottom: 15px;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 16px;
          }
          
          input[type="text"],
          textarea {
            width: 100%;
          }
          
          textarea {
            resize: vertical;
            min-height: 150px;
          }
          
          input[type="file"] {
            padding: 0;
          }
          
          button {
            padding: 10px 20px;
            font-size: 16px;
            color: #fff;
            background-color: #19bed4;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }
          
          button:hover {
            background-color: #17a2b8;
          }
          
          button:active {
            background-color: #138496;
          }
        `}
      </style>
      <h1>Add New Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={handleFileChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Addpost;

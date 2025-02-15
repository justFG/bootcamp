import React, { useState, useEffect } from "react";
import Login from "../Login/Login";
import { Link, useNavigate } from "react-router-dom"; // Import de useNavigate
import "./Formulaire.css";

const Formulaire = ({ onAddPost, postToEdit }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate(); // Instanciation de useNavigate
  let isLoggin = localStorage.getItem("isLogged") === "true";
  useEffect(() => {
    if (postToEdit) {
      setTitle(postToEdit.title || "");
      setAuthor(postToEdit.author || "");
      setContent(postToEdit.content || "");
      setTags(postToEdit.tags || "");
      setImage(postToEdit.image || null);
    }
  }, [postToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = { title, author, content, tags, image };
    onAddPost(newPost); // Ajoute ou modifie le post
    setTitle("");
    setAuthor("");
    setContent("");
    setTags("");
    setImage(null);
    navigate("/"); // Redirige vers la page d'accueil
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };
  
  let loggedInUsername = localStorage.getItem("loggedInUser");
  useEffect(() => {
    setAuthor(loggedInUsername)
  })
  return (
    <>
    {isLoggin ? (
      <>
    <div className="blog-form">
      <h1>{postToEdit ? "Edit Post" : "Create a Post"}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(loggedInUsername)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tags">Tags</label>
          <input
            id="tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <button className="form-submit" type="submit">
          {postToEdit ? "Edit Post" : "Create a Post"}
        </button>
      </form>
      <Link to="/" className="return">Return to the homepage</Link>
    </div>
    <br/>
    <br/>
    <br/>
    
    </>
     ) : (
      <><Login /></>
    )
    }
    </>
  );
};

export default Formulaire;

import React, { useState } from "react";
import "./Formulaire.css";
import Login from "../Login/Login";
import { Link } from "react-router-dom";

const Formulaire = ({ onAddPost,isLoggin,setIsLogin }) => {


  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = { title, author, content, tags, image };
    onAddPost(newPost); // Ajouter le nouveau post
    setTitle("");
    setAuthor("");
    setContent("");
    setTags("");
    setImage(null);
    alert("Post créé avec succès !");

  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Crée un aperçu de l'image
    }
  };

  return (
    <>
    {isLoggin ? (
      <>
      <div className="blog-form">
      <h1>Créer un Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Titre</label>
          <input
            id="title"
            type="text"
            placeholder="Entrez le titre"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Auteur</label>
          <input
            id="author"
            type="text"
            placeholder="Entrez le nom de l'auteur"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Contenu</label>
          <input
            id="content"
            type="text"
            placeholder="Entrez le contenu"
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
            placeholder="Entrez les tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input id="image" type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <button type="submit">Soumettre</button>
      </form>
      <Link to="/" className="return">Revenir au menu principale</Link>
    </div>
      </>
    ) : (
      <><Login setIsLogin={setIsLogin}/></>
    )
    }
    </>
  );
};

export default Formulaire;
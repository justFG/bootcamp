import "./Home.css";
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ posts,isLoggin,setIsLogin }) => {
  const navigate = useNavigate();

  const logout = () => {
    setIsLogin(false);
    navigate("/login")
  }

  return (
    <div className="home">
      <h1 className="home-title">Bienvenue sur notre application</h1>
      <div className="button-container">
        <button className="btn" onClick={() => navigate("/formulaire")}>
          Créer un Post
        </button>
        <button className="btn" onClick={logout}>
        {isLoggin ? "Se deconnecter" : "Se connecter"}
        </button>
      </div>
      <div className="post-container">
        {posts && posts.length > 0 ? (
          posts.map((post, index) => (
            <div key={index} className="post-card">
              {post.image && <img src={post.image} alt={post.title} className="post-image" />}
              <h2>{post.title}</h2>
              <p><strong>Auteur:</strong> {post.author}</p>
              <p><strong>Contenu:</strong> {post.content}</p>
              <p><strong>Tags:</strong> {post.tags}</p>
            </div>
          ))
        ) : (
          <p>Aucun post pour l'instant. Créez-en un !</p>
        )}
      </div>
    </div>
  );
};

export default Home;

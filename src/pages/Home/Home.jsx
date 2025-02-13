import React from "react";
import {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import FadeMenu from "../../componant/FadeMenu/FadeMenu";
import "./Home.css";

const Home = ({ posts, setPosts, setPostToEdit}) => {
  const navigate = useNavigate();
  let isLoggin = localStorage.getItem("isLogged") === "true";

  const logout = () => {
    localStorage.setItem("isLogged", "false");
    navigate("/login");
  };
  

  const deletePost = (index) => {
    const updatedPosts = posts.filter((_, i) => i !== index);
    setPosts(updatedPosts);
  };

  const handleEdit = (post, index) => {
    setPostToEdit({ ...post, index }); // Stocke le post à modifier avec son index
    navigate("/formulaire"); // Redirige vers le formulaire
  };

  return (
    <div className="home">
      <h1 className="home-title">Bienvenue sur notre application</h1>
      <div className="button-container">
        <button className="btn" onClick={() => navigate("/formulaire")}>
          Créer un Post
        </button>
        <button className="btn" onClick={logout}>
          {isLoggin ? "Se déconnecter" : "Se connecter"}
        </button>
      </div>
      <div className="post-container">
        {posts && posts.length > 0 ? (
          posts.map((post, index) => (
            <div key={index} className="post-card">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h2>{post.title}</h2>
                <FadeMenu
                  onDelete={() => deletePost(index)}
                  onEdit={() => handleEdit(post, index)} // Passe la fonction de modification
                />
              </div>
              {post.image && (
                <img src={post.image} alt={post.title} className="post-image" />
              )}
              <p>
                <strong>Auteur:</strong> {post.author}
              </p>
              <p>
                <strong>Contenu:</strong> {post.content}
              </p>
              <p>
                <strong>Tags:</strong> {post.tags}
              </p>
            </div>
          ))
        ) : (
          <p className="nopost">Aucun post pour l'instant. Créez-en un !</p>
        )}
      </div>
    </div>
    
  );
};

export default Home;

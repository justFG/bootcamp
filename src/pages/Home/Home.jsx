import React from "react";
import { useNavigate } from "react-router-dom";
import FadeMenu from "../../componant/FadeMenu/FadeMenu";
import Navbar from "../../componant/Navbar/Navbar"
import "./Home.css";

const Home = ({ posts, setPosts, setPostToEdit}) => {
  const navigate = useNavigate();
  let isLoggin = localStorage.getItem("isLogged") === "true";

  const logout = () => {
    localStorage.setItem("isLogged", "false");
    localStorage.setItem("loggedInUser", "null");
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
    <>
    <Navbar isLoggin={isLoggin} logout={logout}/>
    <div className="home">
      
      <h1 className="home-title">Welcome to our website</h1>
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
                <strong>Author:</strong> {post.author}
              </p>
              <p>
                <strong>Content:</strong> {post.content}
              </p>
              <p>
                <strong>Tags:</strong> {post.tags}
              </p>
            </div>
          ))
        ) : (
          <p className="nopost">No posts yet. Create one!</p>
        )}
      </div>
    </div>
    </>
  );
};

export default Home;

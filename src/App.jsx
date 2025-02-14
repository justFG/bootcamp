import React, { useState,useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Formulaire from "./pages/Formulaire/Formulaire";
import Login from "./pages/Login/Login";

function App() {
  const [posts, setPosts] = useState([]); // Liste des posts
  const [postToEdit, setPostToEdit] = useState(null); // Post en cours de modification

  // Fonction pour ajouter ou modifier un post
  const addPost = (newPost) => {
    if (postToEdit !== null) {
      // Modifier un post existant
      const updatedPosts = posts.map((post, index) =>
        index === postToEdit.index ? newPost : post
      );
      setPosts(updatedPosts);
      setPostToEdit(null); // Réinitialise après modification
    } else {
      // Ajouter un nouveau post
      setPosts([...posts, newPost]);
    }
  };
  
  useEffect(() => {
    if (localStorage.getItem("isLogged") === null) {
      localStorage.setItem("isLogged", "false");
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home posts={posts} setPosts={setPosts} setPostToEdit={setPostToEdit}/>}/>
        <Route path="/formulaire" element={<Formulaire onAddPost={addPost} postToEdit={postToEdit}/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="*" element={<Home posts={posts} setPosts={setPosts} setPostToEdit={setPostToEdit}/>}/>
      </Routes>
    </Router>
  );
}

export default App;

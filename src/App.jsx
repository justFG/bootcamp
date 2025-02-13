import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home"; // Page principale
import Login from "./pages/Login/Login"; // Page de connexion
import Formulaire from "./pages/Formulaire/Formulaire"; // Formulaire

function App() {
  const [posts, setPosts] = useState([]);
  const [isLoggin, setIsLogin] = useState(true);

  const addPost = (newPost) => {
    setPosts([...posts, newPost]); // Ajouter un nouveau post
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home isLoggin={isLoggin} setIsLogin={setIsLogin} posts={posts} />} />
        <Route path="/formulaire" element={<Formulaire isLoggin={isLoggin} setIsLogin={setIsLogin} onAddPost={addPost} />} />
        <Route path="/login" element={<Login setIsLogin={setIsLogin} isLoggin={isLoggin}/>} />
      </Routes>
    </Router>
  );
}

export default App;

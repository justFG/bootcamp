import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Formulaire from "./pages/Formulaire/Formulaire";
import Login from "./pages/Login/Login";

function App() {
  const [posts, setPosts] = useState([]); // Liste des posts
  const [isLoggin, setIsLogin] = useState(false); // État de connexion
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

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              posts={posts}
              setPosts={setPosts}
              setPostToEdit={setPostToEdit} // Passe la fonction pour modifier
              isLoggin={isLoggin}
              setIsLogin={setIsLogin}
            />
          }
        />
        <Route
          path="/formulaire"
          element={
            <Formulaire
              isLoggin={isLoggin}
              setIsLogin={setIsLogin}
              onAddPost={addPost}
              postToEdit={postToEdit} // Passe le post à modifier
            />
          }
        />
        <Route
          path="/login"
          element={<Login setIsLogin={setIsLogin} isLoggin={isLoggin} />}
        />
      </Routes>
    </Router>
  );
}

export default App;

import './App.css'
import { Route, Routes, useParams } from "react-router-dom";
import { useState } from 'react';
import { Articles } from './components/Articles';
import { WholeArticle } from './components/WholeArticle';


function App() {
  const [article_id, setArticle_id] = useState(1);

  

  return (
    <>
      <div className="app">
        <header>
          <h1 id="headingText">NC NEWS</h1>
        </header>
        <main>
          <div className="backgroundPseudo">
            <Routes>
              <Route path="/articles" element={<Articles />} />
              <Route
                path="/articles/:article_id"
                element={
                  <WholeArticle
                    article_id={article_id}
                    setArticle_id={setArticle_id}
                  />
                }
              />
            </Routes>
          </div>
        </main>
        <footer>Users</footer>
      </div>
    </>
  );
}

export default App

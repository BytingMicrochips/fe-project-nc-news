import './App.css'
import { Route, Routes, useParams } from "react-router-dom";
import { useState } from 'react';
import { Articles } from './components/Articles';
import { WholeArticle } from './components/WholeArticle';
import { Comments } from './components/Comments';

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
                  <>
                    <div className="contentWrapper">
                      <div className="wholeArticleWrapper">
                        <WholeArticle article_id={article_id} />{" "}
                      </div>
                      <div className="commentWrapper">
                        <Comments article_id={article_id} />
                      </div>
                    </div>
                  </>
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

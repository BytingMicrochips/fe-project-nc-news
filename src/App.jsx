import './App.css'
import { Route, Routes } from "react-router-dom";

import { WholeArticle } from './components/WholeArticle';
import { Articles } from './components/Articles';

function App() {
  return (
    <>
      <div className="app">
        <header>NC NEWS</header>
          <main>
        <div className="backgroundPseudo">
            <Routes>
              <Route path="/api/articles" element={<Articles />} />
              <Route
                path="/api/articles/:article_id"
                element={<WholeArticle />}
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

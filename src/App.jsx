import './App.css'
import { Route, Routes, useParams } from "react-router-dom";
import { useState, createContext } from "react";
import { Header } from './components/Header';
import { Articles } from './components/Articles';
import { WholeArticle } from './components/WholeArticle';
import { Comments } from './components/Comments';
import { NewComment } from './components/NewComment';
import { Topics } from './components/Topics';
import { SingleTopic } from './components/SingleTopic';





export const CommentsContext = createContext();

function App() {
  const [article_id, setArticle_id] = useState(1);
  const [user, setUser] = useState("tickle122");
  const [commentsChanged, setCommentsChanged] = useState(false);
  return (
    <>
      <CommentsContext.Provider value={ [commentsChanged, setCommentsChanged] }>
        <div className="app">
          <Header />
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
                          <div className="newCommentWrapper">
                            <NewComment article_id={article_id} user={user} />
                          </div>
                        </div>
                        <div className="commentWrapper">
                          <Comments article_id={article_id} />
                        </div>
                      </div>
                    </>
                  }
                />
                <Route path="/topics" element={<Topics />} />
                <Route path="/topics/:topic" element={<SingleTopic />} />
              </Routes>
            </div>
          </main>
          <footer>Users</footer>
        </div>
      </CommentsContext.Provider>
    </>
  );
}

export default App

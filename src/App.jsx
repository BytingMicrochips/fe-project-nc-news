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
import { Homepage } from './components/Homepage';
import { ErrorPage } from './components/ErrorPage';
import { Footer } from './components/Footer';



export const CommentsContext = createContext();
export const UserContext = createContext();

function App() {
  const [article_id, setArticle_id] = useState(1);
  const [mystery, setMystery] = useState("");
  const [commentsChanged, setCommentsChanged] = useState(false);
  const [user, setUser] = useState("tickle122");

  return (
    <>
      <UserContext.Provider value={[user, setUser]}>
        <CommentsContext.Provider value={[commentsChanged, setCommentsChanged]}>
          <div className="app">
            <Header />
            <main>
              <div className="backgroundPseudo">
                <Routes>
                  <Route path="/" element={<Homepage />} />
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
                            <Comments article_id={article_id} user={user} />
                          </div>
                        </div>
                      </>
                    }
                  />
                  <Route path="/topics" element={<Topics />} />
                  <Route path="/topics/:topic" element={<SingleTopic />} />
                  <Route path="/:mystery" element={<ErrorPage />} />
                </Routes>
              </div>
            </main>
            <footer>
              <Footer />
            </footer>
          </div>
        </CommentsContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App

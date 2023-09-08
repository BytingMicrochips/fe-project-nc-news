import axios from "axios";
import { useNavigate } from "react-router-dom";
import { firstLetterUppercase } from "../utils/firstLetterUppercase";
import { useEffect, useState, Fragment } from "react";

export const Header = () => {
    const [topics, setTopics] = useState([]);
    const [capitalisedTopics, setCapitalisedTopics] = useState([]);
    const [navButtons, setNavButtons] = useState([]);
    const [numArticles, setNumArticles] = useState([]);
    const [articleId, setArticleId] = useState([]);
    const navigate = useNavigate(); 
    
    useEffect(() => {
        axios
        .get(`https://nc-news-service-h8vo.onrender.com/api/topics`)
        .then(({ data }) => {
            const slugs = data.map((topic) => topic.slug);
            setTopics(slugs);
        })
        .catch((err) => {});
    }, []);
    
    useEffect(() => {
        setCapitalisedTopics(firstLetterUppercase(topics))
        const navOptions = [ ...capitalisedTopics] 
        setNavButtons(navOptions)
    }, [topics])
    
    useEffect(() => {
        axios
        .get(`https://nc-news-service-h8vo.onrender.com/api/articles`)
        .then(({ data }) => {
            setNumArticles(data.articles.length);
        });  
    },[])
    
const randomArticleId = () => {
    const newArticleId = Math.floor(Math.random() * numArticles +1)
    setArticleId(newArticleId)
    return newArticleId
}



    return (
      <>
        <div className="headerWrapper" >
          <header>
            <h1 id="headingText">NC NEWS</h1>
          </header>
          <nav>
           
              <button key="home" onClick={() => navigate(`/`)}>
                Home
              </button>
              <button key="all" onClick={() => navigate(`/articles`)}>
                {" "}
                All Articles
              </button>
              <button key="topics" onClick={() => navigate(`/topics`)}>
                Topics
              </button>
              <button
                key="random"
                onClick={() => navigate(`/articles/${randomArticleId()}`)}
              >
                Random Article
              </button>
              {navButtons.map((option) => {
                return (
                  <Fragment key={option}>
                    <button
                      key={option}
                      onClick={() =>
                        navigate(`/topics/${option.split(" ")[0]}`)
                      }
                    >
                      {option}
                    </button>
                  </Fragment>
                );
              })}
           
          </nav>
        </div>
      </>
    );
};

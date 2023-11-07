import axios from "axios";
import { useNavigate } from "react-router-dom";
import { firstLetterUppercase } from "../utils/firstLetterUppercase";
import { useEffect, useState, Fragment } from "react";


export const Header = () => {
    const [navButtons, setNavButtons] = useState([]);
    const [numArticles, setNumArticles] = useState([]);
    const [articleId, setArticleId] = useState([]);
    const navigate = useNavigate(); 
    
    useEffect(() => {
      axios
      .get(`https://nc-news-service-h8vo.onrender.com/api/topics`)
      .then(({ data }) => {
        const slugs = data.map((topic) => topic.slug);
        const capitalised = firstLetterUppercase(slugs);
        setNavButtons(capitalised);
      })
      .catch((err) => {});
    }, []);    
    
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
        <div className="headerWrapper">
          <header>
            <h1 id="headingText">NC NEWS</h1>
          </header>
           {window.innerWidth < 364 ? (
    <>
    <nav>
            <div className="navButtons">
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
              
            </div>
      </nav>
    </>
 ) : (
   <>
     {" "}
     <nav>
       <div className="navButtons">
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
                 onClick={() => navigate(`/topics/${option.split(" ")[0]}`)}
               >
                 {option}
               </button>
             </Fragment>
           );
         })}
       </div>
     </nav>
   </>
 )
}
        </div>
      </>
    );
};

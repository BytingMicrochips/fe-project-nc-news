import axios from "axios";
import { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import loadingCircle from "../assets/icons8-loading-circle-office-m/icons8-loading-circle-80.png";


export const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    {
      setIsLoading(true);
    }
    axios
      .get(`https://nc-news-service-h8vo.onrender.com/api/articles`)
      .then(({ data }) => {
        {
          setIsLoading(false);
        }
        setArticles(data.articles);
      });
  }, []);

  if (isLoading === true) {
    return (
      <>
        <div className="loading">
          <img className="loadingChild" src={loadingCircle} />
        </div>
      </>
    );
  }

  if (articles.length !== 1) {
    return articles.map((titleCard) => {
      return (
        <>
          <div className="articleCard" key={titleCard.article_id}>
            <p className="articleTitle" key={titleCard.title}>
              {titleCard.title}
            </p> 
            <button
              className="readNowButton"
              onClick={()=> navigate(`/articles/${titleCard.article_id}`)}
              key={titleCard.created_at}>      
              Read article
            </button>
          </div>
        </>
      );
    });
  }
};
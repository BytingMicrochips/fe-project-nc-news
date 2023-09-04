import axios from "axios";
import { useEffect, useState } from "react";


export const Articles = () => {
    const [articles, setArticles] = useState([]);
    useEffect(() => {
        axios
            .get(`https://nc-news-service-h8vo.onrender.com/api/articles`)
            .then(({ data }) => {
                setArticles(data.articles);
            });
    }, []);
    const titlesOnly = articles.map((eachArticle) => {
        return eachArticle.title;
    });
    return titlesOnly.map((titleCard) => {
        return (
          <>
            <div className="articleCard">
              <p className="articleTitle" key={titleCard}>
                {titleCard}
              </p>
              <button className="readNowButton">Read article</button>
            </div>
          </>
        );
    })
}






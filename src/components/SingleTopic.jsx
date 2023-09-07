import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import thumbsUp from "../assets/thumbs-icons/thumb-up.png";
import thumbsDown from "../assets/thumbs-icons/thumb-down.png";

export const SingleTopic = () => {
    const [allArticles, setAllArticles] = useState([]);
    const [matchedArticles, setMatchedArticles] = useState([]);
    const params = useParams();
    const navigate = useNavigate();

useEffect(() => {
        // setIsLoading(true);
        axios
        .get(`https://nc-news-service-h8vo.onrender.com/api/articles`)
        .then(({ data }) => {
            // setIsLoading(false);
            setAllArticles(data.articles);
        })
}, [params.topic]);
                
useEffect(() => {
if (allArticles.length > 0) {
  const matched = allArticles.filter(
    (article) => article.topic === params.topic.toLowerCase()
  );
  setMatchedArticles(matched);
}
}, [allArticles])

    return matchedArticles.map((titleCard) => {
      return (
        <>
     
              <div className="articleCard" key={titleCard.article_id}>
                <p className="articleTitle" key={titleCard.title}>
                  {titleCard.title}
               
                </p>
                <div id="rightCardElements">
                  <button
                    id="readNowButton"
                    onClick={() =>
                      navigate(`/articles/${titleCard.article_id}`)
                    }
                    key={titleCard.created_at}
                  >
                    Read article
                  </button>
                  <div id="allArtVoting">
                    <img
                      src={thumbsDown}
                      onClick={() => {
                        handleDownvote(titleCard.article_id),
                          titleCard.votes - 1;
                      }}
                    />
                    <p>{titleCard.votes}</p>
                    <img
                      src={thumbsUp}
                      onClick={() => {
                        handleUpvote(titleCard.article_id);
                      }}
                    />
               
              </div>
            </div>
          </div>
        </>
      );
    });

};

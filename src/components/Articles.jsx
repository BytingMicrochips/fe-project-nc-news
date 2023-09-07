import axios from "axios";
import { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import loadingCircle from "../assets/icons8-loading-circle-office-m/icons8-loading-circle-80.png";
import thumbsUp from "../assets/thumbs-icons/thumb-up.png";
import thumbsDown from "../assets/thumbs-icons/thumb-down.png";

export const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [trueVotes, setTrueVotes] = useState(0);
  const navigate = useNavigate();

  const handleUpvote = (id) => {
    setTrueVotes(trueVotes + 1);
    axios
      .patch(
        `https://nc-news-service-h8vo.onrender.com/api/articles/${id}`,
        { inc_votes: 1 }
      )
      .then(({ data }) => {
        setTrueVotes(data.votes);
      })
      .catch((err) => {
        alert("failed to register upvote!");
      });
  };

  const handleDownvote = (id) => {
    setTrueVotes(trueVotes - 1);
    axios
      .patch(
        `https://nc-news-service-h8vo.onrender.com/api/articles/${id}`,
        { inc_votes: -1 }
      )
      .then(({ data }) => {
        setTrueVotes(data.votes);
      })
      .catch((err) => {
        alert("failed to register downvote!");
      });
  };

  useEffect(() => {
      setIsLoading(true);
    axios
      .get(`https://nc-news-service-h8vo.onrender.com/api/articles`)
      .then(({ data }) => {
        setIsLoading(false);
        setArticles(data.articles);
      });
  }, [trueVotes]);

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
            <div id="rightCardElements">
              <button
                id="readNowButton"
                onClick={() => navigate(`/articles/${titleCard.article_id}`)}
                key={titleCard.created_at}
              >
                Read article
              </button>
              <div id="allArtVoting">
                <img
                  src={thumbsDown}
                  onClick={() => { handleDownvote(titleCard.article_id), titleCard.votes-1 }}
                />
                <p>{titleCard.votes}</p>
                <img src={thumbsUp} onClick={() => { handleUpvote(titleCard.article_id); }} />
              </div>
            </div>
          </div>
        </>
      );
    });
  }
};
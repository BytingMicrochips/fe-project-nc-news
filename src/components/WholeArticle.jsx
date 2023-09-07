import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import gears from "../assets/gears/gears.svg";
import loadingCircle from "../assets/icons8-loading-circle-office-m/icons8-loading-circle-80.png";
import thumbsUp from "../assets/thumbs-icons/thumb-up.png";
import thumbsDown from "../assets/thumbs-icons/thumb-down.png";

export const WholeArticle = ({ article_id }) => {
  const [singleArticle, setSingleArticle] = useState({});
  const [displayErr, setDisplayErr] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [trueVotes, setTrueVotes] = useState(0);
  const params = useParams();
  const navigate = useNavigate();

  const handleUpvote = () => {
    setTrueVotes(trueVotes + 1);
    axios
      .patch(
        `https://nc-news-service-h8vo.onrender.com/api/articles/${params.article_id}`,
        { inc_votes: 1 }
      )
      .then(({ data }) => {
        setTrueVotes(data.votes);
      })
      .catch((err) => {
      });
  };

  const handleDownvote = () => {
    setTrueVotes(trueVotes - 1);
    axios
      .patch(
        `https://nc-news-service-h8vo.onrender.com/api/articles/${params.article_id}`,
        { inc_votes: -1 }
      )
      .then(({ data }) => {
        setTrueVotes(data.votes);
      })
      .catch((err) => {
      });
  };

  useEffect(() => {
    setDisplayErr(false);
    setIsLoading(true);
    axios
      .get(
        `https://nc-news-service-h8vo.onrender.com/api/articles/${params.article_id}`
      )
      .then(({ data }) => {
        console.log("🚀 ~ file: WholeArticle.jsx:53 ~ .then ~ data:", data)
        setTrueVotes(data.article.votes);

        setDisplayErr(false);
        setIsLoading(false);
        setSingleArticle(data);
      })
      .catch((err) => {
        setIsLoading(false);
        setDisplayErr(true);
      });
  }, [params.article_id]);
      
  if (isLoading === true) {
    return (
      <>
        <div className="loading">
          <img className="loadingChild" src={loadingCircle} />
        </div>
      </>
    );
  }

  if (displayErr === true) {
           return (
             <>
                 <div className="wholeArticle">
                   <div className="allHeadings">
                     <h2>
                       Sorry! <br />
                       We couldn't find that article
                     </h2>
                   </div>
                   <img id="errorGears" src={gears} />
                   <p id="errorMsg">
                     <em>
                       Please ammend your request or use the button below to
                       list all articles
                     </em>
                   </p>
                   <button
                     className="backToAll"
                     onClick={() => navigate("/articles")}
                     key="backToAll"
                   >
                     Back to all articles
                   </button>
                 </div>
             </>
           ); 
  }
  
  if (singleArticle.article) {
      return (
        <>
          <div className="wholeArticle">
            <div className="allHeadings">
              <h2>{singleArticle.article.title}</h2>
              <div className="articleSubheading">
                <h3 className="subheadingAuthor">
                  <em>{singleArticle.article.author}</em>
                </h3>
                <h3 className="subheadingDate">
                  <em>{singleArticle.article.created_at.substring(0, 10)}</em>
                </h3>
              </div>
            </div>
            <img src={singleArticle.article.article_img_url} />
            <p>{singleArticle.article.body}</p>
            <div id="articleVoting">
              <img src={thumbsDown} onClick={handleDownvote} />
              <p id="articleVotes">{trueVotes}</p>
              <img src={thumbsUp} onClick={handleUpvote} />
            </div>
            <button
              className="backToAll"
              onClick={() => navigate("/articles")}
              key="backToAll"
            >
              Back to all articles
            </button>
          </div>
        </>
      );
    } 
}

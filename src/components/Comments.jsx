import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import thumbsUp from "../assets/thumbs-icons/thumb-up.png";
import thumbsDown from "../assets/thumbs-icons/thumb-down.png";
import loadingCircle from "../assets/icons8-loading-circle-office-m/icons8-loading-circle-80.png";
import { CommentsContext } from "../App";


export const Comments = ({ article_id }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [commentsChanged, setCommentsChanged] = useContext(CommentsContext);
  console.log("🚀 ~ file: Comments.jsx:12 ~ Comments ~ commentsChanged:", commentsChanged)

  const params = useParams();

  const handleDownvote = (e) => {
  };

  const handleUpvote = (e) => {

  };





  useEffect(() => {
    console.log('fetching comments from db')
      setIsLoading(true);
    axios
      .get(
        `https://nc-news-service-h8vo.onrender.com/api/articles/${params.article_id}/comments`
      )
      .then(({ data }) => {
          setIsLoading(false);
        setComments(data.comments);
        console.log("🚀 ~ file: Comments.jsx:38 ~ .then ~ data.comments:", data.comments)
        setCommentsChanged(false);
      })
      .catch((err) => {
          setIsLoading(false);
      });
  }, [params.article_id, commentsChanged]);

  if (isLoading === true) {
    return (
      <>
        <div className="loading">
          <img className="loadingChild" src={loadingCircle} />
        </div>
      </>
    );
  }
  
  if (comments[0] !== "No comments found...") {
    return comments.map((comment) => {
      return (
        <>
          <div className="commentCard">
            <div id="authorDate">
              <h4 className="cardChild" id="authorOnly">
                {comment.author}
              </h4>
              <h4 className="cardChild">
                <em>
                  {comment.created_at.substring(0, 10)}{" "}
                  {comment.created_at.substring(12, 19)}
                </em>
              </h4>
            </div>
            <article className="cardChild">{comment.body}</article>
            <div id="voting">
              <img src={thumbsDown} onClick={handleDownvote} value="down" />
              <p id="cardChildVotes">{comment.votes}</p>
              <img src={thumbsUp} onClick={handleUpvote} value="up" />
            </div>
          </div>
        </>
      );
    });
  }
};

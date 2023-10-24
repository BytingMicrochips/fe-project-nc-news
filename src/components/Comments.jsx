import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext, Fragment } from "react";
import thumbsUp from "../assets/thumbs-icons/thumb-up.png";
import thumbsDown from "../assets/thumbs-icons/thumb-down.png";
import trash from "../assets/trash.png";
import { CommentsContext } from "../App";

export const Comments = ({ article_id, user }) => {
  const [comments, setComments] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [lastDeleted, setLastDeleted] = useState({})
  const [commentsChanged, setCommentsChanged] = useContext(CommentsContext);

  const params = useParams();

  const handleDownvote = (e) => {};

  const handleUpvote = (e) => {};


  const handleDelete = (e) => {
    setIsDeleted(false)
    const updateComments = comments.filter((comment) => {
      if (comment.comment_id !== e.currentTarget.value * 1) {
        return comment
      } else {
        setLastDeleted(comment)
      }
    })
    setComments(updateComments)
    axios
    .delete(
      `https://nc-news-service-h8vo.onrender.com/api/comments/${e.currentTarget.value}`
      ).then(() => {
        setIsDeleted(true)
      })
      .catch(() => {
        alert("comment delete request failed!");
      });
    };

  useEffect(() => {
    axios
      .get(
        `https://nc-news-service-h8vo.onrender.com/api/articles/${params.article_id}/comments`
      )
      .then(({ data }) => {
        setComments(data.comments);
        setCommentsChanged(false);
      })
      .catch((err) => {});
  }, [params.article_id, commentsChanged, isDeleted]);

const toggleOffDeleted = () => {
  setIsDeleted(false)
}

  if (isDeleted === true) {
    { setTimeout(() => { toggleOffDeleted() }, 2500) }
    return (
      <>
        <div className="commentCardRed">
          <article id="deleteConfirm">Successfully deleted your comment :</article>
          <div id="authorDate">
            <h4 className="cardChild" id="authorOnly">
              {lastDeleted.author}
            </h4>
            <h4 className="cardChild">
              <em>
                {lastDeleted.created_at.substring(0, 10)}{" "}
                {lastDeleted.created_at.substring(12, 19)}
              </em>
            </h4>
          </div>
          <article className="cardChild">{lastDeleted.body}</article>
          <div id="voting">
            <img src={thumbsDown} onClick={handleDownvote} value="down" />
            <p id="cardChildVotes">{lastDeleted.votes}</p>
            <img src={thumbsUp} onClick={handleUpvote} value="up" />
          </div>
        </div>
      </>
    );}
             

  if (comments[0] !== "No comments found...") {
    return comments.map((comment) => {
      return (
        <Fragment key={comment.comment_id}>
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
            {comment.author === user ? (
              <>
                <div id="deleteButtonWrapper">
                  <button
                    id="commentDeleteButton"
                    onClick={handleDelete}
                    key={comment.comment_id}
                    value={comment.comment_id}
                  >
                    <img id="trash" src={trash} />
                  </button>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </Fragment>
      );
    });
  }
}


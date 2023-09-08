import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import send from "../assets/send/send.png";
import sent from "../assets/send/sent.png";
import newComment from "../assets/newComment/newComment.png";
import thumbsUp from "../assets/thumbs-icons/thumb-up.png";
import thumbsDown from "../assets/thumbs-icons/thumb-down.png";
import postFail from "../assets/postFail.png";
import { CommentsContext } from "../App";


export const NewComment = ({ user }) => {
  const [isPosted, setIsPosted] = useState(false);
  const [postFailed, setPostFailed] = useState(false);
  const [comment, setComment] = useState("");
  const [commentsChanged, setCommentsChanged] = useContext(CommentsContext);
  
  const params = useParams();
  
  const handleDownvote = (e) => {};

  const handleUpvote = (e) => {};

  const handleSubmit = () => {
    if (comment !== "") {
      setIsPosted(false);
      setPostFailed(false);
      axios
        .post(
          `https://nc-news-service-h8vo.onrender.com/api/articles/${params.article_id}/comments`,
          {
            username: user,
            body: comment,
          }
        )
        .then(({ data }) => {
          setCommentsChanged(true);
          setIsPosted(true);
        })
        .catch((err) => {
          setIsPosted(true);
          setPostFailed(true);
        });
    }
  }

useEffect(() => {
setIsPosted(false);
}, [params.article_id])

const handleAnotherComment = () => {
  setIsPosted(false)
  setPostFailed(false);

  }

  if (isPosted === true) {
    return (
      <>
        <div id="postedFeedback">
          <div className="posted">
            <img className="postedChild" src={sent} />
          </div>
          <div id="optimisticComment">
            <div className="commentCard">
              <div id="authorDate">
                <h4 className="cardChild" id="authorOnly">
                  {user}
                </h4>
              </div>
              <article className="cardChild">{comment}</article>
              <div id="voting">
                <img src={thumbsDown} onClick={handleDownvote} value="down" />
                <p id="cardChildVotes">0</p>
                <img src={thumbsUp} onClick={handleUpvote} value="up" />
              </div>
            </div>
          </div>
          <div className="posted">
            <img
              className="postedChild"
              src={newComment}
              onClick={handleAnotherComment}
            />
          </div>
        </div>
      </>
    );
  }

  if (postFailed === true) {
    console.log('inside red land')
    return (
      <>
        <div id="postedFeedback">
          <div className="postedFailed">
            <img className="postedChildFailed" src={postFail} />
          </div>
          <div id="optimisticComment">
            <div className="commentCardFailed">
              <div id="authorDate">
                <h4 className="cardChildFailed" id="authorOnly">
                  {user}
                </h4>
              </div>
              <article className="cardChildFailed">{comment}</article>
              <div id="voting">
                <img src={thumbsDown} onClick={handleDownvote} value="down" />
                <p id="cardChildVotes">0</p>
                <img src={thumbsUp} onClick={handleUpvote} value="up" />
              </div>
            </div>
          </div>
          <div className="postedFailed">
            <img
              id="failedRetry"
              src={newComment}
              onClick={handleAnotherComment}
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <textarea
        id="inputComment"
        name="Text1"
        cols="40"
        rows="3"
        placeholder="Write a new comment here..."
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <button
        htmlFor="inputComment"
        onClick={() => {
          handleSubmit();
        }}
      >
        <img id="sendIcon" src={send} alt="submit comment now" />
      </button>
    </>
  );
};

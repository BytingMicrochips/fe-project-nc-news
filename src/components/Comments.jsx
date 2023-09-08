import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import thumbsUp from "../assets/thumbs-icons/thumb-up.png";
import thumbsDown from "../assets/thumbs-icons/thumb-down.png";
import trash from "../assets/trash.png";
import { CommentsContext } from "../App";


export const Comments = ({ article_id, user }) => {
  const [comments, setComments] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [toDelete, setToDelete] = useState(false);
  const [commentsChanged, setCommentsChanged] = useContext(CommentsContext);

  const params = useParams();

  const handleDownvote = (e) => {
  };

  const handleUpvote = (e) => {
  };

  const handleDelete = (comment_id) => {
    setIsDeleted(true)
    setToDelete(comment_id)
    if (isDeleted === true) {
      return(<h1>ITS GONE</h1>)
    }
    axios.delete(`https://nc-news-service-h8vo.onrender.com/api/comments/${comment_id}`).then(() => {
      // setCommentsChanged(true)
      // setIsDeleted(false)
    })
  }

  useEffect(() => {
    axios
      .get(
        `https://nc-news-service-h8vo.onrender.com/api/articles/${params.article_id}/comments`
      )
      .then(({ data }) => {
        setComments(data.comments);
        setCommentsChanged(false);
      })
      .catch((err) => {
      });
  }, [params.article_id, commentsChanged]);


  
  if (comments[0] !== "No comments found...") {
    return comments.map((comment) => {
      if (comment.author === user) {
        if (isDeleted === true) {
  
}
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
        <img id="trash" src={trash} onClick={() => { handleDelete(comment.comment_id) }} />
      </div>
    </div>
  </>
);
} else {
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
      }
      });
    
  }
};

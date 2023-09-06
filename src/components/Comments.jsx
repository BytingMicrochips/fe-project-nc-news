import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import thumbsUp from "../assets/thumbs-icons/thumb-up.png";
import thumbsDown from "../assets/thumbs-icons/thumb-down.png";


export const Comments = ({ article_id }) => {
  const [comments, setComments] = useState([]);
  const params = useParams();

  const handleDownvote = (e) => {
axios.patch(
  `https://nc-news-service-h8vo.onrender.com/api/articles/${article_id}`
);
  };

  const handleUpvote = (e) => {

  };





  useEffect(() => {
    //   setDisplayErr(false);
    //   setIsLoading(true);
    axios
      .get(
        `https://nc-news-service-h8vo.onrender.com/api/articles/${params.article_id}/comments`
      )
      .then(({ data }) => {
        //   setIsLoading(false);
        setComments(data.comments);
      })
      .catch((err) => {
        //   setIsLoading(false);
        //   setDisplayErr(true);
      });
  }, [article_id]);

  //if isLoading
  
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
        })   
};

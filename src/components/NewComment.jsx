import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import send from "../assets/send/send.png";
import sent from "../assets/send/sent.png";


export const NewComment = ({user}) => {
  const [isPosted, setIsPosted] = useState(false);
  const [comment, setComment] = useState("");
  const params = useParams();
  
  const handleSubmit = () => {
    console.log('inside handleSubmit')
        setIsPosted(false)
    axios
      .post(
        `https://nc-news-service-h8vo.onrender.com/api/articles/${params.article_id}/comments`,
        {
          username: user,
          body: comment,
        }
      )
      .then(({ data }) => {
        setIsPosted(true);
        console.log("🚀 ~ file: NewComment.jsx:14 ~ .then ~ isPOsted:", isPosted);
      })
      .catch((err) => {
        setIsPosted(false);
        alert("Failed to post comment!");
      });
      };
        
  if (isPosted === true) {
    return (
      <>
        <div className="posted">
          <img className="postedChild" src={sent} />
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


               
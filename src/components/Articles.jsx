import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import loadingCircle from "../assets/icons8-loading-circle-office-m/icons8-loading-circle-80.png";
import thumbsUp from "../assets/thumbs-icons/thumb-up.png";
import thumbsDown from "../assets/thumbs-icons/thumb-down.png";

export const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [trueVotes, setTrueVotes] = useState(0);
  const [filterBy, setFilterBy] = useState("votes");
  const [ascDesc, setAscDesc] = useState("asc");
  const [query, setQuery] = useState("");
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const handleUpvote = (id) => {
    setTrueVotes(trueVotes + 1);
    axios
      .patch(`https://nc-news-service-h8vo.onrender.com/api/articles/${id}`, {
        inc_votes: 1,
      })
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
      .patch(`https://nc-news-service-h8vo.onrender.com/api/articles/${id}`, {
        inc_votes: -1,
      })
      .then(({ data }) => {
        setTrueVotes(data.votes);
      })
      .catch((err) => {
        alert("failed to register downvote!");
      });
  };

  useEffect(() => {
    setQuery(`?sort_by=${filterBy}&&order=${ascDesc}`);
  }, [filterBy, ascDesc]);

  useEffect(() => {
    setSearchParams(query);
    setIsLoading(true);
    axios
      .get(`https://nc-news-service-h8vo.onrender.com/api/articles${query}`)
      .then(({ data }) => {
        setIsLoading(false);
        setArticles(data.articles);
      });
  }, [trueVotes, query]);

if (isLoading === true) {
    return (
      <>
        <div className="loading">
          <img className="loadingChild" src={loadingCircle} />
        </div>
      </>
    );
}

const handleFilter = (e) => {
  setFilterBy(e.target.value);
}

const handleAscDesc = (e) => {
    setAscDesc(e.target.value);
}
  
if (articles.length !== 1) {   
  return (
    <>
      <div className="allArticlesSub">
        <h1>All available articles</h1>
        <h3>Select a sort by option</h3>
        <div className="queriesSelect">
          <select className="sortSelect" defaultValue={filterBy}>
            <option value="votes" onClick={handleFilter}>
              Votes
            </option>
            <option value="created_at" onClick={handleFilter}>
              Date
            </option>
            <option value="comment_count" onClick={handleFilter}>
              Comment count
            </option>
          </select>
          <select className="ascDescSelect" defaultValue={ascDesc}>
            <option value="asc" onClick={handleAscDesc}>
              Ascending
            </option>
            <option value="desc" onClick={handleAscDesc}>
              Descending
            </option>
          </select>
        </div>
      </div>
      {articles.map((titleCard) => {
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
                    onClick={() => {
                      handleDownvote(titleCard.article_id), titleCard.votes - 1;
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
      })}
    </>
  );
}
};
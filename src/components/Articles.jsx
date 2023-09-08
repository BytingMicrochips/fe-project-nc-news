import axios from "axios";
import { useEffect, useState, Fragment } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import loadingCircle from "../assets/icons8-loading-circle-office-m/icons8-loading-circle-80.png";
import thumbsUp from "../assets/thumbs-icons/thumb-up.png";
import thumbsDown from "../assets/thumbs-icons/thumb-down.png";

export const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterBy, setFilterBy] = useState("votes");
  const [ascDesc, setAscDesc] = useState("asc");
  const [query, setQuery] = useState("");
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  

  
const handleUpvote = (e) => {
      const updatedArticles = articles.map((article) => {
        if (article.article_id === e.currentTarget.value*1){
          article.votes++;
          return article;
        } else {
          return article;
        }
      })
      setArticles(updatedArticles);
      axios
        .patch(
          `https://nc-news-service-h8vo.onrender.com/api/articles/${e.currentTarget.value}`,
          { inc_votes: 1 }
        )
        .catch((err) => {
          alert("failed to register upvote!");
        });
  };

const handleDownvote = (e) => {
      const updatedArticles = articles.map((article) => {
        if (article.article_id === e.currentTarget.value * 1) {
          article.votes--;
          return article;
        } else {
          return article;
        }
      });
      setArticles(updatedArticles);
      axios
        .patch(
          `https://nc-news-service-h8vo.onrender.com/api/articles/${e.currentTarget.value}`,
          { inc_votes: -1 }
        )
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
  }, [query]);

if (isLoading === true) {
    return (
      <Fragment key="loadingMsg">
        <div className="loading">
          <img className="loadingChild" src={loadingCircle} />
        </div>
      </Fragment>
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
    <Fragment key="allArts">
      <div className="allArticlesSub">
        <h1>All available articles</h1>
        <h3>Select a sort by option</h3>
        <div className="queriesSelect">
          <select
            className="sortSelect"
            defaultValue={filterBy}
            onChange={handleFilter}
          >
            <option value="votes">Votes</option>
            <option value="created_at">Date</option>
            <option value="comment_count">Comment count</option>
          </select>
          <select
            className="ascDescSelect"
            defaultValue={ascDesc}
            onChange={handleAscDesc}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      {articles.map((titleCard) => {
        return (
          <Fragment key={titleCard.article_id}>
            <div className="articleCard" key={titleCard.article_id}>
              <p className="articleTitle" key={titleCard.title}>
                {titleCard.title}
              </p>
              <div className="rightCardElements">
                <button
                  id="readNowButton"
                  onClick={() => navigate(`/articles/${titleCard.article_id}`)}
                  key={titleCard.created_at}
                >
                  Read article
                </button>
                <div id="allArtVoting">
                  <button onClick={handleDownvote} value={titleCard.article_id}>
                    <img
                      src={thumbsDown}
                      onClick={() => {
                        handleDownvote;
                      }}
                    />
                  </button>
                  <p>{titleCard.votes}</p>
                  <button onClick={handleUpvote} value={titleCard.article_id}>
                    <img src={thumbsUp} />
                  </button>
                </div>
              </div>
            </div>
          </Fragment>
        );
      })}
    </Fragment>
  );
}
};
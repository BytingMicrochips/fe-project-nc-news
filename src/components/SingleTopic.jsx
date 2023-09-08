import axios from "axios";
import { useEffect, useState, Fragment } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import thumbsUp from "../assets/thumbs-icons/thumb-up.png";
import thumbsDown from "../assets/thumbs-icons/thumb-down.png";
import loadingCircle from "../assets/icons8-loading-circle-office-m/icons8-loading-circle-80.png";
import gears from "../assets/gears/gears.svg";

export const SingleTopic = () => {
  const [allArticles, setAllArticles] = useState([]);
  const [matchedArticles, setMatchedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayErr, setDisplayErr] = useState(false);
  const [filterBy, setFilterBy] = useState("votes");
  const [ascDesc, setAscDesc] = useState("asc");
  const [query, setQuery] = useState("");

    let [searchParams, setSearchParams] = useSearchParams();
    const params = useParams();
    const navigate = useNavigate();
    
  useEffect(() => {
      setSearchParams(query);
      setDisplayErr(false);
      setIsLoading(true);
        axios
        .get(`https://nc-news-service-h8vo.onrender.com/api/articles${query}`)
          .then(({ data }) => {
            setIsLoading(false)
            setAllArticles(data.articles)
            
          })
          .catch((err) => {
            setDisplayErr(true)
        })
}, [params.topic, query]);
                
useEffect(() => {
if (allArticles.length > 0) {
  const matched = allArticles.filter(
    (article) => article.topic === params.topic.toLowerCase()
  );
  setMatchedArticles(matched);
}
}, [allArticles])

useEffect(() => {
    setQuery(`?sort_by=${filterBy}&&order=${ascDesc}`);
}, [filterBy, ascDesc]);

const handleFilter = (e) => {
  setFilterBy(e.target.value);
}

const handleAscDesc = (e) => {
    setAscDesc(e.target.value);
}
  
if (isLoading === true) {
  return (
    <Fragment key="loading">
      <div className="loading">
        <img className="loadingChild" src={loadingCircle} />
      </div>
    </Fragment>
  );
}

if (displayErr === true) {
    return (
      <Fragment key="errMsg">
        <div className="wholeArticle">
          <div className="allHeadings">
            <h2>
              Sorry! <br />
              Unable to fetch articles on {params.topic}
            </h2>
          </div>
          <img id="errorGears" src={gears} />
          <p id="errorMsg">
            <em>
              Please ammend your request or use the button below to list all
              articles
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
      </Fragment>
    );
}

const handleUpvote = (e) => {
  const updatedArticles = matchedArticles.map((article) => {
    if (article.article_id === e.currentTarget.value * 1) {
      article.votes++;
      return article;
    } else {
      return article;
    }
  });
  setMatchedArticles(updatedArticles);
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
  const updatedArticles = matchedArticles.map((article) => {
    if (article.article_id === e.currentTarget.value * 1) {
      article.votes--;
      return article;
    } else {
      return article;
    }
  });
  setMatchedArticles(updatedArticles);
  axios
    .patch(
      `https://nc-news-service-h8vo.onrender.com/api/articles/${e.currentTarget.value}`,
      { inc_votes: -1 }
    )
    .catch((err) => {
      alert("failed to register downvote!");
    });
};

if (matchedArticles.length !== 0) {
    return (
      <Fragment key="matchedArts">
        <div className="allArticlesSub">
          <h1>Articles about {params.topic}</h1>
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

        {matchedArticles.map((titleCard) => {
          return (
            <Fragment key={titleCard.article_id}>
              <div className="articleCard" key={titleCard.article_id}>
                <p className="articleTitle" key={titleCard.title}>
                  {titleCard.title}
                </p>
                <div className="rightCardElements">
                  <button
                    id="readNowButton"
                    onClick={() =>
                      navigate(`/articles/${titleCard.article_id}`)
                    }
                    key={titleCard.created_at}
                  >
                    Read article
                  </button>
                  <div id="allArtVoting">
                    <button
                      id="hiddenVoteButton"
                      onClick={handleDownvote}
                      value={titleCard.article_id}
                    >
                      <img
                        src={thumbsDown}
                        onClick={() => {
                          handleDownvote;
                        }}
                      />
                    </button>
                    <p>{titleCard.votes}</p>
                    <button
                      id="hiddenVoteButton"
                      onClick={handleUpvote}
                      value={titleCard.article_id}
                    >
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
} else {
  return(<h1>error image</h1>)
  }
};

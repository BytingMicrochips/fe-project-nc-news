import axios from "axios";
import { useEffect, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import gears from "../assets/gears/gears.svg";
import loadingCircle from "../assets/icons8-loading-circle-office-m/icons8-loading-circle-80.png";

export const Homepage = () => {
  const [recentArticles, setRecentArticles] = useState([]);
  const [hotArticles, setHotArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayErr, setDisplayErr] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setDisplayErr(false);
    setIsLoading(true);
    axios
      .get(
        `https://nc-news-service-h8vo.onrender.com/api/articles?sort_by=created_at`
      )
      .then(({ data }) => {
        setRecentArticles(data.articles.slice(0, 4));

        setDisplayErr(false);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setDisplayErr(true);
      });
  }, []);

  useEffect(() => {
    setDisplayErr(false);
    setIsLoading(true);
    axios
      .get(
        `https://nc-news-service-h8vo.onrender.com/api/articles?sort_by=votes`
      )
      .then(({ data }) => {
        setHotArticles(data.articles.slice(0, 4));

        setDisplayErr(false);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setDisplayErr(true);
      });
  }, []);


  if (displayErr === true) {
    return (
      <Fragment key="errorMsg">
        <div className="wholeArticle">
          <div className="allHeadings">
            <h2>
              Sorry! <br />
              Homepage failed to load
            </h2>
          </div>
          <img id="errorGears" src={gears} />
          <p id="errorMsg">
            <em>
              Please refresh your page, view articles using the button below or
              select from the navigation bar above
            </em>
          </p>
          <button
            className="backToAll"
            onClick={() => navigate("/articles")}
            key="backToAll"
          >
            Show all articles
          </button>
        </div>
      </Fragment>
    );
  }

  if (isLoading === true) {
    return (
      <Fragment key="loadingCircle">
        <div className="loading">
          <img className="loadingChild" src={loadingCircle} />
        </div>
      </Fragment>
    );
  }

  if (recentArticles.length !== 0) {
    return (
      <Fragment key="recentArts">
        <div id="recentHeading">
          <h3>Our most recent articles</h3>
        </div>
        <div id="recentsWrapper">
          {recentArticles.map((article) => {
            return (
              <Fragment key={article.article_id}>
                <div id="recentCard">
                  <div id="homepageArticle">
                    <div className="wholeArticle">
                      <div
                        className="allHeadings"
                        id="recentArticleText"
                        onClick={() =>
                          navigate(`/articles/${article.article_id}`)
                        }
                      >
                        <h2>{article.title}</h2>
                        <div className="articleSubheading">
                          <h3 className="subheadingAuthor">
                            <em>{article.author}</em>
                          </h3>
                          <h3 className="subheadingDate">
                            <em>{article.created_at.substring(0, 10)}</em>
                          </h3>
                        </div>
                      </div>
                      <img
                        id="recentArticleImg"
                        src={article.article_img_url}
                      />
                    </div>
                  </div>
                </div>
              </Fragment>
            );
          })}
        </div>

        {hotArticles.length !== 0 ? (
          <Fragment key="hotArts">
            <div id="recentHeading">
              <h3>Current hottest articles</h3>
            </div>
            <div id="recentsWrapper">
              {hotArticles.map((article) => {
                return (
                  <Fragment key={article.article_id}>
                    <div id="recentCard">
                      <div id="homepageArticle">
                        <div className="wholeArticle">
                          <div
                            className="allHeadings"
                            id="recentArticleText"
                            onClick={() =>
                              navigate(`/articles/${article.article_id}`)
                            }
                          >
                            <h2>{article.title}</h2>
                            <div className="articleSubheading">
                              <h3 className="subheadingAuthor">
                                <em>{article.author}</em>
                              </h3>
                              <h3 className="subheadingDate">
                                <em>{article.created_at.substring(0, 10)}</em>
                              </h3>
                            </div>
                          </div>
                          <img
                            id="recentArticleImg"
                            src={article.article_img_url}
                          />
                        </div>
                      </div>
                    </div>
                  </Fragment>
                );
              })}
            </div>
          </Fragment>
        ) : (
          <Fragment key="noHotArts"></Fragment>
        )}
      </Fragment>
    );
  }
};

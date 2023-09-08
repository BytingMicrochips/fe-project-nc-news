import axios from "axios";
import { useNavigate } from "react-router-dom";
import { firstLetterUppercase } from "../utils/firstLetterUppercase";
import { useEffect, useState, Fragment } from "react";
import loadingCircle from "../assets/icons8-loading-circle-office-m/icons8-loading-circle-80.png";
import gears from "../assets/gears/gears.svg";

export const Topics = () => {
  const [topics, setTopics] = useState([]);
  const [capitalisedTopics, setCapitalisedTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [displayErr, setDisplayErr] = useState(false);
  const navigate = useNavigate(); 
    
  useEffect(() => {
    setDisplayErr(false);
    setIsLoading(true);
    axios
      .get(`https://nc-news-service-h8vo.onrender.com/api/topics`)
      .then(({ data }) => {
        const slugs = data.map((topic) => topic.slug);
        setTopics(slugs);
      })
      .catch((err) => {
        setIsLoading(false);
        setDisplayErr(true);
      });
  }, []);

  useEffect(() => {
    setCapitalisedTopics(firstLetterUppercase(topics));
    setIsLoading(false);
    setDisplayErr(false);
  }, [topics]);

  if (isLoading === true) {
    return (
      <Fragment key="loadingFrag">
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
              We couldn't find that article
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
    
  return (
    <Fragment key="allTops">
      <div className="allTopics">
        <div className="wholeTopics">
          <div className="topicHeadings">
            <h2>Find the News you care about!</h2>
          </div>
          {capitalisedTopics.map((topic) => {
            return (
              <p key={topic} onClick={() => navigate(`/topics/${topic}`)}>
                {topic}
              </p>
            );
          })}
          <button
            className="backToAll"
            onClick={() => navigate("/articles")}
            key="backToAll"
          >
            Back to all articles
          </button>
        </div>
      </div>
    </Fragment>
  );
};

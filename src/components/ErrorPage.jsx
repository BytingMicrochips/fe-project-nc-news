import gears from "../assets/gears/gears.svg";
import { useParams, useNavigate } from "react-router-dom";
import { Fragment } from "react";

export const ErrorPage = () => {
    const params = useParams();
    const navigate = useNavigate();

    return (
      <Fragment key="errMsg">
        <div className="wholeArticle">
          <div className="allHeadings">
            <h2>
              Ooops! <br />
              You must be lost looking for {params.mystery}
            </h2>
          </div>
          <img id="errorGears" src={gears} />
          <p id="errorMsg">
            <em>
              Please ammend your request or use the button below to return to homepage
            </em>
          </p>
          <button
            className="backToAll"
            onClick={() => navigate("/")}
            key="backToAll"
          >
            Back to homepage
          </button>
        </div>
      </Fragment>
    );
};

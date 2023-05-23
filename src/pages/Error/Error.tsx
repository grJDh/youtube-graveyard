import { useRouteError } from "react-router-dom";

import Title from "../../components/Title/Title";

import "./Error.css";
import LinkButton from "../../components/Buttons/LinkButton";

const Error = () => {
  const error = useRouteError();

  return (
    <div className="error-container">
      <Title
        text="Oops! Something went wrong"
        coffin
      />
      <main className="error-text">
        <p className="error">Error: {error.statusText || error.message}</p>
        <LinkButton
          main
          reload
          text="Return to Start"
          to="/"
        />
      </main>
    </div>
  );
};

export default Error;

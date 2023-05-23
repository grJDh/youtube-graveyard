import { isRouteErrorResponse, useRouteError } from "react-router-dom";

import Title from "../../components/Title/Title";

import "./ErrorPage.css";
import LinkButton from "../../components/Buttons/LinkButton";

const ErrorPage = () => {
  const error = useRouteError();

  const returnErrorMessage = () => {
    if (isRouteErrorResponse(error)) return error.statusText;

    if (error instanceof Error) return error.message;

    return "Error unknown";
  };

  console.error(returnErrorMessage());

  return (
    <div className="error-container">
      <Title
        text="Oops! Something went wrong"
        coffin
      />
      <main className="error-text">
        <p className="error">Error: {returnErrorMessage()}</p>
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

export default ErrorPage;

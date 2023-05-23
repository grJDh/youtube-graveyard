import LinkButton from "../Buttons/LinkButton";

import "./ErrorResponse.css";

const ErrorResponse = ({ text }) => {
  return (
    <main className="error-response-container">
      <p>{text}</p>
      <LinkButton
        main
        text="Return to Start"
        to="/"
        reload
      />
    </main>
  );
};

export default ErrorResponse;

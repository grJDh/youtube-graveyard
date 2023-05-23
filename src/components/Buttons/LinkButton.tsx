import { Link } from "react-router-dom";

import "./Buttons.css";

const LinkButton = ({ to, main = false, text, reload = false, state = {} }) => {
  return (
    <Link
      to={to}
      className={`button ${main ? "main-button" : ""}`}
      reloadDocument={reload}
      state={state}
    >
      {text}
    </Link>
  );
};

export default LinkButton;

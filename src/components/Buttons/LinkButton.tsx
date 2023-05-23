import { Link } from "react-router-dom";

import "./Buttons.css";

interface LinkButtonProps {
  to: string;
  main?: boolean;
  text: string;
  reload?: boolean;
}

const LinkButton = ({ to, main = false, text, reload = false }: LinkButtonProps) => {
  return (
    <Link
      to={to}
      className={`button ${main ? "main-button" : ""}`}
      reloadDocument={reload}
    >
      {text}
    </Link>
  );
};

export default LinkButton;

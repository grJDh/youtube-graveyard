import { Link } from "react-router-dom";

import grave_main from "../../assets/grave_main.svg";
import coffin_error from "../../assets/coffin_error.svg";

import "./Title.css";

interface TitleProps {
  text?: string;
  coffin?: boolean;
}

const Title = ({ text = "YouTube Graveyard", coffin = false }: TitleProps) => {
  return (
    <header className="title">
      <Link
        to="/"
        reloadDocument
        aria-label="Return to the Start"
      >
        <img
          src={coffin ? coffin_error : grave_main}
          alt="Logo"
        />
        <h1>{text}</h1>
      </Link>
    </header>
  );
};

export default Title;

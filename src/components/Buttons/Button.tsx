import "./Buttons.css";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  main?: boolean;
  submit?: boolean;
}

const Button = ({ text, onClick, main = false, submit = false }: ButtonProps) => {
  return (
    <button
      className={`button ${main ? "main-button" : ""}`}
      onClick={submit ? () => null : onClick}
      type={submit ? "submit" : "button"}
    >
      {text}
    </button>
  );
};

export default Button;

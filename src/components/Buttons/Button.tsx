import "./Buttons.css";

const Button = ({ text, onClick, main = false, submit = false }) => {
  return (
    <button
      className={`button ${main ? "main-button" : ""}`}
      onClick={submit ? null : onClick}
      type={submit ? "submit" : "button"}
    >
      {text}
    </button>
  );
};

export default Button;

import "./Spoiler.css";

const Spoiler = ({ children, title }) => {
  return (
    <details className="spoiler-wrapper">
      <summary className="spoiler-title">{title}</summary>
      <div className="spoiler-content">{children}</div>
    </details>
  );
};

export default Spoiler;

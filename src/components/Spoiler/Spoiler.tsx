import "./Spoiler.css";

interface SpoilerProps {
  children: React.ReactNode;
  title: string;
}

const Spoiler = ({ children, title }: SpoilerProps) => {
  return (
    <details className="spoiler-wrapper">
      <summary className="spoiler-title">{title}</summary>
      <div className="spoiler-content">{children}</div>
    </details>
  );
};

export default Spoiler;

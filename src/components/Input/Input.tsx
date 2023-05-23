import "./Input.css";

interface InputProps {
  text: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  value: string;
  pattern: string;
  help: string;
}

const Input = ({ text, placeholder, onChange, required = false, value, pattern, help }: InputProps) => {
  return (
    <label className="text-input-label">
      <p>{text}</p>
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        value={value}
        name="channelID"
        pattern={pattern}
        title={help}
      />
    </label>
  );
};

export default Input;

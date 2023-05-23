import "./Input.css";

const Input = ({ text, placeholder, onChange, required = false, value, pattern, help }) => {
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

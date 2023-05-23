import "./NumberInput.css";

const NumberInput = ({ text, min, value, onChange }) => {
  return (
    <label className="number-input-label">
      <p>{text}</p>
      <input
        type="number"
        min={min}
        value={value}
        onChange={onChange}
        inputMode="decimal"
      />
    </label>
  );
};

export default NumberInput;

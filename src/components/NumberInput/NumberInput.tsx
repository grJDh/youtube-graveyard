import "./NumberInput.css";

interface NumberInputProps {
  text: string;
  min: number;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NumberInput = ({ text, min, value, onChange }: NumberInputProps) => {
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

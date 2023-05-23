import "./Dropdown.css";

interface DropdownProps {
  text: string;
  options: string[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}

const Dropdown = ({ text, options, onChange, value }: DropdownProps) => {
  return (
    <label className="dropdown-label">
      <p>{text}</p>
      <select
        onChange={onChange}
        value={value}
      >
        {options.map((option, i) => (
          <option
            key={i}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Dropdown;

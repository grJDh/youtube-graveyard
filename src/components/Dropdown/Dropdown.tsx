import "./Dropdown.css";

const Dropdown = ({ text, options, onChange, value }) => {
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

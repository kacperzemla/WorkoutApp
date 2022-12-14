import "../Styles/functional.css";

export default function Input({
  placeholder,
  onChange,
  value,
  type,
  max,
  maxlength,
  required,
  name
}) {
  return (
    <input
      className="form__input"
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      type={type}
      max={max}
      maxLength={maxlength}
      required={required}
      name={name}
    />
  );
}

Input.defaultProps = {
  type: "text",
};

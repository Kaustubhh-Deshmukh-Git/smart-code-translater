import { LANGUAGES } from "../constants/languages.js";

const LanguageSelector = ({
  value,
  onChange,
  disabled = false,
  "aria-label": ariaLabel = "Select language",
}) => {
  return (
    <select
      className="lang-select"
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {LANGUAGES.map((lang) => (
        <option key={lang.id} value={lang.id}>
          {lang.name}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;

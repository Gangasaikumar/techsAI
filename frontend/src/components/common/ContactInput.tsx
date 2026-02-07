import { useState } from "react";

interface ContactInputProps {
  label: string;
  placeholder: string;
  type?: string;
  isTextArea?: boolean;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}

const ContactInput = ({
  label,
  placeholder,
  type = "text",
  isTextArea = false,
  value,
  onChange,
  error,
  required = true,
}: ContactInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`input-group ${error ? "has-error" : ""}`}>
      {/* Label positioned on top of the border */}
      <label
        className={`input-label ${isFocused || value ? "focused" : ""} ${error ? "error-label" : ""}`}
      >
        {label} {required && <span className="required-star">*</span>}
      </label>

      {isTextArea ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`contact-textarea ${error ? "error-border" : ""}`}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`contact-input ${error ? "error-border" : ""}`}
        />
      )}

      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default ContactInput;

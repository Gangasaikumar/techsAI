import { useState } from "react";

interface ContactInputProps {
  label: string;
  placeholder: string;
  type?: string;
  isTextArea?: boolean;
}

const ContactInput = ({
  label,
  placeholder,
  type = "text",
  isTextArea = false,
}: ContactInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="input-group">
      {/* Label positioned on top of the border */}
      <label className={`input-label ${isFocused ? "focused" : ""}`}>
        {label} <span className="required-star">*</span>
      </label>

      {isTextArea ? (
        <textarea
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="contact-textarea"
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="contact-input"
        />
      )}
    </div>
  );
};

export default ContactInput;

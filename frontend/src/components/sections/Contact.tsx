import { useState, useRef, type ChangeEvent } from "react";
import SectionContainer from "../layout/SectionContainer";
import { Check, ChevronRight, Paperclip, X, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "../../styles/Contact.css";
import ContactInput from "../common/ContactInput";
import SectionHeader from "../common/SectionHeader";

interface FormState {
  fullName: string;
  email: string;
  mobile: string;
  message: string;
  file: File | null;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  mobile?: string;
  message?: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormState>({
    fullName: "",
    email: "",
    mobile: "",
    message: "",
    file: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const validateMobile = (mobile: string) => {
    return String(mobile).match(/^[0-9]{10}$/);
  };

  const handleInputChange = (field: keyof FormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }

      // Cleanup old blob URL
      if (blobUrl) URL.revokeObjectURL(blobUrl);

      const newBlobUrl = URL.createObjectURL(file);
      setBlobUrl(newBlobUrl);
      setFormData((prev) => ({ ...prev, file }));

      if (file.type.startsWith("image/")) {
        setFilePreview(newBlobUrl);
      } else if (file.type === "application/pdf") {
        setFilePreview("pdf");
      } else {
        setFilePreview("other");
      }
    }
  };

  const removeFile = () => {
    if (blobUrl) URL.revokeObjectURL(blobUrl);
    setFormData((prev) => ({ ...prev, file: null }));
    setFilePreview(null);
    setBlobUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSend = () => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (formData.mobile && !validateMobile(formData.mobile)) {
      newErrors.mobile = "Mobile number must be 10 digits";
    }

    if (!formData.message.trim()) newErrors.message = "Message is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStatus("sending");
    // Simulate API call
    setTimeout(() => {
      setStatus("sent");
      setFormData({
        fullName: "",
        email: "",
        mobile: "",
        message: "",
        file: null,
      });
      setFilePreview(null);
      if (blobUrl) URL.revokeObjectURL(blobUrl);
      setBlobUrl(null);
      setTimeout(() => setStatus("idle"), 3000);
      alert("Message sent successfully!");
    }, 1500);
  };

  return (
    <SectionContainer id="contact">
      <SectionHeader title="Contact" subtitle="LET'S TALK" />

      <div className="contact-grid">
        {/* Left Column: Inputs */}
        <div className="contact-inputs">
          <ContactInput
            label="Full Name"
            placeholder="Ex. Gangasai kumar G"
            value={formData.fullName}
            onChange={(val) => handleInputChange("fullName", val)}
            error={errors.fullName}
          />
          <ContactInput
            label="Email Address"
            placeholder="Ex. gangasaikumar55555@gmail.com"
            type="email"
            value={formData.email}
            onChange={(val) => handleInputChange("email", val)}
            error={errors.email}
          />
          <ContactInput
            label="Mobile No"
            placeholder="Ex. 8978733587"
            type="tel"
            value={formData.mobile}
            onChange={(val) => handleInputChange("mobile", val)}
            error={errors.mobile}
            required={false}
          />

          {/* File Upload Section */}
          <div className="file-upload-section">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*,application/pdf"
              style={{ display: "none" }}
            />
            {!filePreview ? (
              <button
                type="button"
                className="file-upload-btn"
                onClick={() => fileInputRef.current?.click()}
              >
                <Paperclip size={18} /> Add Attachment (Optional)
              </button>
            ) : (
              <div
                className={`file-preview-container ${filePreview === "pdf" ? "is-pdf" : "is-image"}`}
              >
                <div className="file-preview-content">
                  {filePreview === "pdf" ? (
                    <div
                      className="file-icon-preview clickable"
                      onClick={() => setShowModal(true)}
                      title="Click to preview PDF"
                    >
                      <FileText size={24} />
                      <span>{formData.file?.name}</span>
                    </div>
                  ) : filePreview === "other" ? (
                    <div className="file-icon-preview">
                      <Paperclip size={24} />
                      <span>{formData.file?.name}</span>
                    </div>
                  ) : (
                    <div
                      className="image-preview-wrapper"
                      onClick={() => setShowModal(true)}
                    >
                      <img
                        src={filePreview}
                        alt="Preview"
                        className="image-preview clickable"
                        title="Click to view full size"
                      />
                      <span>{formData.file?.name}</span>
                    </div>
                  )}
                  <button
                    type="button"
                    className="remove-file-btn"
                    onClick={removeFile}
                    title="Remove file"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Message & Button */}
        <div className="contact-message-area">
          <ContactInput
            label="Message"
            placeholder="Ex. message"
            isTextArea={true}
            value={formData.message}
            onChange={(val) => handleInputChange("message", val)}
            error={errors.message}
          />
          <div className="submit-btn-wrapper">
            <motion.button
              className={`contact-btn ${status !== "idle" ? "active" : ""}`}
              onClick={status === "idle" ? handleSend : undefined}
              disabled={status === "sending"}
              whileHover={status === "idle" ? { scale: 1.05 } : {}}
              whileTap={status === "idle" ? { scale: 0.95 } : {}}
            >
              {status === "idle" && (
                <>
                  Contact Me <ChevronRight size={18} />
                </>
              )}
              {status === "sending" && (
                <>
                  <div className="spinner"></div> Sending...
                </>
              )}
              {status === "sent" && (
                <>
                  Message Sent! <Check size={18} />
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* PDF / Image Preview Modal */}
      <AnimatePresence>
        {showModal && blobUrl && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="modal-container"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close-btn"
                onClick={() => setShowModal(false)}
              >
                <X size={24} />
              </button>
              <div className="modal-content">
                {formData.file?.type === "application/pdf" ? (
                  <iframe
                    src={`${blobUrl}#toolbar=0`}
                    className="pdf-preview-frame"
                    title="PDF Preview"
                  />
                ) : (
                  <img src={blobUrl} alt="Preview" className="modal-image" />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionContainer>
  );
};

export default Contact;

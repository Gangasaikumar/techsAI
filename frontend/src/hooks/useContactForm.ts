import { useState, useRef, type ChangeEvent } from "react";
import { toast } from "react-hot-toast";
import { submitContactForm } from "../api/contact";

export interface FormState {
  fullName: string;
  email: string;
  mobile: string;
  message: string;
  file: File | null;
}

export interface FormErrors {
  fullName?: string;
  email?: string;
  mobile?: string;
  message?: string;
}

export const useContactForm = () => {
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
        toast.error("File size should be less than 5MB");
        return;
      }

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

  const handleSend = async () => {
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

    try {
      const data = new FormData();
      data.append("fullName", formData.fullName);
      data.append("email", formData.email);
      if (formData.mobile) data.append("mobile", formData.mobile);
      data.append("message", formData.message);
      if (formData.file) {
        data.append("file", formData.file);
      }

      await submitContactForm(data);

      setStatus("sent");
      toast.success("Message sent successfully! 🚀");
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
    } catch (err: unknown) {
      setStatus("idle");
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to send message. Please try again.";
      toast.error(errorMessage);
    }
  };

  return {
    formData,
    errors,
    filePreview,
    blobUrl,
    showModal,
    setShowModal,
    status,
    fileInputRef,
    handleInputChange,
    handleFileChange,
    removeFile,
    handleSend,
  };
};

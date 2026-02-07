import { useState } from "react";
import SectionContainer from "../layout/SectionContainer";
import { Send, Check, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "../../styles/Contact.css";
import ContactInput from "../common/ContactInput";
import SectionHeader from "../common/SectionHeader";

const Contact = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSend = () => {
    setStatus("sending");
    // Simulate API call and Animation Time
    setTimeout(() => {
      setStatus("sent");
      // Reset button state after a delay
      setTimeout(() => setStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <SectionContainer id="contact">
      <SectionHeader title="Contact" subtitle="LET'S TALK" />

      <div className="contact-grid">
        {/* Left Column: Inputs */}
        <div>
          <ContactInput label="Full Name" placeholder="Ex. Gangasai kumar G" />
          <ContactInput
            label="Email Address"
            placeholder="Ex. gangasaikumar55555@gmail.com"
            type="email"
          />
          <ContactInput
            label="Mobile No"
            placeholder="Ex. 8978733587"
            type="tel"
          />
        </div>

        {/* Right Column: Message & Button */}
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <ContactInput
            label="Message"
            placeholder="Ex. message"
            isTextArea={true}
          />
          <div
            style={{
              marginTop: "auto",
              textAlign: "right",
              height: "50px",
              position: "relative",
            }}
          >
            <AnimatePresence mode="wait">
              {status === "idle" && (
                <motion.button
                  key="idle"
                  className="contact-btn"
                  onClick={handleSend}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  layout="position"
                >
                  Contact Me <ChevronRight size={18} />
                </motion.button>
              )}

              {status === "sending" && (
                <motion.button
                  key="sending"
                  initial={{
                    scale: 1,
                    x: 0,
                    y: 0,
                    opacity: 1,
                    borderRadius: "50px",
                  }}
                  animate={{
                    x: 200,
                    y: -200,
                    opacity: 0,
                    scale: 0,
                    borderRadius: "50%",
                  }}
                  transition={{ duration: 0.6, ease: "backIn" }}
                  style={{
                    position: "absolute",
                    right: 0,
                    background: "var(--accent)",
                    color: "#000",
                    border: "none",
                    padding: "1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "50px",
                    height: "50px",
                    cursor: "default",
                  }}
                >
                  <Send size={24} />
                </motion.button>
              )}

              {status === "sent" && (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.5, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                  className="success-msg"
                  style={{
                    color: "var(--accent)",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    justifyContent: "flex-end",
                    height: "100%",
                  }}
                >
                  Message Sent! <Check size={18} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default Contact;

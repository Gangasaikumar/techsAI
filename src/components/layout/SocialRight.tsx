import { useState } from "react";
import {
  Github,
  Instagram,
  Globe,
  Linkedin,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "../../styles/SocialRight.css";

const XIcon = ({
  size = 20,
  className,
}: {
  size?: number | string;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const SocialRight = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Define links order
  const socialLinks = [
    { icon: <Github size={20} />, href: "https://github.com/Gangasaikumar" },
    {
      icon: <Linkedin size={20} />,
      href: "https://www.linkedin.com/in/gangasai-kumar/",
    },
    { icon: <Globe size={20} />, href: "https://techsai.in/gangsaikumar" },
    { icon: <XIcon size={20} />, href: "https://x.com/Gangasai_kumar" },
    {
      icon: <Instagram size={20} />,
      href: "hhttps://www.instagram.com/gangasai_kumar/",
    },
  ];

  // Logic: Always show first 2. If extended, show the rest.
  const visibleLinks = isExpanded ? socialLinks : socialLinks.slice(0, 2);

  return (
    <div className="social-right-container">
      <motion.div layout className="social-stack">
        {/* Toggle Arrow Button (Top of stack) */}
        <motion.button
          layout
          onClick={() => setIsExpanded(!isExpanded)}
          className="social-btn arrow-btn"
        >
          {isExpanded ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
        </motion.button>

        {/* Social Links List (Below Arrow) */}
        <AnimatePresence mode="popLayout">
          {visibleLinks.map((link, index) => (
            <motion.a
              key={index}
              layout
              href={link.href}
              target="_blank"
              // initial={{ opacity: 0, scale: 0.5, y: -10 }}
              // animate={{ opacity: 1, scale: 1, y: 0 }}
              // exit={{ opacity: 0, scale: 0.5, y: -10 }}
              // transition={{ duration: 0.3 }}
              className="social-btn"
            >
              {link.icon}
            </motion.a>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default SocialRight;

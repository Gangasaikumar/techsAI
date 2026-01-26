import { BookOpen, MessageSquare, Home, Code } from "lucide-react";
import { motion } from "framer-motion";
import "../../styles/FloatingNav.css";

interface FloatingNavProps {
  activeSection?: string;
  scrollToSection?: (id: string) => void;
}

const FloatingNav = ({
  activeSection = "home",
  scrollToSection,
}: FloatingNavProps) => {
  const navItems = [
    { icon: <Home size={22} />, id: "home" },
    // { icon: <User size={22} />, id: "about" },
    { icon: <BookOpen size={22} />, id: "experience" }, // Resume
    { icon: <Code size={22} />, id: "skills" }, // Skills
    // { icon: <Briefcase size={22} />, id: "portfolio" }, // Portfolio
    { icon: <MessageSquare size={22} />, id: "contact" },
  ];

  return (
    <div className="mobile-floating-nav">
      <div className="floating-nav-container">
        {navItems.map((item) => {
          // Complex logic to keep nav active for hidden/grouped sections
          let isActive = activeSection === item.id;

          if (item.id === "home" && activeSection === "about") {
            isActive = true;
          }

          if (
            item.id === "experience" &&
            (activeSection === "education" || activeSection === "portfolio")
          ) {
            isActive = true;
          }

          return (
            <button
              key={item.id}
              onClick={() => scrollToSection && scrollToSection(item.id)}
              className={`nav-item-btn ${isActive ? "active" : ""}`}
            >
              {/* Active Bubble (Behind Content) */}
              {isActive && (
                <motion.div
                  layoutId="activeNavBubble"
                  className="active-nav-bubble"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              {/* Icon (On Top) */}
              <div className="nav-icon-wrapper">{item.icon}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FloatingNav;

import { Download } from "lucide-react";
import { motion } from "framer-motion";
import cvFile from "../../assets/Gangasai kumar.pdf";
import { navLinks } from "../../data/portfolioData";
import "../../styles/Header.css";

interface HeaderProps {
  activeSection?: string;
  scrollToSection?: (id: string) => void;
}

const Header = ({ activeSection = "home", scrollToSection }: HeaderProps) => {
  return (
    <header className="main-header">
      {/* LEFT GROUP: Logo + Name */}
      <div className="header-left">
        {/* Logo G */}
        <span className="logo-icon">G</span>

        {/* Name in Script Font */}
        <span className="brand-name">Gangasai kumar</span>
      </div>

      {/* RIGHT GROUP Container */}
      <div className="header-right">
        {/* Navigation */}
        <nav className="desktop-menu">
          {navLinks.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection && scrollToSection(item.id)}
                className={`nav-link ${isActive ? "active" : ""}`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="active-tab-indicator"
                    transition={{
                      type: "spring",
                      bounce: 0.2,
                      duration: 0.6,
                    }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Download CV Button (Right Side) */}
        <a
          href={cvFile}
          target="_blank"
          rel="noopener noreferrer"
          className="download-btn"
        >
          <span className="download-text">Download CV</span>{" "}
          <Download size={14} />
        </a>
      </div>
    </header>
  );
};

export default Header;

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import "../../styles/Hero.css";
import { roles } from "../../data/portfolioData";
import { useTypewriter } from "../../hooks/useTypewriter";

const Hero = ({
  scrollToSection,
}: {
  scrollToSection: (id: string) => void;
}) => {
  const text = useTypewriter(roles);

  return (
    <section id="home">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Name Badge - Overlapping Component */}
        <div className="name-badge">
          <h1 className="hero-title">Gangasai kumar</h1>
        </div>

        {/* Role Tag */}
        <p className="hero-role">
          {text}
          <span className="cursor">|</span>
        </p>

        {/* Bio */}
        <p className="hero-bio">
          Passionate Web Developer specializing in creating interactive and
          responsive web experiences. Expert in modern JavaScript frameworks and
          scalable backend solutions with Node.js.
        </p>

        {/* Buttons */}
        <div className="hero-actions">
          {/* Contact Me Button */}
          <button
            onClick={() => scrollToSection("contact")}
            className="hero-btn"
          >
            Contact Me <ArrowRight size={16} />
          </button>

          {/* Scroll Down Arrow */}
          <button
            onClick={() => scrollToSection("about")}
            className="hero-icon-btn"
          >
            <ChevronDown size={20} />
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

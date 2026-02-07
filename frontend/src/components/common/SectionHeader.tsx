import { motion } from "framer-motion";
import "../../styles/SectionHeader.css";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  className?: string;
  align?: "left" | "center" | "right";
  children?: React.ReactNode; // For extra elements like buttons in Carousel
}

const SectionHeader = ({
  title,
  subtitle,
  className = "",
  align = "left",
  children,
}: SectionHeaderProps) => {
  return (
    <div className={`section-header ${className}`} style={{ textAlign: align }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {title}
          </motion.h2>
          <motion.span
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {subtitle}
          </motion.span>
        </div>

        {/* Render children (like navigation buttons) if present */}
        {children && <div className="section-header-actions">{children}</div>}
      </div>
    </div>
  );
};

export default SectionHeader;

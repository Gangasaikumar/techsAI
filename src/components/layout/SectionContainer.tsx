import { motion } from "framer-motion";
import "../../styles/SectionContainer.css";

const SectionContainer = ({
  id,
  children,
}: {
  id?: string;
  children: React.ReactNode;
}) => (
  <section id={id} className="section-container">
    <div className="section-content-wrapper">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="section-inner-content">{children}</div>
      </motion.div>
    </div>
  </section>
);

export default SectionContainer;

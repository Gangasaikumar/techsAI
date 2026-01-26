import { motion } from "framer-motion";
import { projects } from "../../data/projects";
import "../../styles/Portfolio.css";
import SectionHeader from "../common/SectionHeader";

const Portfolio = () => {
  return (
    <section className="portfolio-section">
      <SectionHeader title="My Portfolio" subtitle="My recent works." />

      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="project-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="project-image-wrapper">
              <img
                src={project.img}
                alt={project.title}
                className="project-image"
              />
              <div className="project-overlay">
                <button className="view-project-btn">View Details</button>
              </div>
            </div>
            <div className="project-info">
              <span className="project-category">{project.category}</span>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;

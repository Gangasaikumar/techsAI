import { useState } from "react";
import SectionContainer from "../layout/SectionContainer";
import { motion, AnimatePresence } from "framer-motion";
import "../../styles/Skills.css";
import { codingSkillsData, skillCategories } from "../../data/portfolioData";
import ScrollableTabs from "../common/ScrollableTabs";
import { FileCode, FileJson, Hash } from "lucide-react";
import SectionHeader from "../common/SectionHeader";

// Helper to get file extension/icon
const getFileMeta = (skillName: string) => {
  const lower = skillName.toLowerCase();
  if (lower.includes("react"))
    return { ext: "tsx", icon: <FileCode size={16} /> };
  if (
    lower.includes("javascript") ||
    lower.includes("jquery") ||
    lower.includes("node")
  )
    return { ext: "js", icon: <FileJson size={16} /> };
  if (lower.includes("python")) return { ext: "py", icon: <Hash size={16} /> };
  if (
    lower.includes("css") ||
    lower.includes("html") ||
    lower.includes("bootstrap")
  )
    return { ext: "css", icon: <Hash size={16} /> };
  // Default
  return { ext: "ts", icon: <FileCode size={16} /> };
};

const Skills = () => {
  const [activeTab, setActiveTab] = useState("All");

  const filteredSkills = codingSkillsData.filter((skill) =>
    activeTab === "All" ? true : skill.category === activeTab,
  );

  return (
    <SectionContainer id="coding-skills">
      <SectionHeader title="Coding Skills" subtitle="DEVELOPING ON" />

      {/* Tabs */}
      <ScrollableTabs
        tabs={skillCategories}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Grid */}
      <div className="skills-grid">
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill) => {
            const { ext, icon } = getFileMeta(skill.title);
            // Format variable name (camelCase)
            const varName = skill.title.replace(/\s+/g, "");

            return (
              <motion.div
                key={skill.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="skill-item"
              >
                {/* IDE Header */}
                <div className="ide-header">
                  <span className="file-icon">{icon}</span>
                  <span className="file-name">
                    {varName}.{ext}
                  </span>
                </div>

                {/* IDE Body (Code Snippet) */}
                <div className="ide-body">
                  <div>
                    <span className="token-keyword">const</span>{" "}
                    <span className="token-def">{varName}</span>{" "}
                    <span className="token-operator">=</span>{" "}
                    <span className="token-punctuation">{"{"}</span>
                  </div>

                  <div style={{ paddingLeft: "1.5rem" }}>
                    <span className="token-property">"level"</span>
                    <span className="token-operator">:</span>{" "}
                    <span className="token-string">"{skill.percent}%"</span>
                    <span className="token-punctuation">,</span>
                  </div>

                  <div style={{ paddingLeft: "1.5rem" }}>
                    <span className="token-property">"mastery"</span>
                    <span className="token-operator">:</span>{" "}
                    <span className="token-string">"High"</span>
                    <span className="token-punctuation">,</span>
                  </div>

                  {/* Comment for Description */}
                  <div style={{ paddingLeft: "1.5rem", marginTop: "0.5rem" }}>
                    <span className="token-comment">// {skill.desc}</span>
                  </div>

                  <div>
                    <span className="token-punctuation">{"}"}</span>
                    <span className="token-operator">;</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </SectionContainer>
  );
};

export default Skills;

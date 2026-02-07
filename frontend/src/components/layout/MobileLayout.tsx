import Hero from "../sections/Hero";
import About from "../sections/About";
import Experience from "../sections/Experience";
import Education from "../sections/Education";
import Skills from "../sections/Skills";
import DesignSkills from "../sections/DesignSkills";
// import Portfolio from "../sections/Portfolio";
import Contact from "../sections/Contact";
import profileImg from "../../assets/profile.jpg";

interface MobileLayoutProps {
  activeSection: string;
  scrollToSection: (id: string) => void;
}

const MobileLayout = ({ scrollToSection }: MobileLayoutProps) => {
  return (
    <div className="mobile-layout">
      {/* Full Screen Hero with Background Image */}
      <div
        id="home"
        className="mobile-hero"
        style={{ backgroundImage: `url(${profileImg})` }}
      >
        <div className="mobile-hero-overlay" />
        <div className="mobile-hero-content">
          <Hero scrollToSection={scrollToSection} />
        </div>
      </div>

      <div className="mobile-sections-container">
        <div id="about">
          <About />
        </div>
        <div id="experience">
          <Experience />
        </div>
        <div id="education">
          <Education />
        </div>
        <div id="skills">
          <Skills />
          <DesignSkills />
        </div>
        {/* <div id="portfolio">
          <Portfolio />
        </div> */}
        <div id="contact">
          <Contact />
        </div>

        {/* Footer hidden as per user request */}
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default MobileLayout;

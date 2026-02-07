import LeftPanel from "../layout/LeftPanel";
import SocialRight from "../layout/SocialRight";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Experience from "../sections/Experience";
import Education from "../sections/Education";
import Skills from "../sections/Skills";
import DesignSkills from "../sections/DesignSkills";
// import Portfolio from "../sections/Portfolio";
import Contact from "../sections/Contact";

interface DesktopLayoutProps {
  scrollToSection: (id: string) => void;
}

const DesktopLayout = ({ scrollToSection }: DesktopLayoutProps) => {
  return (
    <div className="desktop-layout">
      <LeftPanel />
      <div className="desktop-content-spacer"></div>

      <main className="desktop-main-content">
        <div id="home">
          <Hero scrollToSection={scrollToSection} />
        </div>
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
      </main>

      <SocialRight />
    </div>
  );
};

export default DesktopLayout;

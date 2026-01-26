import Header from "../components/layout/Header";
import FloatingNav from "../components/layout/FloatingNav";
import MobileLayout from "../components/layout/MobileLayout";
import DesktopLayout from "../components/layout/DesktopLayout";

import { useIsMobile } from "../hooks/useIsMobile";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { useSmoothScroll } from "../hooks/useSmoothScroll";
import { navLinks } from "../data/portfolioData";
import "../styles/App.css";

const PortfolioPage = () => {
  const isMobile = useIsMobile(900);
  const sectionIds = [
    ...navLinks.map((link) => link.id),
    "skills",
    "education",
  ];
  const activeSection = useScrollSpy(sectionIds);
  const scrollToSection = useSmoothScroll();

  return (
    <div className="app-container">
      <Header activeSection={activeSection} scrollToSection={scrollToSection} />

      <FloatingNav
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />

      {isMobile ? (
        <MobileLayout
          activeSection={activeSection} // Pass activeSection if MobileLayout needs it (it implies it might not based on previous diffs but I will keep it safe)
          scrollToSection={scrollToSection}
        />
      ) : (
        <DesktopLayout scrollToSection={scrollToSection} />
      )}
    </div>
  );
};

export default PortfolioPage;

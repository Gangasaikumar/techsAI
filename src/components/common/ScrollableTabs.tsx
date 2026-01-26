import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface ScrollableTabsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

const ScrollableTabs = ({
  tabs,
  activeTab,
  onTabChange,
  className = "",
}: ScrollableTabsProps) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const tabsRef = useRef<HTMLDivElement>(null);

  const checkScroll = () => {
    if (tabsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5); // 5px buffer
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (offset: number) => {
    if (tabsRef.current) {
      tabsRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <div className={`skills-tabs-container ${className}`}>
      {canScrollLeft && (
        <button
          className="scroll-btn left"
          onClick={() => scroll(-200)}
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} />
        </button>
      )}

      <div className="skills-tabs" ref={tabsRef} onScroll={checkScroll}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`tab-btn ${isActive ? "active" : ""}`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabBubble"
                  className="active-tab-bubble"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="tab-content">{tab}</span>
            </button>
          );
        })}
      </div>

      {canScrollRight && (
        <button
          className="scroll-btn right"
          onClick={() => scroll(200)}
          aria-label="Scroll right"
        >
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
};

export default ScrollableTabs;

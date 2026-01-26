import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "../../styles/Carousel.css";
import SectionHeader from "./SectionHeader";

interface CarouselProps<T> {
  title: string;
  subTitle: string;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

const Carousel = <T extends { id: number | string }>({
  title,
  subTitle,
  items,
  renderItem,
}: CarouselProps<T>) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  // Logic: Show 2 items per view if possible
  const visibleItems = [
    items[currentIndex % items.length],
    items[(currentIndex + 1) % items.length],
  ];

  const isCarousel = items.length > 2;

  // Use the full list if not a carousel, otherwise use windowed items
  const displayItems = isCarousel ? visibleItems : items;

  return (
    <>
      {/* Header Row */}
      <SectionHeader title={title} subtitle={subTitle}>
        {isCarousel && (
          <div className="carousel-nav">
            <button onClick={handlePrev} className="nav-btn">
              <ChevronLeft size={20} />
            </button>

            {/* Line between buttons */}
            <div className="carousel-line"></div>

            <button onClick={handleNext} className="nav-btn">
              <ChevronRight size={20} />
            </button>

            {/* Line extending to right edge */}
            <div className="carousel-line-extend"></div>
          </div>
        )}
      </SectionHeader>

      {/* Grid Content */}
      <div className="carousel-grid">
        <AnimatePresence mode="wait">
          {displayItems.map((item, idx) => (
            <motion.div
              key={`${item.id}-${isCarousel ? currentIndex : "static"}`}
              initial={
                isCarousel ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }
              }
              animate={{ opacity: 1, x: 0 }}
              exit={isCarousel ? { opacity: 0, x: -20 } : {}}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              style={{ height: "100%" }} // Ensure full height placement
            >
              {renderItem(item)}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Carousel;

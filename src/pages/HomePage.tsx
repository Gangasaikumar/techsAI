import { useState, useEffect } from "react"; // React hooks
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/App.css";
import "../styles/HomePage.css";

const FlipCard = ({ digit }: { digit: string }) => {
  const [prevDigit, setPrevDigit] = useState(digit);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (digit !== prevDigit) {
      // Fix synchronous state update warning
      const timeout = setTimeout(() => setIsFlipping(true), 0);
      return () => clearTimeout(timeout);
    }
  }, [digit, prevDigit]);

  const handleAnimationComplete = () => {
    setPrevDigit(digit);
    setIsFlipping(false);
  };

  return (
    <div
      className="digit-box"
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
    >
      {/* 1. Static Background Layer */}
      {/* Top Half: Shows NEXT Digit */}
      <div className="half-digit top" style={{ backfaceVisibility: "hidden" }}>
        <span className="half-digit-content">{digit}</span>
      </div>
      {/* Bottom Half: Shows PREV Digit */}
      <div
        className="half-digit bottom"
        style={{ backfaceVisibility: "hidden" }}
      >
        <span className="half-digit-content">{prevDigit}</span>
      </div>

      {/* 2. Animation Layer */}
      {isFlipping && (
        <>
          {/* Top Flipper: Shows PREV Digit (Top). Folds Down. */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={{ rotateX: -90 }}
            transition={{ duration: 0.3, ease: "easeIn" }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "50%",
              zIndex: 20,
              transformOrigin: "bottom",
              backfaceVisibility: "hidden",
              backgroundColor: "#f7f7f7",
              borderTopLeftRadius: "6px",
              borderTopRightRadius: "6px",
              borderBottom: "1px solid rgba(0,0,0,0.1)",
              overflow: "hidden",
              willChange: "transform",
            }}
          >
            <span className="half-digit-content" style={{ top: 0 }}>
              {prevDigit}
            </span>
          </motion.div>

          {/* Bottom Flipper: Shows NEXT Digit (Bottom). Unfolds Up. */}
          <motion.div
            initial={{ rotateX: 90 }}
            animate={{ rotateX: 0 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.3 }}
            onAnimationComplete={handleAnimationComplete}
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              width: "100%",
              height: "50%",
              zIndex: 20,
              transformOrigin: "top",
              backfaceVisibility: "hidden",
              backgroundColor: "#fff",
              borderBottomLeftRadius: "6px",
              borderBottomRightRadius: "6px",
              overflow: "hidden",
              willChange: "transform",
            }}
          >
            <span className="half-digit-content" style={{ bottom: 0 }}>
              {digit}
            </span>
          </motion.div>
        </>
      )}
    </div>
  );
};

const AnimatedUnit = ({ value, label }: { value: number; label: string }) => {
  const digits = value.toString().padStart(2, "0").split("");

  return (
    <div className="countdown-unit">
      <span className="unit-label">{label}</span>
      <div className="digit-container">
        {digits.map((d, i) => (
          <FlipCard key={i} digit={d} />
        ))}
      </div>
    </div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();

  // Target Date: June 4, 2026
  const targetDate = new Date("2026-06-04T00:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const target = new Date("2026-06-04T00:00:00");
      const difference = target.getTime() - now.getTime();

      if (difference > 0) {
        // Calculate months accurately
        let months =
          (target.getFullYear() - now.getFullYear()) * 12 +
          (target.getMonth() - now.getMonth());

        // Adjust if current day is beyond target day
        if (target.getDate() < now.getDate()) {
          months--;
        }

        // Calculate remaining time after months
        const tempDate = new Date(now);
        tempDate.setMonth(now.getMonth() + months);
        const remainingDiff = target.getTime() - tempDate.getTime();

        setTimeLeft({
          months: Math.max(0, months),
          days: Math.floor(remainingDiff / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (remainingDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((remainingDiff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((remainingDiff % (1000 * 60)) / 1000),
        });
      }
    };

    updateTime(); // Initial call
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Coming Soon</h1>

        <p className="home-subtitle">
          We are crafting{" "}
          <span className="scribble-highlight">
            Tech'sAI
            <svg
              className="scribble-underline"
              viewBox="0 0 200 15"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M5 8 C 40 10, 140 3, 195 6"
                fill="none"
                stroke="#FFC107"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          . The full product vision is pending implementation.
        </p>

        <div className="countdown-wrapper">
          {(() => {
            const units = [
              { value: timeLeft.months, label: "Months" },
              { value: timeLeft.days, label: "Days" },
              { value: timeLeft.hours, label: "Hours" },
              { value: timeLeft.minutes, label: "Minutes" },
              { value: timeLeft.seconds, label: "Seconds" },
            ];

            // Find the first non-zero unit index
            let firstNonZeroIndex = units.findIndex((u) => u.value > 0);

            // If all are zero, show seconds at least
            if (firstNonZeroIndex === -1) firstNonZeroIndex = units.length - 1;

            // Slice units from first non-zero to the end
            const visibleUnits = units.slice(firstNonZeroIndex);

            return visibleUnits.map((unit, index) => (
              <div
                key={unit.label}
                style={{ display: "flex", alignItems: "center" }}
              >
                <AnimatedUnit value={unit.value} label={unit.label} />
                {index < visibleUnits.length - 1 && (
                  <div className="time-separator">-</div>
                )}
              </div>
            ));
          })()}
        </div>

        <p className="launch-date">Launching on June 4, 2026</p>

        <button onClick={() => navigate("/gangsaikumar")} className="enter-btn">
          Visit Profile
        </button>
      </div>
    </div>
  );
};

export default HomePage;

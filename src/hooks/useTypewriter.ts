import { useState, useEffect } from "react";

export const useTypewriter = (
  words: string[],
  typingSpeed = 150,
  deletingSpeed = 30,
  pauseTime = 1500,
) => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [speed, setSpeed] = useState(typingSpeed);

  useEffect(() => {
    const i = loopNum % words.length;
    const fullText = words[i];

    const handleType = () => {
      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1),
      );

      setSpeed(isDeleting ? deletingSpeed : typingSpeed);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, speed);

    return () => clearTimeout(timer);
  }, [
    text,
    isDeleting,
    loopNum,
    speed,
    words,
    typingSpeed,
    deletingSpeed,
    pauseTime,
  ]);

  return text;
};

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { addEmailToWishlist } from "../api/wishlist";

export const useWishlist = (targetDateString: string) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      await addEmailToWishlist(email);
      setSubmitted(true);
      toast.success("Welcome to the Inner Circle! 🎉");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to join wishlist. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const target = new Date(targetDateString);
      const difference = target.getTime() - now.getTime();

      if (difference > 0) {
        let months =
          (target.getFullYear() - now.getFullYear()) * 12 +
          (target.getMonth() - now.getMonth());

        if (target.getDate() < now.getDate()) {
          months--;
        }

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

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDateString]);

  return {
    email,
    setEmail,
    submitted,
    error,
    setError,
    isLoading,
    timeLeft,
    handleSubscribe,
  };
};

// components/AnimatedHamburger.tsx
import React from "react";
import "@/css/AnimatedHamburger.css";

interface AnimatedHamburgerProps {
  isOpen: boolean;
  toggle: () => void;
}

const AnimatedHamburger: React.FC<AnimatedHamburgerProps> = ({ isOpen, toggle }) => {
  return (
    <div className={`animated-icon3 ${isOpen ? "open" : ""}`} onClick={toggle}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default AnimatedHamburger;

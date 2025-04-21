import React from "react";
import GradientText from "./GradientText";

const GradientLogo = ({text, size}) => {
  return (
    <GradientText
    colors={["#ff6b6b", "#ffa94d", "#40ffaa", "#4079ff", "#9b5de5"]}
      animationSpeed={6}
      showBorder={false}
      className={`custom-class ${size}`}
    >
      {text}
    </GradientText>
  );
};

export default GradientLogo;

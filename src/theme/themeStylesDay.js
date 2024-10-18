// ThemeStyles.js
import React from "react";

const ThemeStylesDay = ({ isDarkMode }) => {
  return {
    containerStyle: {
      backgroundColor: isDarkMode ? "#141419" : "#f5f5f5",
    }
  };
};

export default ThemeStylesDay;

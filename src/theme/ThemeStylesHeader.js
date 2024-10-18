// ThemeStyles.js
import React from "react";

const ThemeStylesHeader = ({ isDarkMode }) => {
  return {
    titleStyle: {
      color: isDarkMode ? '#DADADA' : '#0E0E11'
    },
    subtitleStyle: {
      color: isDarkMode ? "#575767" : "#575767",
    },
    lineStyle: {
      backgroundColor: isDarkMode ? '#575767' : '#D0D0D0'
    },
  };
};

export default ThemeStylesHeader;

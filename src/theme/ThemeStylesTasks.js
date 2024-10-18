// ThemeStyles.js
import React from "react";

const ThemeStylesTasks = ({ isDarkMode }) => {
  return {
    sectionStyle: {
      color: isDarkMode ? "#FFFFFF" : "#575767",
    },
    textStyle: {
        color: isDarkMode ? '#DADADA' : '#575767',
    },
    subtitleStyle: {
      color: isDarkMode ? '#575767' : '#575767',
    },
    completedTaskStyle: {
      color: isDarkMode ? "#575767" : "#B9B9BE",
    },
  };
};

export default ThemeStylesTasks;

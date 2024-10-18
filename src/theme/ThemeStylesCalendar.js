// ThemeStyles.js
import React from 'react';

const ThemeStylesCalendar = ({ isDarkMode }) => {
  return {
    containerStyle: {
      backgroundColor: isDarkMode ? '#141419' : '#f5f5f5',
    },
    textStyle: {
      color: isDarkMode ? '#ffffff' : '#000000',
    },
    todayNumberText: {
      color: 'cyan',
    },
    weekendText: {
      color: 'orange',
    },
  };
};

export default ThemeStylesCalendar;
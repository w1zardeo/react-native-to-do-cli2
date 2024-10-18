import Svg, { Path } from "react-native-svg";

export const Checkmark = ({ style, isDarkMode }) => {
  const strokeColor = isDarkMode ? '#DADADA' : '#575767';
  return (
    <Svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M1 6L3.91667 9L9 1"
        stroke={strokeColor}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

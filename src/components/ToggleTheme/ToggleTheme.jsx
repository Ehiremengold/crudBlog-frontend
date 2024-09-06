import { useThemeContext } from "../../Base.jsx";
import "./ToggleTheme.css"

const ToggleTheme = () => {
  const { dispatch, state } = useThemeContext();

  return (
    <button className="theme-btn"
      onClick={() => {
        dispatch({
          type: state.theme === "dark" ? "lightMode" : "darkMode",
        });
      }}
    >
      {/* {state.theme === "dark" ? "Light Mode" : "Dark Mode"} */}
      Switch theme
    </button>
  );
};
export default ToggleTheme;

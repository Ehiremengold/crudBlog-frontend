import { createContext, useContext, useReducer } from "react";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";

const initialState = {
  theme: "light",
};

const reducer = (state, action) => {
  if (action.type === "darkMode") {
    return { ...state, theme: "dark" };
  } else if (action.type === "lightMode") {
    return { ...state, theme: "light" };
  }
  return state;
};

const BaseContext = createContext();

export const useThemeContext = () => useContext(BaseContext);

const Base = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BaseContext.Provider value={{ dispatch, state }}>
      <Header />
      <main className={state.theme === "dark" ? "dark-theme" : ""}>
        {children}
      </main>
      <Footer />
    </BaseContext.Provider>
  );
};
export default Base;

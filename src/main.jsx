import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import GlobalStyles from "./styles/GlobalStyles.js";
import { CustomThemeProvider } from "./context/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CustomThemeProvider>
      <CartProvider>
        <GlobalStyles />
        <App />
      </CartProvider>
    </CustomThemeProvider>
  </StrictMode>
);

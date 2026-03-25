import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

 body {
  font-family: "Segoe UI", sans-serif;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  transition: background 0.4s ease, color 0.4s ease;
}

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
    transition: all 0.3s ease;
  }

  img {
    max-width: 100%;
    display: block;
  }
`;

export default GlobalStyles;
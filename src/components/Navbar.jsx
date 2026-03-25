import { Link } from "react-router-dom";
import styled from "styled-components";
import { device } from "../styles/breakpoints";
import { useTheme } from "../context/ThemeContext";

const Nav = styled.nav`
  width: 100%;
  padding: 20px 40px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
  @media ${device.mobile} {
    padding: 15px 20px;
  }
`;

const Logo = styled.h1`
  font-size: 24px;
  color: #e66098;
  font-weight: 600;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 25px;
  @media ${device.tablet} {
    display: none;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  font-size: 16px;
  transition: 0.3s;

  &:hover {
    color: #f8c8dc;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const CartButton = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  font-size: 16px;
  position: relative;

  &:hover {
    color: #f8c8dc;
  }
`;

const ThemeToggle = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: ${({ theme }) => theme.card};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    background: ${({ theme }) => theme.primary};
    box-shadow: 0 0 10px ${({ theme }) => theme.primary};
  }
`;

function Navbar() {
  const { toggleTheme, theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <Nav>
      <Logo>Bloomify</Logo>

      <NavLinks>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/flowers">Flowers</StyledLink>
        <StyledLink to="/about">About</StyledLink>
        <StyledLink to="/contact">Contact</StyledLink>
      </NavLinks>

      <RightSection>
        <CartButton to="/cart">Cart 🛒</CartButton>
        <ThemeToggle onClick={toggleTheme}>{isDark ? "☀️" : "🌙"}</ThemeToggle>
      </RightSection>
    </Nav>
  );
}

export default Navbar;

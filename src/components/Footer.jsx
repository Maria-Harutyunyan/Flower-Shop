import styled from "styled-components";
import { Link } from "react-router-dom";
import { device } from "../styles/breakpoints";

const Container = styled.footer`
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  padding: 40px;
  margin-top: 60px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;

  @media ${device.tablet} {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const Section = styled.div``;

const Title = styled.h3`
  margin-bottom: 15px;
`;

const StyledLink = styled(Link)`
  display: block;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  transition: 0.3s;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const Bottom = styled.div`
  margin-top: 30px;
  text-align: center;
  font-size: 14px;
  opacity: 0.7;
`;

function Footer() {
  return (
    <Container>
      <Grid>
        {/* Brand */}
        <Section>
          <Title>Bloomify 🌸</Title>
          <p>Elegant flowers crafted for every special moment.</p>
        </Section>

        {/* Navigation */}
        <Section>
          <Title>Quick Links</Title>
          <StyledLink to="/">Home</StyledLink>
          <StyledLink to="/flowers">Flowers</StyledLink>
          <StyledLink to="/about">About</StyledLink>
          <StyledLink to="/contact">Contact</StyledLink>
        </Section>

        {/* Social */}
        <Section>
          <Title>Follow Us</Title>
          <p>Instagram</p>
          <p>Facebook</p>
          <p>Twitter</p>
        </Section>
      </Grid>

      <Bottom>© 2026 Bloomify. All rights reserved.</Bottom>
    </Container>
  );
}

export default Footer;
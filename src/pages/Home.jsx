import styled from "styled-components";
import { Link } from "react-router-dom";
import products from "../assets/products";
import ProductCard from "../components/ProductCard";
import { device } from "../styles/breakpoints";

const Container = styled.div`
  background: #fff8f5;
`;

/* HERO SECTION */

const Hero = styled.section`
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const HeroContent = styled.div`
  max-width: 600px;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${({ theme }) => theme.text};
  margin-bottom: 20px;

  @media ${device.mobile} {
    font-size: 32px;
  }
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 30px;
`;

const Button = styled(Link)`
  padding: 12px 25px;
  background: #f8c8dc;
  color: #333;
  border-radius: 25px;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    background: #f6b8d6;
    box-shadow: 0 8px 20px rgba(248, 200, 220, 0.4);
  }
`;

/* FEATURED SECTION */

const Section = styled.section`
  padding: 60px 40px;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 40px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;

  @media ${device.laptop} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media ${device.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${device.mobile} {
    grid-template-columns: 1fr;
  }
`;

function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <Container>
      {/* HERO */}
      <Hero>
        <HeroContent>
          <Title>
            Elegant Flowers for Every <br />
            <br />
            Moment 🌸
          </Title>
          <Subtitle>
            Discover handcrafted bouquets designed to make every occasion
            unforgettable.
          </Subtitle>

          <Button to="/flowers">Shop Now</Button>
        </HeroContent>
      </Hero>

      {/* FEATURED */}
      <Section>
        <SectionTitle>Featured Flowers</SectionTitle>

        <Grid>
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>
      </Section>
    </Container>
  );
}

export default Home;

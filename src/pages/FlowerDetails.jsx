import { useParams } from "react-router-dom";
import styled from "styled-components";
import products from "../assets/products";
import { useCart } from "../context/CartContext";
import { device } from "../styles/breakpoints";

// 🌸 Container adapts to theme
const Container = styled.div`
  padding: 40px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;

  @media ${device.mobile} {
    padding: 20px;
  }
`;

// 🌸 Card with theme-aware background
const Card = styled.div`
  display: flex;
  gap: 40px;
  background: ${({ theme }) => theme.card};
  padding: 30px;
  border-radius: 20px;
  max-width: 900px;
  width: 100%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  @media ${device.tablet} {
    flex-direction: column;
    align-items: center;
  }
`;

// 🌸 Product Image
const Image = styled.img`
  width: 350px;
  height: 350px;
  object-fit: cover;
  border-radius: 15px;
  @media ${device.mobile} {
    width: 100%;
    height: auto;
  }
`;

// 🌸 Info Section
const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;

// 🌸 Title 
const Title = styled.h2`
  font-size: 28px;
  color: ${({ theme }) => theme.primaryText || theme.primary};
  margin-bottom: 10px;
  transition: color 0.3s ease;
`;

// 🌸 Price
const Price = styled.p`
  font-size: 22px;
  color: ${({ theme }) => theme.accent};
  margin: 10px 0;
  transition: color 0.3s ease;
`;

// 🌸 Description 
const Description = styled.p`
  color: ${({ theme }) => theme.secondaryText || "#666"};
  margin-bottom: 20px;
  line-height: 1.6;
  transition: color 0.3s ease;
`;

// 🌸 Add to Cart Button
const Button = styled.button`
  padding: 12px 25px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.buttonText || "#fff"};
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.2);
    opacity: 0.9;
  }
`;

function FlowerDetails() {
  const { id } = useParams();

  const product = products.find((p) => p.id === id);
  
  const { addToCart } = useCart();

  if (!product) {
    return <h2 style={{ padding: "40px" }}>Product not found</h2>;
  }

  return (
    <Container>
      <Card>
        <Image src={product.image} alt={product.name} />

        <Info>
          <Title>{product.name}</Title>
          <Price>${product.price}</Price>
          <Description>{product.description}</Description>

          <Button onClick={() => addToCart(product)}>Add to Cart</Button>
        </Info>
      </Card>
    </Container>
  );
}

export default FlowerDetails;
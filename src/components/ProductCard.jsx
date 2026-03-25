import { Link } from "react-router-dom";
import styled from "styled-components";

const Card = styled.div`
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.15);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const Content = styled.div`
  padding: 15px;
`;

const Title = styled.h3`
  font-size: 18px;
    color: ${({ theme }) => theme.text};
`;

const Price = styled.p`
  color: #f8c8dc;
  font-weight: bold;
  margin-top: 5px;
`;

function ProductCard({ product }) {
  return (
    <Card>
      <Link
        to={`/flowers/${product.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Image src={product.image} alt={product.name} />
        <Content>
          <Title>{product.name}</Title>
          <Price>${product.price}</Price>
        </Content>
      </Link>
    </Card>
  );
}

export default ProductCard;

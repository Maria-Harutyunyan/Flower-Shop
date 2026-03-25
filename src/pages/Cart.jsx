import styled from "styled-components";
import { useCart } from "../context/CartContext";
import { device } from "../styles/breakpoints";

const Container = styled.div`
  padding: 40px;
  background: ${({ theme }) => theme.background};
  min-height: 100vh;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
   color: ${({ theme }) => theme.text};
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  padding: 15px;
  border-radius: 15px;
  margin-bottom: 15px;
  @media ${device.mobile} {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
   color: ${({ theme }) => theme.text};
`;

const Controls = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Button = styled.button`
  padding: 5px 10px;
  border: none;
  background: #f8c8dc;
  cursor: pointer;
  border-radius: 5px;
`;

const RemoveButton = styled.button`
  background: red;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const Total = styled.h2`
  text-align: right;
  margin-top: 20px;
   color: ${({ theme }) => theme.text};
`;

function Cart() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, getTotal } =
    useCart();

  return (
    <Container>
      <Title>Your Cart 🛒</Title>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          {cart.map((item) => (
            <Item key={item.id}>
              <Info>
                <strong>{item.name}</strong>
                <span>${item.price}</span>
              </Info>

              <Controls>
                <Button onClick={() => decreaseQuantity(item.id)}>-</Button>
                <span>{item.quantity}</span>
                <Button onClick={() => increaseQuantity(item.id)}>+</Button>
              </Controls>

              <RemoveButton onClick={() => removeFromCart(item.id)}>
                Remove
              </RemoveButton>
            </Item>
          ))}

          <Total>Total: ${getTotal()}</Total>
        </>
      )}
    </Container>
  );
}

export default Cart;

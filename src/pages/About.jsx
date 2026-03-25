import styled from "styled-components";

const Container = styled.div`
  padding: 60px 40px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const Content = styled.div`
  max-width: 900px;
  margin: auto;
  text-align: center;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  color: ${({ theme }) => theme.text};
`;

const Text = styled.p`
  margin-bottom: 20px;
  line-height: 1.6;
  color: ${({ theme }) => theme.text};
`;

const Highlight = styled.span`
  color: ${({ theme }) => theme.primary};
  font-weight: bold;
`;

function About() {
  return (
    <Container>
      <Content>
        <Title>About Bloomify 🌸</Title>
        <br />
        <Text>
          At <Highlight>Bloomify</Highlight>, we believe flowers are more than
          just gifts — they are emotions, memories, and moments.
        </Text>

        <Text>
          Our mission is to create
          <Highlight>elegant floral experiences</Highlight> that bring joy,
          love, and beauty into everyday life.
        </Text>

        <Text>
          Each bouquet is carefully crafted with attention to detail, combining
          premium flowers with modern design.
        </Text>

        <Text>
          Whether it’s a celebration, a gift, or a simple moment — we make it
          unforgettable.
        </Text>
      </Content>
    </Container>
  );
}

export default About;

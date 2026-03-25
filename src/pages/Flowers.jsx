import { useState, useEffect } from "react";
import styled from "styled-components";
import products from "../assets/products";
import ProductCard from "../components/ProductCard";
import { device } from "../styles/breakpoints";

const Container = styled.div`
  padding: 40px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  min-height: 100vh;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.text};
`;

const Controls = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #ccc;
`;

const Select = styled.select`
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #ccc;
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

function Flowers() {
  // ✅ Load from localStorage
  const [search, setSearch] = useState(() => localStorage.getItem("search") || "");
  const [category, setCategory] = useState(() => localStorage.getItem("category") || "all");
  const [sort, setSort] = useState(() => localStorage.getItem("sort") || "");

  // ✅ Save to localStorage
  useEffect(() => {
    localStorage.setItem("search", search);
  }, [search]);

  useEffect(() => {
    localStorage.setItem("category", category);
  }, [category]);

  useEffect(() => {
    localStorage.setItem("sort", sort);
  }, [sort]);

  // FILTER + SEARCH
  let filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  if (category !== "all") {
    filteredProducts = filteredProducts.filter(
      (p) => p.category === category
    );
  }

  // SORT
  if (sort === "low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <Container>
      <Title>Our Flowers 🌸</Title>

      <Controls>
        <Input
          type="text"
          placeholder="Search flowers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All Categories</option>
          <option value="roses">Roses</option>
          <option value="tulips">Tulips</option>
          <option value="lilies">Lilies</option>
          <option value="sunflowers">Sunflowers</option>
          <option value="orchids">Orchids</option>
          <option value="mixed">Mixed</option>
          <option value="wildflowers">Wildflowers</option>
        </Select>

        <Select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
        </Select>
      </Controls>

      <Grid>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
    </Container>
  );
}

export default Flowers;
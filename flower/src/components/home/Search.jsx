import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeProvider";
import { useEffect, useState } from "react";
import fetchFlowers from "../fetchDb/fetchFlowers";
import {
  Box,
  Button,
  Card,
  CardMedia,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchQuery = new URLSearchParams(location.search).get("query");
  const { theme } = useTheme();
  const [flowers, setFlowers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState([]);
  const [searchResult, setSearchResult] = useState(searchQuery);

  useEffect(() => {
    const getFlowers = async () => {
      setLoading(true);
      try {
        const data = await fetchFlowers();
        if (!Array.isArray(data)) {
          console.log(("Unexpected data format:", data));
          return;
        }

        setFlowers(data);
        // setSearch(data);
      } catch (error) {
        console.error("Error while fetching to filtered results:", error);
      } finally {
        setLoading(false);
      }
    };
    getFlowers();
  }, []);

  // Search Part
  useEffect(() => {
    if (searchQuery) {
      const results = flowers.filter((flower) =>
        flower.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearch(results);
    } else {
      setSearchResult([]);
    }
  }, [searchQuery, flowers]);

  const handleSearch = () => {
    navigate(`?query=${searchResult}`);

    // Filtering results
    // const filteredResults = flowers.filter((flower) =>
    //   flower.name.toLowerCase().includes(searchQuery.toLowerCase())
    // );
    // setSearch(filteredResults);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <CircularProgress sx={{ color: theme.primary }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: { xs: "10px", sx: "20px", md: "40px" },
      }}
    >
      {/* <Typography variant="h3">Search Flowers</Typography> */}
      <Box
        display="flex"
        gap={2}
        mb={4}
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="center"
        alignItems="center"
      >
        <TextField
          value={searchResult}
          onChange={(e) => setSearchResult(e.target.value)}
          placeholder="Search flowers..."
          fullWidth
          sx={{
            input: { color: theme.primary },
            bgcolor: theme.border,
            borderRadius: "8px",
          }}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{
            backgroundColor: theme.secondary,
            color: theme.textPrimary,
            padding: "10px 20px",
            borderRadius: "8px",
            fontWeight: "bold",
            transition: "transform 0.2s",
            "&:hover": {
              transform: "scale(1.05)",
              backgroundColor: theme.primary,
              color: theme.background,
            },
          }}
        >
          Search
        </Button>
        <Button
          onClick={() => {
            setSearchResult(""), navigate(""), setSearch([]);
          }}
          sx={{
            color: theme.primary,
            border: `1px solid ${theme.primary}`,
            borderRadius: "8px",
            padding: "10px 20px",
            "&:hover": {
              backgroundColor: theme.primary,
              color: theme.background,
            },
          }}
        >
          Clear
        </Button>
      </Box>
      {search.length > 0 ? (
        <Grid container spacing={3}>
          {search.map((flower, index) => (
            <Grid item xs={12} sm={6} md={4} key={flower.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Box
                  sx={{
                    bgcolor: theme.border,
                    borderRadius: "12px",
                    boxShadow: 3,
                    p: 2,
                    textAlign: "center",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.03)",
                    },
                  }}
                >
                  <NavLink
                    to={`/flower/${flower.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", color: theme.secondary, mb: 1 }}
                    >
                      {flower.name}
                    </Typography>
                    <Card>
                      <CardMedia
                        component="img"
                        image={flower.imageUrl}
                        alt={flower.name}
                        style={{
                          width: "100%",
                          height: "auto",
                          borderRadius: "8px",
                          objectFit: "cover",
                        }}
                      />
                    </Card>
                  </NavLink>
                  <Typography sx={{ mt: 1, color: theme.primary }}>
                    Price: {flower.price}$
                  </Typography>
                  <Button
                    sx={{
                      backgroundColor: theme.secondary,
                      color: theme.textPrimary,
                      mt: 2,
                      borderRadius: 2,
                      px: 3,
                      py: 1,
                      "&:hover": {
                        bgcolor: theme.primary,
                      },
                    }}
                  >
                    Buy now
                  </Button>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography
          align="center"
          sx={{
            mt: 4,
            color: theme.textSecondary,
            fontStyle: "italic",
            fontSize: "1.2rem",
          }}
        >
          No flowers found matching your search.
        </Typography>
      )}
    </Box>
  );
}

export default Search;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../ThemeProvider";
import fetchFlowers from "../fetchDb/fetchFlowers";
import {
  Box,
  Button,
  Card,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

function Details() {
  const { id } = useParams();
  const [flowers, setFlowers] = useState(null);
  const [loading, setLoading] = useState(true);
  const { darkMode, toggleTheme, theme } = useTheme();

  useEffect(() => {
    const getFlowers = async () => {
      try {
        const data = await fetchFlowers();
        if (!Array.isArray(data)) {
          console.log("Unexpected data:", data);
          return;
        }
        const selectedFlower = data.find((flower) => String(flower.id) === id);
        setFlowers(selectedFlower);
      } catch (e) {
        console.log("Error:", e);
      } finally {
        setLoading(false);
      }
    };
    getFlowers();
  }, [id]);

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

  if (!flowers) {
    return (
      <Typography sx={{ color: theme.secondary }}>Flower not found.</Typography>
    );
  }

  return (
    <Box
      sx={{
        background: darkMode
          ? "linear-gradient(135deg,#1e1e2f,#3e3e5e)"
          : "linear-gradient(135deg,#fbc2eb,#fcb0c4)",
        minHeight: "100vh",
        p: 4,
        transition: "background 0.6s ease",
      }}
    >
      <Box
        sx={{
          bgcolor: theme.background,
          color: theme.textPrimary,
          p: 3,
          borderRadius: 3,
          boxShadow: 4,
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        {/* Dark Mode Toggle */}
        <Button
          onClick={toggleTheme}
          sx={{
            position: "absolute",
            top: 20,
            right: 20,
            color: theme.primary,
            "&:hover": {
              bgcolor: theme.primary,
              color: theme.background,
              transform: "scale(1.1)",
            },
            boxShadow: 3,
            borderRadius: "50%",
            width: 48,
            height: 48,
            minWidth: 0,
            transition: "all 0.3s ease",
          }}
        >
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </Button>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Card
            sx={{
              maxWidth: "600px",
              width: "100%",
              borderRadius: 3,
              boxShadow: 4,
            }}
          >
            <CardMedia
              component="img"
              image={flowers.imageUrl}
              alt={flowers.name}
              sx={{
                borderRadius: 3,
                maxHeight: 450,
                objectFit: "cover",
                width: "100%",
                height: "auto",
              }}
            />
          </Card>
        </Box>
        <Box
          sx={{
            mb: 3,
          }}
        >
          <Typography sx={{ color: theme.secondary, textAlign: "center" }}>
            {flowers.name}
          </Typography>
          <Typography sx={{ color: theme.primary, mt: 1, textAlign: "center" }}>
            Price: {flowers.price}$
          </Typography>
          <Typography
            sx={{ color: theme.secondary, mt: 2, textAlign: "center" }}
          >
            {flowers.description}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            sx={{
              backgroundColor: theme.secondary,
              color: theme.textPrimary,
              border: "none",
              padding: "10px 16px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: theme.primary,
              },
              transition: "all 0.3s ease",
            }}
          >
            Buy now
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Details;

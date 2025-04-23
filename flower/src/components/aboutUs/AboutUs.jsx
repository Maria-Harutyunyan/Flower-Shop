import { Box, Button, Typography } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "../ThemeProvider";

function AboutUs() {
  const { darkMode, toggleTheme, theme } = useTheme();

  return (
    <Box
      sx={{
        bgcolor: theme.background,
        color: theme.textPrimary,
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
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
      <Box sx={{ textAlign: "center", maxWidth: "900px", padding: "20px" }}>
        <Typography
          variant="h3"
          sx={{
            color: theme.primary,
            fontWeight: "bold",
            mb: 2,
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
          }}
        >
          About Us
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: theme.textSecondary,
            mb: 2,
            fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.5rem" },
          }}
        >
          Welcome to
          <br />
          <strong style={{ color: theme.secondary }}>
            Blooming Marvellous,
          </strong>
          where flowers are more than just petals and stems—they are stories,
          emotions, and memories wrapped in nature’s beauty.
        </Typography>
        <Typography
          sx={{
            color: theme.textSecondary,
            mb: 2,
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
          }}
        >
          Our journey began with a deep love for flowers and a passion for
          spreading joy through nature’s finest creations. Every bloom we select
          is carefully chosen to bring warmth, happiness, and elegance to your
          most cherished moments.
        </Typography>
        <Typography
          sx={{
            color: theme.textSecondary,
            mt: 2,
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
          }}
        >
          <strong>Our Mission:</strong>
          To fill your life with color, fragrance, and beauty—one flower at a
          time.
        </Typography>

        <Typography
          sx={{
            color: theme.textSecondary,
            mt: 3,
          }}
        >
          <strong>What We Offer:</strong> From romantic roses to vibrant tulips,
          our handpicked selection ensures freshness and elegance in every
          bouquet.
        </Typography>

        <Typography
          sx={{
            color: theme.textSecondary,
            mt: 2,
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
          }}
        >
          <strong>Why Choose Us? </strong> We craft each arrangement with love,
          offering not just flowers, but an experience of joy, care, and
          heartfelt connection.
        </Typography>

        <Typography
          sx={{
            color: theme.textSecondary,
            mt: 5,
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
          }}
        >
          Whether you’re celebrating love, friendship, or simply the beauty of
          everyday life,
          <span style={{ color: theme.textSecondary, fontWeight: "bold" }}>
            Blooming Marvellous
          </span>
          is here to make every moment bloom.
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: theme.secondary,
            fontWeight: "bold",
            mt: 3,
            fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.5rem" },
          }}
        >
          Let’s create something beautiful together!🌸
        </Typography>
      </Box>
    </Box>
  );
}

export default AboutUs;

import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "../ThemeProvider";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

function Contact() {
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

      <Box>
        <Typography
          variant="h3"
          sx={{
            color: theme.primary,
            fontWeight: "bold",
            mb: 2,
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
          }}
        >
          Contact Us
        </Typography>
        <Typography
          sx={{
            color: theme.textSecondary,
            mb: 2,
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
          }}
        >
          Have a question or need assistance? We’re here to help! Whether it’s
          about our beautiful floral arrangements or a custom request, feel free
          to reach out.
        </Typography>
        <Typography
          sx={{
            color: theme.textSecondary,
            mb: 2,
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
          }}
        >
          📍 <strong>Visit Us:</strong> 123 Flower Street, Yerevan, Armenia
        </Typography>
        <Typography
          sx={{
            color: theme.textSecondary,
            mb: 2,
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
          }}
        >
          📞 <strong>Call Us:</strong> +374 91 123456
        </Typography>
        <Typography
          sx={{
            color: theme.textSecondary,
            mb: 3,
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
          }}
        >
          📧 <strong>Email:</strong> support@bloomingmarvellous.com
        </Typography>
      </Box>
    </Box>
  );
}

export default Contact;

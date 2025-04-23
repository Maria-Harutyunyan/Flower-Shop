import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Stack,
  useMediaQuery,
  IconButton,
  Drawer,
  Tooltip,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import {
  ABOUT_US,
  CART,
  CONTACT,
  PROFILE,
  // REGISTER,
  SHOP,
  SIGN_IN,
} from "../constants/constants";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "../ThemeProvider";
import Cart from "../cart/Cart";
import { useSelector } from "react-redux";
import { isLoggedIn } from "../redux/authSlice";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Home() {
  const { darkMode, toggleTheme, theme } = useTheme();
  const isMobile = useMediaQuery("(max-width:786px)");
  const [openMenu, setOpenMenu] = useState(false);
  const isLoggedInUser = useSelector(isLoggedIn);

  const navLinks = [
    { to: SHOP, label: "Shop" },
    { to: ABOUT_US, label: "About Us" },
    { to: CONTACT, label: "Contact" },
    isLoggedInUser
      ? {
          to: PROFILE,
          label: (
            <Tooltip title="Go to Profile">
              <AccountCircleIcon fontSize="medium" />
            </Tooltip>
          ),
        }
      : { to: SIGN_IN, label: "Sign In" },
    // { to: REGISTER, label: "Register" },
    { to: CART, label: <Cart /> },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: theme.background,
        color: theme.textPrimary,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: { xs: "40px 20px", md: "60px 100px" },
        overflow: "hidden",
        position: "relative",
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

      {/* Navigation Bar */}
      {isMobile ? (
        <>
          <IconButton
            onClick={() => setOpenMenu(true)}
            sx={{
              position: "absolute",
              top: 20,
              left: 20,
              color: theme.primary,
              zIndex: 999,
            }}
          >
            <MenuIcon />
          </IconButton>

          <Drawer
            anchor="left"
            open={openMenu}
            onClose={() => setOpenMenu(false)}
            PaperProps={{
              sx: {
                backgroundColor: theme.secondary,
                color: theme.textPrimary,
                width: "70%",
                p: 2,
              },
            }}
          >
            <Box>
              <IconButton
                onClick={() => setOpenMenu(false)}
                sx={{ color: theme.primary, mb: 2 }}
              >
                <CloseIcon />
              </IconButton>
              <Stack spacing={2}>
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpenMenu(false)}
                  >
                    <Button
                      sx={{
                        color: theme.textSecondary,
                        "&:hover": {
                          color: theme.background,
                        },
                      }}
                    >
                      {link.label}
                    </Button>
                  </NavLink>
                ))}
              </Stack>
            </Box>
          </Drawer>
        </>
      ) : (
        <Stack
          direction="row"
          spacing={2}
          sx={{
            flexWrap: "wrap",
            justifyContent: "center",
            bgcolor: theme.secondary,
            borderRadius: "12px",
            p: 2,
            mb: 6,
          }}
        >
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to}>
              <Button
                sx={{
                  color: theme.textSecondary,
                  "&:hover": {
                    backgroundColor: theme.primary,
                    color: theme.background,
                  },
                }}
              >
                {link.label}
              </Button>
            </NavLink>
          ))}
        </Stack>
      )}

      {/* Main Content */}
      <Typography
        variant="h2"
        sx={{
          color: theme.primary,
          textAlign: "center",
          mb: 2,
        }}
      >
        Blooming Marvellous
      </Typography>

      <Typography
        variant="h5"
        sx={{
          color: theme.textSecondary,
          fontStyle: "italic",
          textAlign: "center",
          mb: 4,
        }}
      >
        Every Petal, Pure Perfection
      </Typography>

      <NavLink to={SHOP}>
        <Button
          sx={{
            backgroundColor: theme.textSecondary,
            color: theme.background,
            fontWeight: "bold",
            px: 4,
            py: 1.5,
            borderRadius: "12px",
            fontSize: "1rem",
            "&:hover": {
              backgroundColor: theme.background,
              color: theme.primary,
            },
          }}
        >
          Explore Our Flowers
        </Button>
      </NavLink>
    </Box>
  );
}

export default Home;

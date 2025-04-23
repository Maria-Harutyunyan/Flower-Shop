import { useEffect, useState } from "react";
import fetchFlowers from "../fetchDb/fetchFlowers";
import React from "react";
import { useTheme } from "../ThemeProvider";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Drawer,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Cart from "../cart/Cart";
import Search from "./Search";
import TotalPrice from "../cart/TotalPrice";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn, updateCart } from "../redux/authSlice";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

function Shop() {
  const { id } = useParams();
  const [flowers, setFlowers] = useState([]);
  const { darkMode, toggleTheme, theme } = useTheme();
  const [openMenu, setOpenMenu] = useState(false);
  const isMobile = useMediaQuery("(max-width:786px)");
  const isLoggedInUser = useSelector(isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navLinks = [
    { to: "/shop", label: "Shop" },
    { to: "/aboutUs", label: "About Us" },
    { to: "/contact", label: "Contact" },
    isLoggedInUser
      ? {
          to: "/profile",
          label: (
            <Tooltip title="Go to Profile">
              <AccountCircleIcon fontSize="medium" />
            </Tooltip>
          ),
        }
      : { to: "/signIn", label: "Sign In" },
    // { to: "/register", label: "Register" },
    { to: "/cart", label: <Cart /> },
  ];

  useEffect(() => {
    const getFlowers = async () => {
      try {
        const data = await fetchFlowers();
        if (!Array.isArray(data)) {
          console.error("Unexpected data format:", data);
          return;
        }
        setFlowers(data);
      } catch (error) {
        console.error("Error fetching flowers:", error);
      }
    };
    getFlowers();
  }, [id]);

  const handleBuyNow = async (flower) => {
    if (!isLoggedInUser) {
      navigate("/signIn");
      return;
    }

    if (!user || !user.uid) return;

    try {
      if (!flower || !flower.id) return;

      const flowerRef = doc(db, "flowers", flower.id);
      const flowerDoc = await getDoc(flowerRef);

      if (!flowerDoc.exists()) return;

      const { name, imageUrl, price } = flowerDoc.data();

      if (!name || !imageUrl || !price) return;

      const flowerForCart = {
        id: flower.id,
        name,
        imageUrl: imageUrl,
        price,
      };

      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) return;

      const cart = userDoc.data().cart || [];

      if (!cart.some((item) => item.id === flower.id)) {
        await updateDoc(userRef, {
          cart: arrayUnion(flowerForCart),
        });
        dispatch(updateCart([...cart, flowerForCart]));
      }
    } catch (error) {
      console.error("Error while updating cart:", error);
    }
  };

  /* Main Content */

  return (
    <Box
      sx={{
        background: darkMode
          ? "linear-gradient(135deg,#1e1e2f,#3e3e5e)"
          : "linear-gradient(135deg, #fbc2eb, #fcb0c4)",
        minHeight: "100vh",
        p: 0,
        transition: "background 0.6s ease",
      }}
    >
      <Box
        sx={{
          backdropFilter: "blur(10px)",
          backgroundColor: darkMode
            ? "rgba(0,0,0,0.4)"
            : "rgba()255,255,255,0.5",
          color: theme.textPrimary,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          px: { xs: 2, mb: 6 },
          py: 4,
          transition: "background-color 0.6s ease,color 0.6s ease",
        }}
      >
        {/* Dark Mode Toggle */}
        <Box
          sx={{
            position: "absolute",
            top: 20,
            right: 20,
            zIndex: 10,
          }}
        >
          <Button
            onClick={toggleTheme}
            sx={{
              color: theme.primary,
              borderRadius: "50%",
              width: 48,
              height: 48,
              minWidth: 0,
              boxShadow: 3,
              margin: 3,
              "&:hover": {
                bgcolor: theme.primary,
                color: theme.background,
                transform: "scale(1.1)",
              },
              transition: "all 0.3s ease",
            }}
          >
            {darkMode ? (
              <LightModeIcon fontSize="medium" />
            ) : (
              <DarkModeIcon fontSize="medium" />
            )}
          </Button>
        </Box>
        {/* Navigation bar */}
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
        {/* Title part */}
        <Box sx={{ bgcolor: theme.background, color: theme.textPrimary, p: 3 }}>
          <Typography
            variant="h2"
            style={{ color: theme.primary, textAlign: "center" }}
          >
            Blooming Marvellous
          </Typography>
          <br />

          <Typography
            variant="h4"
            style={{
              color: theme.textSecondary,
              textAlign: "center",
              mb: 4,
              fontStyle: "italic",
            }}
          >
            Every Petal, Pure Perfection
          </Typography>

          {/* Search part */}

          <Search />

          {/* Flower grid */}

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2,1fr)",
                md: "repeat(3,1fr)",
              },
              gap: 4,
              mt: 4,
            }}
          >
            {flowers.length === 0 ? (
              <Typography
                sx={{
                  color: theme.textSecondary,
                  gridColumn: "1/-1",
                  textAlign: "center",
                }}
              >
                No flowers available.
              </Typography>
            ) : (
              flowers.map((flower) => (
                <Card
                  key={flower.id}
                  elevation={3}
                  sx={{
                    p: 2,
                    textAlign: "center",
                    backgroundColor: theme.background,
                    borderRadius: 3,
                  }}
                >
                  <NavLink
                    to={`/flower/${flower.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Typography sx={{ mb: 1, color: theme.secondary }}>
                      {flower.name}
                    </Typography>
                    <Card>
                      <CardMedia
                        component="img"
                        image={flower.imageUrl}
                        alt={flower.name}
                        style={{
                          objectFit: "cover",
                          maxHeight: 200,
                          borderRadius: 2,
                        }}
                      />
                    </Card>
                  </NavLink>
                  <Typography sx={{ mt: 2, color: theme.primary }}>
                    Price: {flower.price}$
                  </Typography>
                  <Button
                    onClick={handleBuyNow}
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
                </Card>
              ))
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Shop;

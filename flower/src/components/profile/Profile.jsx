import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout, selectUser } from "../redux/authSlice";
import { auth, db } from "../firebase/firebaseConfig";
import { SIGN_IN } from "../constants/constants";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { doc, getDoc } from "firebase/firestore";
import { useTheme } from "../ThemeProvider";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

function Profile() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const user = useSelector(selectUser);
  const { darkMode, toggleTheme, theme } = useTheme();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUserData(user);
    } else {
      const fetchUser = async () => {
        setLoading(true);
        const currentUser = auth.currentUser;

        if (currentUser) {
          const userRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            setUserData(userSnap.data());
          }
        }
        setLoading(false);
      };
      fetchUser();
    }
  }, [user]);

  const handleLogout = async () => {
    setLoading(true);

    try {
      await auth.signOut();
      dispatch(logout());
      navigate(SIGN_IN);
    } catch (error) {
      console.log("Error while Log Out", error);
    }
    setLoading(false);
  };
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
      {loading ? (
        <CircularProgress />
      ) : userData ? (
        <Box
          sx={{
            backgroundColor: darkMode ? "#3b3b3b" : "#fff0f5",
            padding: "30px",
            borderRadius: "20px",
            boxShadow: "0px 8px 24px rgba(0,0,0,0.1)",
            textAlign: "center",
            minWidth: "300px",
          }}
        >
          <Button
            onClick={toggleTheme}
            sx={{
              position: "absolute",
              top: 20,
              right: 20,
              minWidth: "auto",
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
          <Avatar
            sx={{
              width: 100,
              height: 100,
              margin: "auto",
              bgcolor: "#ffc0cb",
            }}
          >
            <AccountCircle sx={{ fontSize: 80 }} />
          </Avatar>
          <Typography variant="h5" sx={{ mt: 2, color: "#c06c84" }}>
            {userData.nickname}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, color: "#6a5acd" }}>
            {userData.email}
          </Typography>
          <Button
            onClick={handleLogout}
            sx={{
              backgroundColor: darkMode ? "#ff6347" : "#98fb98",
              color: darkMode ? "#fff" : "#333",
              mt: 2,
              width: "100%",
              borderRadius: 2,
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: darkMode ? "#ff4500" : "#90ee90",
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
              },
              transition: "background-color 0.3s ease, transform 0.2s ease",
            }}
          >
            {loading ? <CircularProgress size={20} /> : "Log Out"}
          </Button>
        </Box>
      ) : (
        <Typography sx={{ color: theme.primary }}>
          No user data found.
        </Typography>
      )}
      <NavLink
        to="/shop"
        style={{
          textDecoration: "none",
          marginTop: "20px",
        }}
      >
        <Button
          sx={{
            backgroundColor: "#add8e6",
            color: "#333",
            "&:hover": {
              backgroundColor: "#87cefa",
            },
            mt: 3,
          }}
        >
          Back to shop
        </Button>
      </NavLink>
    </Box>
  );
}

export default Profile;

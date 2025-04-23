import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import { setUser } from "../redux/authSlice";
import { PROFILE, REGISTER } from "../constants/constants";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "../ThemeProvider";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { darkMode, toggleTheme, theme } = useTheme();

  const signIn = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        dispatch(setUser(userSnap.data()));
        navigate(PROFILE);
      } else {
        setErrorMessage("No such User data");
      }
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setErrorMessage("The User not found");
      } else if (error.code === "auth/wrong-password") {
        setErrorMessage("Wrong password");
      } else {
        setErrorMessage("Something went wrong.Please, try again.");
      }
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      signIn(e);
    }
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
        p: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          padding: 4,
          borderRadius: 4,
          maxWidth: 400,
          width: "100%",
          bgcolor: theme.border,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Button
          onClick={toggleTheme}
          sx={{
            alignSelf: "flex-end",
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
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={2}>
          Sign In
        </Typography>
        <TextField
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          variant="outlined"
        />
        <TextField
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          variant="outlined"
        />
        {errorMessage && (
          <Typography color="error" textAlign="center">
            {errorMessage}
          </Typography>
        )}
        {/* <NavLink to={`/${PROFILE}`}> */}
        <Button
          variant="contained"
          fullWidth
          onClick={signIn}
          onKeyDown={handleKeyDown}
          sx={{
            mt: 1,
            height: 45,
            backgroundColor: "#A8D5BA",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: 2,
            "&:hover": {
              backgroundColor: "#8CC9A1",
            },
          }}
        >
          {loading ? <CircularProgress size={24} /> : "Sign In"}
        </Button>
        {/* </NavLink> */}
        <Typography variant="body2" textAlign="center">
          Don't have an account yet?
          <NavLink
            to={`/${REGISTER}`}
            style={{
              color: "#689f38",
              fontWeight: "bold",
            }}
          >
            Register
          </NavLink>
        </Typography>
      </Paper>
    </Box>
  );
}

export default SignIn;

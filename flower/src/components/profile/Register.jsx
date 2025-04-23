import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { setUser } from "../redux/authSlice";
import { PROFILE, SIGN_IN } from "../constants/constants";
import { Box, Paper } from "@mui/material";
import { Button, TextField, Typography } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "../ThemeProvider";

function Register() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { darkMode, toggleTheme, theme } = useTheme();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Password are not the same.");

      return;
    }

    if (!email || !password || !confirmPassword || !nickname) {
      setErrorMessage("All fields are required.");

      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userRef = doc(db, "users", user.uid);

      await setDoc(userRef, {
        uid: user.uid,
        nickname,
        email,
        cart: [],
      });

      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        dispatch(setUser(docSnap.data()));
        navigate(PROFILE);
      } else {
        setErrorMessage("Such user is not found.");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      register(e);
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
          Register
        </Typography>
        <TextField
          fullWidth
          required
          value={nickname}
          placeholder="Nickname"
          onChange={(e) => {
            setNickname(e.target.value);
          }}
          type="nickname"
          variant="outlined"
        />
        <TextField
          fullWidth
          required
          value={email}
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          variant="outlined"
        />
        <TextField
          fullWidth
          required
          value={password}
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          variant="outlined"
        />
        <TextField
          fullWidth
          required
          value={confirmPassword}
          placeholder="Confirm Password"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          type="password"
          variant="outlined"
        />
        {errorMessage && (
          <Typography color="error" textAlign="center">
            {errorMessage}
          </Typography>
        )}
        <Button
          onClick={register}
          disabled={loading}
          variant="contained"
          fullWidth
          onKeyDown={handleKeyDown}
          sx={{
            mt: 1,
            height: 45,
            backgroundColor: "#A8D5BA",
            color: "fff",
            fontWeight: "bold",
            borderRadius: 2,
            "&:hover": {
              backgroundColor: "#8CC9A1",
            },
          }}
        >
          {loading ? "Registering..." : "Register"}
        </Button>
        <Typography variant="body2" textAlign="center">
          Have you already have an account?
          <NavLink
            to={`/${SIGN_IN}`}
            style={{
              color: "#689f38",
              fontWeight: "bold",
            }}
          >
            Sign In
          </NavLink>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Register;

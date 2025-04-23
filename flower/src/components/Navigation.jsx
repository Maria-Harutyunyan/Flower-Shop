import { Box, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import {
  ABOUT_US,
  CART,
  CONTACT,
  PROFILE,
  REGISTER,
  SHOP,
  SIGN_IN,
} from "./constants/constants";
import { isLoggedIn } from "./redux/authSlice";
import { useSelector } from "react-redux";

function Navigation() {
  const isLoginedUser = useSelector(isLoggedIn);
  return (
    <Box>
      <NavLink to={`${SHOP}`} />
      <NavLink to={`${ABOUT_US}`} />
      <NavLink to={`${CONTACT}`} />
      {isLoginedUser ? (
        <NavLink to={`${PROFILE}`} />
      ) : (
        <NavLink to={`${SIGN_IN}`} />
      )}

      {/* <NavLink to={`${REGISTER}`} /> */}
      <NavLink to={`${CART}`} />
    </Box>
  );
}

export default Navigation;


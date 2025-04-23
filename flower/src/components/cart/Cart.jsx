import { useState } from "react";
import { useTheme } from "../ThemeProvider";
import { useSelector } from "react-redux";
import { isLoggedIn, selectUser } from "../redux/authSlice";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import ShoppingCartCheckoutSharpIcon from "@mui/icons-material/ShoppingCartCheckoutSharp";
import { NavLink } from "react-router-dom";
import CartDelete from "./CartDelete";
import TotalPrice from "./TotalPrice";
import { SIGN_IN } from "../constants/constants";

const Cart = () => {
  const [open, setOpen] = useState(false);
  const { toggleTheme, darkMode, theme } = useTheme();
  const isLoggedInUser = useSelector(isLoggedIn);
  const user = useSelector(selectUser);

  return (
    <Box>
      <IconButton onClick={() => setOpen(true)}>
        <ShoppingCartCheckoutSharpIcon />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Your Cart</DialogTitle>
        <DialogContent>
          {isLoggedInUser ? (
            <>
              {user.cart.length > 0 ? (
                <>
                  <ul>
                    {user.cart.map((flower) => (
                      <li key={flower.id}>
                        <NavLink
                          to={`/flower/${flower.id}`}
                          onClick={() => setOpen(false)}
                        >
                          {flower.name} 
                          {/* - {flower.imageUrl} - {flower.price}$ */}
                        </NavLink>
                        <CartDelete flower={flower} />
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                "Cart is empty"
              )}

              {user.cart.length > 0 && (
                <TotalPrice cart={user.cart} uid={user.uid} />
              )}
            </>
          ) : (
            <>
              You need to be
              <NavLink to={`/${SIGN_IN}`} onClick={() => setOpen(false)}>
                Sign In
              </NavLink>
            </>
          )}
        </DialogContent>

        <DialogActions onClick={() => setOpen(false)}>
          <Button>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Cart;
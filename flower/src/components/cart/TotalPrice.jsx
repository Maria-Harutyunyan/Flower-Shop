import { useDispatch } from "react-redux";
import { useTheme } from "../ThemeProvider";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { updateCart, updateHistory } from "../redux/authSlice";
import { Box, Button, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function TotalPrice({ cart, uid }) {
  const { toggleTheme, darkMode, theme } = useTheme();
  const totalPrice = cart.reduce((acc, flower) => acc + flower.price, 0);
  const dispatch = useDispatch();

  const moveCartToHistory = async () => {
    if (!uid) {
      console.log("User ID is missing");
      return;
    }

    try {
      const userRef = doc(db, "users", uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        console.log("User nor found");
        return;
      }

      const userData = userDoc.data();
      const cart = userData.cart || [];
      const history = userData.history || [];

      const updatedCart = [];
      const updatedHisory = [...history, ...cart];

      await updateDoc(userRef, {
        history: updatedHisory,
        cart: updatedCart,
      });
      ("Cart moved to history successfully!");
      dispatch(updateCart(updatedCart));
      dispatch(updateHistory(updatedHisory));
    } catch (error) {
      console.error("Error while moving to history:", error);
    }
  };

  return (
    <Box>
      <Typography>Total Price - $ {totalPrice}</Typography>
      <Button onClick={moveCartToHistory}>
        <ShoppingCartIcon />
        Make an order
      </Button>
    </Box>
  );
}

export default TotalPrice;


import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { Button } from "@mui/material";
import { selectUser, updateCart } from "../redux/authSlice";
import { useTheme } from "../ThemeProvider";

function CartDelete({ flower }) {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const user = useSelector(selectUser);

  const handleRemove = async (flowerId) => {
    if (!user || !user.uid) return;

    try {
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) return;

      const userData = userDoc.data();
      const updatedCart = userData.cart.filter((item) => item.id !== flowerId);

      await updateDoc(userRef, { cart: updatedCart });

      dispatch(updateCart(updatedCart));
    } catch (error) {
      console.log("Error removing flower:", error);
    }
  };

  return (
    <Button
      sx={{ bgcolor: theme.secondary, color: theme.border }}
      onClick={() => handleRemove(flower.id)}
    >
      X
    </Button>
  );
}

export default CartDelete;

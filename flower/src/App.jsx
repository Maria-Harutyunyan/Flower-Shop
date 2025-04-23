import "./App.css";
import { Box } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  ABOUT_US,
  CART,
  CONTACT,
  PROFILE,
  REGISTER,
  SEARCH,
  SHOP,
  SIGN_IN,
} from "./components/constants/constants";
import Home from "./components/home/Home";
import Profile from "./components/profile/Profile";
import Shop from "./components/home/Shop";
import AboutUs from "./components/aboutUs/AboutUs";
import SignIn from "./components/profile/SignIn";
import Register from "./components/profile/Register";
import Contact from "./components/contact/Contact";
import Cart from "./components/cart/Cart";
import Details from "./components/home/Details";
import Search from "./components/home/Search";

function App() {
  return (
    <Box>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={`/${SIGN_IN}`} element={<SignIn />} />
          <Route path={`/${REGISTER}`} element={<Register />} />
          <Route path={`/${ABOUT_US}`} element={<AboutUs />} />
          <Route path={`/${CONTACT}`} element={<Contact />} />
          <Route path={`/${SHOP}`} element={<Shop />} />
          <Route path={`/${PROFILE}`} element={<Profile />} />
          <Route path={`/${CART}`} element={<Cart />} />
          <Route path="/flower/:id" element={<Details />} />
          <Route path={`/${SEARCH}`} element={<Search />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;

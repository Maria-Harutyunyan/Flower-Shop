import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Pages
import Home from "./pages/Home";
import Flowers from "./pages/Flowers";
import FlowerDetails from "./pages/FlowerDetails";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5 },
};

function App() {
  return (
    <Router>
      <Navbar />

      {/* AnimatePresence enables exit animations */}
      <AnimatePresence mode="wait">
        <Routes>
          <Route
            path="/"
            element={
              <motion.div {...pageTransition}>
                <Home />
              </motion.div>
            }
          />
          <Route
            path="/flowers"
            element={
              <motion.div {...pageTransition}>
                <Flowers />
              </motion.div>
            }
          />
          <Route
            path="/flowers/:id"
            element={
              <motion.div {...pageTransition}>
                <FlowerDetails />
              </motion.div>
            }
          />
          <Route
            path="/cart"
            element={
              <motion.div {...pageTransition}>
                <Cart />
              </motion.div>
            }
          />
          <Route
            path="/about"
            element={
              <motion.div {...pageTransition}>
                <About />
              </motion.div>
            }
          />
          <Route
            path="/contact"
            element={
              <motion.div {...pageTransition}>
                <Contact />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
      <Footer />
    </Router>
  );
}

export default App;

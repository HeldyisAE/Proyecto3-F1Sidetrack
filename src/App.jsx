import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/"      element={<Login />} />
        <Route path="/home"  element={<Home />} />
        <Route path="/shop"  element={<Shop />} />
        <Route path="/cart"  element={<Cart />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;

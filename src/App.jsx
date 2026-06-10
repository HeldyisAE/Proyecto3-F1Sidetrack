import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Driver from "./pages/Driver";
import Team from "./pages/Team";

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />}/>
        <Route path="/shop" element={<Shop />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/driver/:driverNumber" element={<Driver />}/>
        <Route path="/team/:teamId" element={<Team />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;

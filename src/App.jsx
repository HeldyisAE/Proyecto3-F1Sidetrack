import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Driver from "./pages/Driver";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />}/>
        <Route path="/shop" element={<Shop />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/driver/:driverNumber" element={<Driver />}/>
      </Routes>
    </>
  );
}

export default App

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Auctions from "./pages/Auctions";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import CreateAuction from "./pages/CreateAuction";

function App() {
  return (
    <BrowserRouter>

      <div className="bg-gray-900 min-h-screen text-white">

        <Navbar />

        <div className="p-8">

          <Routes>
            <Route path="/" element={<Auctions />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/create-auction" element={<CreateAuction />} />
          </Routes>

        </div>

      </div>

    </BrowserRouter>
  );
}

export default App;
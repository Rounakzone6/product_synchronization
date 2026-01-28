import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import Addproduct from "../components/Addproduct";

const Home = () => {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/add-product" element={<Addproduct />} />
      </Routes>
    </>
  );
};

export default Home;

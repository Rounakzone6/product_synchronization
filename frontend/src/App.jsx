import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AppContext from "./context/AppContext";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Addproduct from "./pages/Addproduct";
import NewInvoice from "./pages/NewInvoice";
import ScrollToTop from "./components/ScrollToTop";
import History from "./pages/History";

const App = () => {
  const { token } = useContext(AppContext);
  return (
    <>
      {token === "" ? (
        <Login />
      ) : (
        <>
          <ToastContainer />
          <ScrollToTop />
          <Navbar />
          <div className="flex">
            <Sidebar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/products" element={<Products />} />
              <Route path="/history" element={<History />} />
              <Route path="/add-product" element={<Addproduct />} />
              <Route path="/new-invoice" element={<NewInvoice />} />
            </Routes>
          </div>
        </>
      )}
    </>
  );
};

export default App;

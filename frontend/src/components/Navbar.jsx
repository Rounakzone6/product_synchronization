import { useContext } from "react";
import AppContext from "../context/AppContext";

const Navbar = () => {
  const { navigate, setToken } = useContext(AppContext);
  const logout = () => {
    setToken("");
    navigate("/");
  };

  return (
    <div className="sticky top-0 z-10 bg-gray-500">
    <div className="flex max-w-[90vw] py-4 mx-auto items-center justify-between">
      <p className="text-2xl font-medium">Billing System</p>
      <div className="flex gap-4">
        <p
          className="cursor-pointer text-white bg-green-500 rounded px-3 py-2"
          onClick={() => navigate("/profile")}
        >
          Manage Profile
        </p>
        <button
          className="cursor-pointer text-white bg-black/60 rounded px-3 py-2"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
    </div>
  );
};

export default Navbar;

import { useContext } from "react";
import AppContext from "../context/AppContext";

const Navbar = () => {
  const { token, navigate, setToken, profile } = useContext(AppContext);

  const logout = () => {
    setToken("");
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-gray-200">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <p
            onClick={() => navigate("/")}
            className="text-lg sm:text-xl font-semibold text-gray-800 cursor-pointer truncate"
            title={token ? profile.business : "Billing Management"}
          >
            {token ? profile.business : "Billing Management"}
          </p>
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => navigate("/profile")}
              className="
                text-sm sm:text-base
                bg-green-500 text-white
                px-3 py-2 rounded-lg
                hover:bg-green-600
                transition-colors
              "
            >
              Profile
            </button>

            <button
              onClick={logout}
              className="
                text-sm sm:text-base
                bg-gray-800 text-white
                px-3 py-2 rounded-lg
                hover:bg-gray-900
                transition-colors
              "
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

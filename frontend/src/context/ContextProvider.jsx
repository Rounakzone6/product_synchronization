import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "./AppContext";

const ContextProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const value = useMemo(
    () => ({
      backendUrl,
      token,
      loading,
      setLoading,
      navigate,
      setToken,
    }),
    [backendUrl, token, loading, navigate],
  );

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default ContextProvider;

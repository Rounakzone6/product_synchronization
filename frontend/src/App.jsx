import { useContext } from "react";
import AppContext from "./context/AppContext";
import Login from "./components/Login";
import Home from "./pages/Home";

const App = () => {
  const { token } = useContext(AppContext);
  return <>{token === "" ? <Login /> : <Home />}</>;
};

export default App;

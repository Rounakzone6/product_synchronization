import AppContext from "../context/AppContext";
import { useContext } from "react";

const Dashboard = () => {
  const { navigate } = useContext(AppContext);
  return (
    <div>
      <button onClick={() => navigate("/add-product")}>Add Product</button>
    </div>
  );
};

export default Dashboard;

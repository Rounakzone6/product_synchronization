import React, { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Products = () => {
  const [products, setProducts] = useState([]);
  const { backendUrl, token, loading, setLoading } = useContext(AppContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios(`${backendUrl}/product`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.success) {
          setProducts(response.data.products);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [token, setLoading, backendUrl]);

  {
    loading ? <p>Products fetching...</p> : null;
  }

  return <div>
    
  </div>;
};

export default Products;

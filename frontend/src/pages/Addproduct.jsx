import { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

import { RxCross2 } from "react-icons/rx";
const Addproduct = () => {
  const { backendUrl, token, loading, setLoading, navigate } =
    useContext(AppContext);

  const [product, setProduct] = useState({
    name: "",
    brand: "",
    price: "",
    quantity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(`${backendUrl}/product/add`, product, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-gray-200 my-2 rounded-2xl shadow-sm p-6 max-w-2xl mx-auto md:w-full mt-20 ml-64">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Add Product</h2>
        <RxCross2
          onClick={() => navigate("/")}
          className="text-3xl font-medium "
        />
      </div>
      <form
        id="bank-form"
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-4"
      >
        <Input
          label="Name"
          name="name"
          placeholder="Enter Product Name"
          type="text"
          required
          value={product.name}
          onChange={handleChange}
        />
        <Input
          label="Brand"
          name="brand"
          placeholder="Enter Brand Name"
          type="text"
          required
          value={product.brand}
          onChange={handleChange}
        />
        <Input
          label="Price"
          name="price"
          placeholder="Enter Product Price "
          type="text"
          required
          value={product.price}
          onChange={handleChange}
        />
        <Input
          label="Quantity"
          name="quantity"
          placeholder="0"
          type="number"
          required
          value={product.quantity}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="px-2 py-2 w-30 self-end rounded-lg bg-green-600 text-white hover:bg-green-700 transition disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

const Input = ({ label, ...props }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      {...props}
      className={`mt-1 px-3 py-2 rounded-lg border outline-none transition
      `}
    />
  </div>
);

export default Addproduct;

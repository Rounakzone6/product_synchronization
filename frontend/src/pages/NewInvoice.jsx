import { useContext, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import AppContext from "../context/AppContext";

/* 🔹 GST INCLUDED calculation */
const calculateGSTIncluded = (price, quantity, gstPercent = 5) => {
  const finalCost = price * quantity;
  const taxableAmount = (finalCost * 100) / (100 + gstPercent);
  const gstAmount = finalCost - taxableAmount;

  return {
    taxableAmount,
    gstAmount,
    finalCost,
  };
};

const NewInvoice = () => {
  const [list, setList] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    price: "",
    quantity: "",
  });

  const { profile } = useContext(AppContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const onProductAdd = (e) => {
    e.preventDefault();
    const { name, brand, price, quantity } = product;

    if (!name || !brand || !price || !quantity) {
      alert("All fields required");
      return;
    }

    setList((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name,
        brand,
        price: Number(price),
        quantity: Number(quantity),
      },
    ]);

    setProduct({ name: "", brand: "", price: "", quantity: "" });
  };

  const removeItem = (id) => {
    setList((prev) => prev.filter((item) => item.id !== id));
  };

  const finalAmount = list.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const exportPDF = () => {
    window.print();
  };

  return (
    <div id="invoice-pdf" className="p-6 mx-auto border bg-white">
      {/* HEADER */}
      <div className="text-center border-b pb-3 mb-4">
        <h1 className="text-2xl font-bold">INVOICE</h1>
        <p className="text-sm">Billing System</p>
      </div>

      {/* ADD ITEM FORM (HIDDEN IN PRINT) */}
      <form
        onSubmit={onProductAdd}
        className="grid grid-cols-5 gap-3 mb-4 no-print"
      >
        <input
          name="name"
          placeholder="Item"
          value={product.name}
          onChange={handleChange}
          className="invoice-input"
        />
        <input
          name="brand"
          placeholder="Brand"
          value={product.brand}
          onChange={handleChange}
          className="invoice-input"
        />
        <input
          type="number"
          name="quantity"
          placeholder="Qty"
          value={product.quantity}
          onChange={handleChange}
          className="invoice-input"
        />
        <input
          type="number"
          name="price"
          placeholder="Final Price (Incl. GST)"
          value={product.price}
          onChange={handleChange}
          className="invoice-input"
        />
        <button className="bg-black text-white rounded">Add</button>
      </form>

      {/* TABLE */}
      <table className="w-full border border-collapse">
        <thead>
          <tr className="border bg-gray-100">
            <th>#</th>
            <th>Item</th>
            <th>Brand</th>
            <th>Qty</th>
            <th>Final Price</th>
            <th>Taxable</th>
            <th>GST (5%)</th>
            <th>Total</th>
            <th className="no-print">Action</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => {
            const { taxableAmount, gstAmount, finalCost } =
              calculateGSTIncluded(item.price, item.quantity);

            return (
              <tr key={item.id} className="text-center border">
                <td>{index + 1}</td>
                <td className="text-left pl-2">{item.name}</td>
                <td className="text-left pl-2">{item.brand}</td>
                <td>{item.quantity}</td>
                <td>{item.price.toFixed(2)}</td>
                <td>{taxableAmount.toFixed(2)}</td>
                <td>{gstAmount.toFixed(2)}</td>
                <td className="font-semibold">
                  {finalCost.toFixed(2)}
                </td>
                <td className="no-print">
                  <RxCross2
                    className="cursor-pointer mx-auto"
                    onClick={() => removeItem(item.id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* TOTAL */}
      <div className="text-right font-bold text-lg mt-4">
        Final Amount: ₹{finalAmount.toFixed(2)}
      </div>

      {/* BANK DETAILS */}
      <div className="mt-6 max-w-sm border p-4">
        <p className="font-semibold border-b mb-2">Bank Details</p>
        <p>Bank: {profile?.bank || "-"}</p>
        <p>Branch: {profile?.branch || "-"}</p>
        <p>A/C No: {profile?.account || "-"}</p>
        <p>IFSC: {profile?.ifsc || "-"}</p>
      </div>

      {/* TERMS */}
      <div className="mt-4">
        <p className="font-semibold">Terms & Conditions</p>
        {profile?.tnc?.map((item, index) => (
          <p key={index}>
            {index + 1}. {item}
          </p>
        ))}
      </div>

      {/* PRINT BUTTON */}
      <div className="mt-6 text-center no-print">
        <button
          onClick={exportPDF}
          className="bg-red-600 text-white px-6 py-2 rounded"
        >
          Print / Export PDF
        </button>
      </div>
    </div>
  );
};

export default NewInvoice;

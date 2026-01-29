import { useContext, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import AppContext from "../context/AppContext";

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
        id: Date.now(),
        name,
        brand,
        price: Number(price),
        quantity: Number(quantity),
      },
    ]);

    setProduct({
      name: "",
      brand: "",
      price: "",
      quantity: "",
    });
  };

  const removeItem = (id) => {
    setList((prev) => prev.filter((item) => item.id !== id));
  };

  const finalAmount = list.reduce((sum, item) => {
    const rate = item.price * 0.9;
    const taxable = rate * item.quantity;
    const gst = taxable * 0.05;
    return sum + taxable + gst;
  }, 0);

  const exportPDF = () => {
    const element = document.getElementById("invoice-pdf");
    const pdfWindow = window.open("", "", "width=800,height=600");
    pdfWindow.document.writeln(
      "<html><head><title>Print Invoice</title></head><body>",
    );
    pdfWindow.document.writeln(element.innerHTML);
    pdfWindow.document.writeln("<body></html>");
    pdfWindow.document.close();
    pdfWindow.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 ml-64">
      <div id="invoice-pdf" className="invoice-container mx-auto p-6">
        {/* HEADER */}
        <div className="text-center border-b pb-3 mb-4">
          <h1 className="text-2xl font-bold">INVOICE</h1>
          <p className="text-sm">Billing System</p>
        </div>

        {/* CUSTOMER DETAILS */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm">Customer Name</label>
            <input className="invoice-input" />
          </div>
          <div>
            <label className="text-sm">Phone</label>
            <input className="invoice-input" />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <input className="invoice-input" />
          </div>
        </div>

        {/* ADD ITEM FORM (NO PDF) */}
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
            placeholder="Rate"
            value={product.price}
            onChange={handleChange}
            className="invoice-input"
          />
          <button className="bg-black text-white rounded">Add</button>
        </form>

        <table className="w-full">
          <tr>
            <th className="p-2">#</th>
            <th>Item</th>
            <th>Brand</th>
            <th>Qty</th>
            <th>MRP</th>
            <th>Rate</th>
            <th>Taxable</th>
            <th>GST %</th>
            <th>GST AMT</th>
            <th>Cost</th>
            <th>Action</th>
          </tr>
          {list.map((item, index) => {
            const rate = item.price * 0.9;
            const taxable = rate * item.quantity;
            const gst = taxable * 0.05;
            const total = taxable + gst;

            return (
              <tr key={item.id} className="text-center">
                <td className="p-2">{index + 1}</td>
                <td className="text-start pl-2">{item.name}</td>
                <td className="text-start pl-2">{item.brand}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{rate.toFixed(2)}</td>
                <td>{taxable.toFixed(2)}</td>
                <td>5%</td>
                <td>{gst.toFixed(2)}</td>
                <td className="font-semibold">{total.toFixed(2)}</td>
                <td>
                  <RxCross2
                    className="text-xl ml-6 cursor-pointer"
                    onClick={() => removeItem(item.id)}
                  />
                </td>
              </tr>
            );
          })}
        </table>

        {/* TOTAL */}
        <div className="text-right font-bold text-lg mt-4">
          Final Amount: ₹{finalAmount.toFixed(2)}
        </div>
      </div>
      <div className="flex gap-5">
        <div className="border rounded-lg p-4"></div>
        <div className="border rounded-lg p-4 max-w-sm bg-white shadow-sm">
          <p className="text-lg font-semibold mb-3 border-b pb-1">
            Bank Details
          </p>

          <div className="space-y-2 text-sm">
            <div className="flex gap-2">
              <span className="text-gray-600 min-w-12.5">Bank</span>
              <span className="font-medium">: {profile?.bank || "-"}</span>
            </div>

            <div className="flex gap-2">
              <span className="text-gray-600 min-w-12.5">Branch</span>
              <span className="font-medium">: {profile?.branch || "-"}</span>
            </div>

            <div className="flex gap-2">
              <span className="text-gray-600 min-w-12.5">A/C No</span>
              <span className="font-medium break-all">
                : {profile?.account || "-"}
              </span>
            </div>

            <div className="flex gap-2">
              <span className="text-gray-600 min-w-12.5">IFSC</span>
              <span className="font-medium">: {profile?.ifsc || "-"}</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className="font-medium">Terms & Conditions</p>
        {profile?.tnc?.map((item, index) => (
          <div key={index} className="flex gap-2">
            <span>{index + 1}.</span>
            <span>{item}</span>
          </div>
        ))}
      </div>

      {/* EXPORT BUTTON */}
      <div className="mt-4 text-center">
        <button
          onClick={exportPDF}
          className="bg-red-600 text-white px-6 py-2 rounded"
        >
          Export PDF
        </button>
      </div>
    </div>
  );
};

export default NewInvoice;

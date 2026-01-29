import React, { useState } from "react";

const NewInvoice = () => {
  const [items, setItems] = useState([]);

  const onProductAdd = () => {
    // later: push product into items[]
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // export invoice
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">New Invoice</h2>

      <form onSubmit={onSubmitHandler} className="space-y-6">
        {/* Client Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="client"
            placeholder="Client Name"
            className="input"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="input"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="input"
          />
        </div>

        {/* Product Add Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Product"
            className="input"
          />
          <input
            type="number"
            placeholder="Price"
            className="input"
          />
          <input
            type="number"
            placeholder="Qty"
            className="input"
          />
          <button
            type="button"
            onClick={onProductAdd}
            className="bg-blue-700 text-white rounded-lg px-4 py-2"
          >
            Add Product
          </button>
        </div>

        {/* Product List (future) */}
        {items.length > 0 && (
          <div className="border rounded-lg p-4 space-y-2">
            {/* map items here */}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-red-700 text-white font-medium rounded-lg px-6 py-2"
          >
            Export Invoice
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewInvoice;

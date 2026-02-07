import { useContext, useState, useMemo } from "react";
import AppContext from "../context/AppContext";

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount);
};

const calculateRow = (price, quantity, gstPercent = 18) => {
  const totalRaw = price * quantity;
  const taxableAmount = (totalRaw * 100) / (100 + gstPercent);
  const gstAmount = totalRaw - taxableAmount;

  return { taxableAmount, gstAmount, totalRaw };
};

const Invoice = ({ list = [], client = {}, totals: propTotals }) => {
  const { profile } = useContext(AppContext) || {};
  const [invoiceMeta] = useState(() => {
    const now = new Date();
    const due = new Date(now);
    due.setDate(now.getDate() + 7);

    return {
      number: Math.floor(1000 + Math.random() * 9000),
      date: now.toLocaleDateString("en-IN"),
      dueDate: due.toLocaleDateString("en-IN"),
    };
  });
  const totals = useMemo(() => {
    if (propTotals) return propTotals;

    return list.reduce(
      (acc, item) => {
        const { taxableAmount, gstAmount, totalRaw } = calculateRow(
          item.price,
          item.quantity,
        );
        return {
          taxable: acc.taxable + taxableAmount,
          gst: acc.gst + gstAmount,
          grandTotal: acc.grandTotal + totalRaw,
        };
      },
      { taxable: 0, gst: 0, grandTotal: 0 },
    );
  }, [list, propTotals]);

  return (
    <div
      id="invoice-pdf"
      className="bg-white p-8 max-w-5xl mx-auto font-sans text-gray-800 border shadow-sm print:border-none print:shadow-none print:p-0"
    >
      <div className="flex justify-between items-start mb-10 border-b pb-8">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 uppercase">
            Invoice
          </h1>
          <p className="mt-2 text-gray-500 font-medium">
            Invoice No.{" "}
            <span className="text-gray-900">#{invoiceMeta.number}</span>
          </p>
        </div>
        <div className="text-right">
          <h2 className="text-xl font-bold text-gray-900">
            {profile?.business || "Your Business Name"}
          </h2>
          <div className="text-sm text-gray-600 mt-2 space-y-1">
            <p>{profile?.address || "Street Address, City"}</p>
            <p>{profile?.city || "State, Country, ZIP"}</p>
            <p>Email: {profile?.email || "email@example.com"}</p>
            <p>Phone: {profile?.phone || "+91 00000 00000"}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between mb-10">
        <div className="w-1/2">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            Billed To
          </h3>
          <div className="text-gray-900">
            <p className="font-bold text-lg">{client.name || "Client Name"}</p>
            <p className="text-sm text-gray-600 mt-1">{client.phone}</p>
            <p className="text-sm text-gray-600 whitespace-pre-line">
              {client.address || "Client Address"}
            </p>
          </div>
        </div>
        <div className="w-1/3 text-right space-y-2">
          <div className="flex justify-between border-b border-gray-100 pb-1">
            <span className="text-gray-600 font-medium text-sm">
              Date Issued:
            </span>
            <span className="font-bold text-sm whitespace-nowrap">
              {invoiceMeta.date}
            </span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-1">
            <span className="text-gray-600 font-medium text-sm">Due Date:</span>
            <span className="font-bold text-sm whitespace-nowrap">
              {invoiceMeta.dueDate}
            </span>
          </div>
        </div>
      </div>
      <div className="mb-8 overflow-hidden rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700 font-bold uppercase">
            <tr>
              <th className="py-3 px-4 text-left w-12">#</th>
              <th className="py-3 px-4 text-left">Item Description</th>
              <th className="py-3 px-4 text-center w-20">Qty</th>
              <th className="py-3 px-4 text-right">Rate</th>
              <th className="py-3 px-4 text-right">Taxable</th>
              <th className="py-3 px-4 text-right">GST</th>
              <th className="py-3 px-4 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {list.map((item, index) => {
              const { taxableAmount, gstAmount, totalRaw } = calculateRow(
                item.price,
                item.quantity,
              );
              return (
                <tr
                  key={item.id || index}
                  className="hover:bg-gray-50 break-inside-avoid"
                >
                  <td className="py-3 px-4 text-gray-500">{index + 1}</td>
                  <td className="py-3 px-4">
                    <p className="font-medium text-gray-900">{item.name}</p>
                    {item.brand && item.brand !== "-" && (
                      <p className="text-xs text-gray-500">{item.brand}</p>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">{item.quantity}</td>
                  <td className="py-3 px-4 text-right text-gray-600 whitespace-nowrap">
                    {formatCurrency(item.price)}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-600 whitespace-nowrap">
                    {formatCurrency(taxableAmount)}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-600 whitespace-nowrap">
                    {formatCurrency(gstAmount)}
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-gray-900 whitespace-nowrap">
                    {formatCurrency(totalRaw)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col sm:flex-row justify-between gap-8 break-inside-avoid">
        <div className="w-full sm:w-1/2 space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
              Bank Details
            </h3>
            <div className="grid grid-cols-[80px_1fr] gap-y-1 text-sm text-gray-700">
              <span className="font-medium text-gray-500">Bank:</span>
              <span className="font-semibold">{profile?.bank || "-"}</span>
              <span className="font-medium text-gray-500">Account:</span>
              <span className="font-semibold">{profile?.account || "-"}</span>
              <span className="font-medium text-gray-500">IFSC:</span>
              <span className="font-semibold">{profile?.ifsc || "-"}</span>
              <span className="font-medium text-gray-500">Branch:</span>
              <span className="font-semibold">{profile?.branch || "-"}</span>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Terms & Conditions
            </h3>
            <ul className="list-disc list-inside text-xs text-gray-500 space-y-1">
              {profile?.tnc?.length > 0 ? (
                profile.tnc.map((t, i) => <li key={i}>{t}</li>)
              ) : (
                <>
                  <li>Goods once sold will not be taken back.</li>
                  <li>Interest @ 24% charged if not paid within 30 days.</li>
                </>
              )}
            </ul>
          </div>
        </div>
        <div className="w-full sm:w-5/12">
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Taxable Amount</span>
              <span className="font-medium text-gray-900">
                {formatCurrency(totals.taxable)}
              </span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Total GST (18%)</span>
              <span className="font-medium text-gray-900">
                {formatCurrency(totals.gst)}
              </span>
            </div>

            <div className="border-t-2 border-gray-900 mt-4 pt-4 flex justify-between items-end">
              <span className="text-lg font-bold text-gray-900">
                Grand Total
              </span>
              <span className="text-2xl font-bold text-indigo-700">
                {formatCurrency(totals.grandTotal)}
              </span>
            </div>
          </div>
          <div className="mt-16 text-right">
            <div className="inline-block border-t border-gray-400 w-40 pt-2 text-center text-xs font-bold text-gray-500 uppercase tracking-wide">
              Authorized Signatory
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t text-center text-xs text-gray-400">
        <p>This is a computer-generated invoice and needs no signature.</p>
      </div>
    </div>
  );
};

export default Invoice;

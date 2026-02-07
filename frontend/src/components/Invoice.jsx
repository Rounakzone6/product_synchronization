import { useContext } from "react";
import AppContext from "../context/AppContext";

const Invoice = () => {
  const { profile } = useContext(AppContext);
  return (
    <div id="invoice-pdf" className="">
      <div className="text-center border-b pb-3 mb-4">
        <h1 className="text-2xl font-bold">INVOICE</h1>
        <p className="text-sm">Billing System</p>
      </div>
      <div className="mt-6 max-w-sm border p-4">
        <p className="font-semibold border-b mb-2">Bank Details</p>
        <p>Bank: {profile?.bank || "-"}</p>
        <p>Branch: {profile?.branch || "-"}</p>
        <p>A/C No: {profile?.account || "-"}</p>
        <p>IFSC: {profile?.ifsc || "-"}</p>
      </div>
      <div className="mt-4"> 
        <p className="font-semibold">Terms & Conditions</p>
        {profile?.tnc?.map((item, index) => (
          <p key={index}>
            {index + 1}. {item}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Invoice;

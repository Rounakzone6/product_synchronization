import UpdateBank from "../components/UpdateBank";
import UpdateBusiness from "../components/UpdateBusiness";
import UpdateTnc from "../components/UpdateTnc";

const Profile = () => {
  return (
    <div>
      <div>
        {/* Business Update */}
        <UpdateBusiness />
        {/* Bank Details */}
        <UpdateBank />
      </div>
      {/* Terms & Conditions */}
      <UpdateTnc />
    </div>
  );
};

export default Profile;

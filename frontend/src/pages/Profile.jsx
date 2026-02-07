import UpdateBank from "../components/UpdateBank";
import UpdateBusiness from "../components/UpdateBusiness";
import UpdateTnc from "../components/UpdateTnc";

const Profile = () => {
  return (
    <div className="w-full md:m-6 m-2">
      <UpdateBusiness />
      <UpdateBank />
      <UpdateTnc />
    </div>
  );
};

export default Profile;

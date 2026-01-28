
const Navbar = () => {
  const logout = () => {
    localStorage.removeItem("token");
  };

  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Navbar;



const Home = () => {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className="flex">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/products" element={<Products />} />
          <Route path="/add-product" element={<Addproduct />} />
          <Route path="/new-invoice" element={<NewInvoice />} />
        </Routes>
      </div>
    </>
  );
};

export default Home;

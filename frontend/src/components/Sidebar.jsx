import { NavLink } from "react-router-dom";
import { FaFileInvoice, FaListUl, FaClockRotateLeft } from "react-icons/fa6";
import { MdAddShoppingCart } from "react-icons/md";

const sidebar = [
  {
    name: "All Products",
    path: "/products",
    icon: <FaListUl size={18} />,
  },
  {
    name: "New Invoice",
    path: "/new-invoice",
    icon: <FaFileInvoice size={18} />,
  },
  {
    name: "Add Product",
    path: "/add-product",
    icon: <MdAddShoppingCart size={20} />,
  },
  {
    name: "History",
    path: "/history",
    icon: <FaClockRotateLeft size={18} />,
  },
];

const Sidebar = () => {
  return (
    <aside className="h-screen bg-white border-r border-gray-200">
      <div
        className="
          flex flex-col gap-1 p-3
          w-16 md:w-64
          transition-all duration-300
        "
      >
        {sidebar.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `
              flex items-center gap-3 px-3 py-2 rounded-lg
              text-gray-600 font-medium
              hover:bg-gray-100 hover:text-gray-900
              transition-colors duration-200
              ${isActive ? "bg-gray-100 text-gray-900" : ""}
              `
            }
          >
            {/* Icon */}
            <span className="mx-auto md:mx-0">{item.icon}</span>

            {/* Text */}
            <span className="hidden md:inline whitespace-nowrap">
              {item.name}
            </span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;

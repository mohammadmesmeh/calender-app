import { NavLink } from "react-router-dom";

export const NavigationMenuItem = ({ to, text, icon: Icon }) => {
  if (!Icon) return null;

  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          ` px-4 font-bold text-lg py-2 flex justify-start rounded-xl items-center hover:bg-primary-hover transition-all ${
            isActive ? "text-primary bg-white hover:bg-white shadow-md" : ""
          }`
        }
      >
        <Icon size={20} className="inline-block mr-2" />
        {text}
      </NavLink>
    </li>
  );
};
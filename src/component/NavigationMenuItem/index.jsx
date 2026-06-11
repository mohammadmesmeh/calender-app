import { NavLink } from "react-router-dom";

export const NavigationMenuItem = ({ to, text, icon: Icon }) => {
  if (!Icon) return null;

  return (
    <li className="text-text hover:bg-primary-hover hover:shadow-md hover:text-white  rounded-xl  transition-all">
      <NavLink
        to={to}
        className={({ isActive }) =>
          ` px-1 md:px-4 font-bold text-lg py-2 flex rounded-xl justify-center md:justify-start items-center ${
            isActive ?  "bg-primary text-white" : ""
          }`
        }
      >
        <Icon size={20} className="inline-block md:mr-2  " />
        <p className="hidden group-hover:block md:block text-sm md:text-lg">{text}</p>
      </NavLink>
    </li>
  );
};
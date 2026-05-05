// import { ArrowLeft } from "lucide-react";
// BtnIconLeft
export const IconBtn = ({ icon: Icon, onClick, className = "" }) => {
    if (!Icon) return null;

    return (
        <button
            type="button"
            onClick={onClick}
            className={` 
        p-2
        rounded-lg
      bg-white
        border
      border-border
        shadow-sm
        :hover:shadow-md
      hover:bg-gray-50
        active:scale-95
        transition-all 
        duration-200
        ${className}`}
        >
            <Icon />
        </button>
    );
};
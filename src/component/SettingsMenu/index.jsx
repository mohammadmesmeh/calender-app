import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { SettingItem } from '../SettingItem'
import { SETTINGS_ITEMS } from '../../constants/const'
import {
    Bell,
    ChevronRight,
    CircleHelp,
    Languages,
    LogOut,
    Palette,
    Settings,
    ShieldCheck,
    User,
} from "lucide-react";


export const SettingsMenu = ({ isExpanded }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleItemClick = () => setIsOpen(false);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setIsOpen(false);
            navigate("/register");
        } catch (error) {
            console.error("Logout failed:", error);
            setErrorMessage("Unable to log out right now.");
        }
    };

    return (
        <li
            className="relative w-full overflow-visible"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            onFocus={() => setIsOpen(true)}
            onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                    setIsOpen(false);
                }
            }}
        >
            <button
                type="button"
                onClick={() => setIsOpen((value) => !value)}
                aria-haspopup="menu"
                aria-expanded={isOpen}
                className={`group flex w-full items-center rounded-2xl px-2 py-2 text-sm font-medium text-text-secondary transition-all duration-200 ease-out hover:bg-primary-light hover:text-primary ${isExpanded ? "justify-start" : "justify-center"
                    }`}
            >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-transparent transition-all duration-200 group-hover:bg-white/70">
                    <Settings size={18} />
                </span>
                <span
                    className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${isExpanded ? "ml-3 max-w-[10rem] opacity-100" : "ml-0 max-w-0 opacity-0"
                        }`}
                >
                    Settings
                </span>
                <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full text-text-muted transition-all duration-200">
                    <ChevronRight size={16} />
                </span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: -8, y: -4 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        exit={{ opacity: 0, x: -8, y: -4 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        role="menu"
                        aria-label="Settings submenu"
                        className="absolute left-full bottom-0  z-[70] ml-3 w-56 overflow-hidden rounded-2xl border border-border/70 bg-white p-2 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.35)]"
                    >
                        <ul className="space-y-1">
                            {SETTINGS_ITEMS.map((item) => (
                                <SettingItem
                                    key={item.label}
                                    item={item}
                                    Icon={item.icon}
                                    handleItemClick={handleItemClick}
                                />
                            ))}
                            <li role="none">
                                <button
                                    type="button"
                                    role="menuitem"
                                    onClick={handleLogout}
                                    className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-red-500 transition-colors duration-200 hover:bg-red-50"
                                >
                                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-50 text-red-500">
                                        <LogOut size={16} />
                                    </span>
                                    <span className="flex-1">Log Out</span>
                                </button>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>

            {errorMessage ? <p className="mt-2 text-xs text-red-500">{errorMessage}</p> : null}
        </li>
    );
};

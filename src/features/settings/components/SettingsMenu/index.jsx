import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SettingItem } from '../SettingItem'
import { SETTINGS_ITEMS } from '@/constants/const'
import { useTheme } from '../../context/ThemeContext/ThemeContext'
import { ThemePicker } from '../ThemePicker'
import { useAuth } from '../../../auth/hooks/useAuth'
import {
    ChevronRight,
    ChevronLeft,
    LogOut,
    Settings,
} from "lucide-react";
export const SettingsMenu = ({ isExpanded }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showThemePicker, setShowThemePicker] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const menuRef = useRef(null)
    const { theme, themes } = useTheme()
    const { signOut } = useAuth()
    const currentThemeLabel = themes.find((t) => t.id === theme)?.label

    const closeMenu = useCallback(() => {
        setIsOpen(false)
        setShowThemePicker(false)
        setErrorMessage("")
    }, [])

    useEffect(() => {
        if (!isOpen) return
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) closeMenu()
        }
        const handleEscape = (e) => {
            if (e.key === 'Escape') closeMenu()
        }
        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('keydown', handleEscape)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleEscape)
        }
    }, [isOpen, closeMenu])

    const handleItemClick = (label) => {
        if (label === 'Appearance') {
            setShowThemePicker(true)
        } else {
            setIsOpen(false)
        }
    }

    const handleBack = () => {
        setShowThemePicker(false)
    }

    const handleLogout = async () => {
        try {
            await signOut();
            setIsOpen(false);
        } catch (error) {
            console.error("Logout failed:", error);
            setErrorMessage("Unable to log out right now.");
        }
    };

    return (
        <li
            ref={menuRef}
            className="relative w-full"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => {
                setIsOpen(false)
                setShowThemePicker(false)
            }}
            onFocus={() => setIsOpen(true)}
        >
            <button
                type="button"
                onClick={() => setIsOpen((value) => !value)}
                aria-haspopup="menu"
                aria-expanded={isOpen}
                className={`flex w-full items-center rounded-card px-2 py-2 text-sm font-medium text-text-secondary transition-all duration-200 ease-out hover:bg-primary-light hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${isExpanded ? "justify-start" : "justify-center"
                    }`}
            >
                <span className="flex h-10 w-10 items-center justify-center rounded-button bg-transparent transition-all duration-200">
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
                        aria-label={showThemePicker ? "Theme selection" : "Settings submenu"}
                        className="max-md:fixed max-md:left-4 max-md:right-4 max-md:top-16 md:absolute md:left-full md:bottom-0 md:ml-3 z-50 max-md:w-[calc(100vw-2rem)] md:w-64 overflow-hidden rounded-card border border-border/70 bg-surface p-2 shadow-dropdown"
                    >
                        {showThemePicker ? (
                            <div className="space-y-2">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="flex items-center gap-1.5 text-xs font-medium text-text-muted hover:text-text transition-colors px-1 py-1"
                                >
                                    <ChevronLeft size={14} />
                                    Back to Settings
                                </button>
                                <ThemePicker />
                            </div>
                        ) : (
                            <ul className="space-y-1">
                                {SETTINGS_ITEMS.map((item) => (
                                    <SettingItem
                                        key={item.label}
                                        item={item}
                                        Icon={item.icon}
                                        handleItemClick={() => handleItemClick(item.label)}
                                        hint={item.label === 'Appearance' ? currentThemeLabel : undefined}
                                    />
                                ))}
                                <li role="none">
                                    <button
                                        type="button"
                                        role="menuitem"
                                        onClick={handleLogout}
                                        className="mt-1 flex w-full items-center gap-3 rounded-button px-3 py-2 text-left text-sm text-danger transition-colors duration-200 hover:bg-danger-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger/50"
                                    >
                                        <span className="flex h-8 w-8 items-center justify-center rounded-button bg-danger-light text-danger">
                                            <LogOut size={16} />
                                        </span>
                                        <span className="flex-1">Log Out</span>
                                    </button>
                                </li>
                            </ul>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {errorMessage ? <p className="mt-2 text-xs text-danger">{errorMessage}</p> : null}
        </li>
    );
};

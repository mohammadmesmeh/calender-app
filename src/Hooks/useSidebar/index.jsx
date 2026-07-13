import { useEffect, useState } from "react";

export const useSidebar = () => {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= 768 : true
  );

  const [hovered, setHovered] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 768;

      setIsDesktop(desktop);

      if (!desktop) {
        setHovered(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [mobileOpen]);

  const expanded = isDesktop ? hovered : mobileOpen;

  return {
    isDesktop,
    hovered,
    mobileOpen,
    expanded,
    setHovered,
    setMobileOpen,
  };
};
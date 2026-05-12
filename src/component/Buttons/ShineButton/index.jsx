import { motion } from "framer-motion";
export const ShineButton = ({ children, className }) => {
  return (
    <motion.button
      className={`relative px-8 py-2 rounded-xl h-12
        hover:bg-primary-hover hover:-translate-y-0.5
        hover:shadow-md active:scale-95
        transition-all duration-300 shadow-sm ${className}`}
      style={{ backgroundColor: "#3b82f6" }}
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
    >
      
      <span className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
        <motion.span
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, transparent 20%, #ffffff30 50%, transparent 80%)",
          }}
          variants={{
            hover: {
              x: ["-100%", "100%"],
              transition: { duration: 0.6, ease: "easeInOut" },
            },
          }}
         
          initial={{ x: "-100%" }}
        />
      </span>

      <span className="relative z-10 flex items-center gap-2 justify-center">
        {children}
      </span>
    </motion.button>
  );
};



import { motion, useReducedMotion } from "framer-motion";
export const ShineButton = ({ children, className }) => {
  const shouldReduce = useReducedMotion();
  const baseClass = `relative px-1 md:px-8 py-2 rounded-xl h-12 active:scale-95 shadow-sm ${className}`
  const shineVariants = {
    rest: { x: "-120%" },
    hover: { x: "120%" },
  };
  if (shouldReduce) {
    return (
      <button className={baseClass} style={{ backgroundColor: "#3b82f6" }}>
        <span className="relative z-10 flex items-center w-full md:gap-2 justify-center">{children}</span>
      </button>
    )
  }

  return (
    <motion.button
      className={`${baseClass} hover:shadow-md`}
      style={{ backgroundColor: "#3b82f6" }}
       initial="rest"
      animate="rest"
      whileHover="hover"
      whileTap={{ scale: 0.92 }}
      variants={{
        rest: {},
        hover: {},
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 20,
      }}
     
    
    >
      <span className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
        <motion.span
          className="absolute inset-0"
          style={{
            background: "linear-gradient(105deg, transparent 20%, #ffffff30 50%, transparent 80%)",
          }}
         
           variants={shineVariants}
    
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </span>

      <span className="relative z-10 flex items-center w-full md:gap-2 justify-center">{children}</span>
    </motion.button>
  );
};



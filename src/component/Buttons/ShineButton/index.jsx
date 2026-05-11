import { motion } from "framer-motion";

export const ShineButton = ({ children, className  }) => {
  return (

    <motion.button
      className={`relative px-8 py-2 rounded-xl overflow-hidden        hover:bg-primary-hover
  hover:-translate-y-0.5
  hover:shadow-md
      active:scale-95
      transition-all duration-300 shadow-sm ${className}  `}
      style={{ backgroundColor: "#3b82f6" }}
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
    >
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(105deg, transparent 20%, #ffffff30 50%, transparent 80%)",
        }}
        variants={{
          hover: {
            x: ["-100%", "100%"],
            transition: { duration: 0.6, ease: "easeInOut" }
          }
        }}
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
      />

      <span className={`relative z-10 flex items-center gap-2 justify-center `}>
        {children}
      </span>
    </motion.button>
  );
}


// export const AddButtons = ({ content, children,className }) => (

//     <button type="button"
//         className={`
//      flex
//      items-center gap-2
//       bg-primary
//        text-white
//       px-3 py-2
//       rounded-lg
//        hover:bg-primary-hover
//   hover:-translate-y-0.5
//   hover:shadow-md
//       active:scale-95
//       transition-all duration-300
//       shadow-sm  ${className} `}>
//         {children}
//         {content}
//     </button>

// )


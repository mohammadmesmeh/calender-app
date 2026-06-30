import { motion, useReducedMotion } from "framer-motion";

export const ShineButton = ({ children, className = "", isExpanded, icon: Icon }) => {
  // الـ hooks لازم تنفّذ دايمًا بنفس الترتيب، لهيك هي أول شي بالكومبوننت
  // قبل أي شرط return — حتى لو Icon مش موجود لسا.
  const shouldReduce = useReducedMotion();

  if (!Icon) return null;

  const shineVariants = {
    rest: { x: "-130%" },
    hover: { x: "130%" },
  };

  return (
    <motion.button
      type="button"
      className={`group relative h-12 overflow-hidden rounded-xl bg-primary px-4 text-white shadow-sm transition-shadow duration-200 hover:shadow-md active:scale-95 ${className}`}
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileTap={{ scale: 0.95 }}
    >
      {/* طبقة التلميعة: غير مرئية إذا المستخدم مفعّل "تقليل الحركة" */}
      {!shouldReduce && (
        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
          <motion.span
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.25) 50%, transparent 80%)",
            }}
            variants={shineVariants}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          />
        </span>
      )}

      {/*
        المحتوى الفعلي: flex بدون justify-center، لأنه لو حطينا justify-center
        هون، الأيقونة والنص بيتمركزوا "كمجموعة" بنص الزر، يعني لما الزر يكون
        ضيق (isExpanded = false) أو واسع، التمركز بيختلف بشكل غير متوقع.
        بدل هيك بنخلي الأيقونة دايمًا أول عنصر، والنص يجاورها مباشرة.
      */}
      <span className="relative z-10 flex h-full w-full items-center">
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all duration-200 ${
            isExpanded ? "mr-2" : "mr-0"
          }`}
        >
          {/*
            block بدل inline (الافتراضي لأي svg): يشيل المسافة البيضاء
            الزايدة تحت الأيقونة (ناتجة عن baseline الخط)، يلي كانت سبب
            رئيسي إنها تبين مش متمركزة عموديًا تمام جوه الـ h-9 w-9.
          */}
          <Icon size={18} className="block" />
        </span>

        {/*
          هاد span بيلف children (النص) ويتحكم بظهوره/اختفائه حسب
          isExpanded، نفس منطق باقي عناصر السايدبار (NavigationMenuItem).
          الفرق إن هون منطق الإخفاء/الإظهار موجود جوه الكومبوننت نفسه،
          مش لازم تكرره يدويًا بكل مكان بتستدعي فيه الزر.
        */}
        <span
          className={`overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-300 ${
            isExpanded ? "max-w-[10rem] opacity-100" : "max-w-0 opacity-0"
          }`}
        >
          {children}
        </span>
      </span>
    </motion.button>
  );
};
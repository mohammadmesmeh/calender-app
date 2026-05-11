export const AddButtons = ({ content, children,className }) => (

    <button type="button"
        className={`
     flex
     items-center gap-2
      bg-primary
       text-white
      px-3 py-2
      rounded-lg
       hover:bg-primary-hover
  hover:-translate-y-0.5
  hover:shadow-md
      active:scale-95
      transition-all duration-300
      shadow-sm  ${className} `}>
        {children}
        {content}
    </button>

)


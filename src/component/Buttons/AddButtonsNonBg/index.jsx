export const AddButtonsNonBg = ({ content, children, className }) => (

    <button type="button"
        className={`
      gap-2
     flex
      bg-transparent
       text-primary
      
  
 
      hover:-translate-y-0.5
      hover:shadow-md
      active:scale-95
      transition-all duration-300
      shadow-sm  ${className} `}>
        {children}
        {content}
    </button>

)

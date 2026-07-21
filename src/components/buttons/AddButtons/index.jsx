export const AddButtons = ({ content, children, className, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`
      flex items-center gap-2
      bg-primary text-white
      px-3 py-2
      rounded-button
      hover:bg-primary-hover
      hover:-translate-y-0.5
      hover:shadow-card
      active:scale-95
      transition-all duration-200
      shadow-subtle
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
      ${className}
    `}
  >
    {children}
    {content}
  </button>
)


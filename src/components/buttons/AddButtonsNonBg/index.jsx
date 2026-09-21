export const AddButtonsNonBg = ({ content, children, className, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`
      flex items-center gap-2
      bg-transparent text-primary
      rounded-button
      hover:-translate-y-0.5
      hover:shadow-card
      active:scale-95
      transition-all duration-200
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
      ${className}
    `}
  >
    {children}
    {content}
  </button>
)
export const IconBtn = ({ icon: Icon, onClick, className = "", "aria-label": ariaLabel }) => {
  if (!Icon) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`
        p-2
        rounded-icon
        bg-surface
        border
        border-border
        shadow-subtle
        hover:shadow-card
        hover:bg-background
        active:scale-95
        transition-all
        duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
        ${className}
      `}
    >
      <Icon size={16} />
    </button>
  );
};

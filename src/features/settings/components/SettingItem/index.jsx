export const SettingItem = ({ item, handleItemClick, Icon, hint }) => {
  if (!Icon) return null;

  return (
    <li role="none">
      <button
        type="button"
        role="menuitem"
        onClick={handleItemClick}
        className="flex w-full items-center gap-3 rounded-button px-3 py-2 text-left text-sm text-text-secondary transition-colors duration-200 hover:bg-primary-light hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-icon bg-secondary/10 text-primary">
          <Icon size={16} />
        </span>

        <span className="flex-1">{item.label}</span>

        {hint && (
          <span className="text-xs text-text-muted font-medium">{hint}</span>
        )}
      </button>
    </li>
  );
};

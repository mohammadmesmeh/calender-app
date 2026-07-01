export const SettingItem = ({ item, handleItemClick, Icon }) => {
  if (!Icon) return null;

  return (
    <li role="none">
      <button
        type="button"
        role="menuitem"
        onClick={() => handleItemClick(item)}
        className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-text-secondary transition-colors duration-200 hover:bg-primary-light hover:text-primary"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-secondary/10 text-primary">
          <Icon size={16} />
        </span>

        <span className="flex-1">{item.label}</span>
      </button>
    </li>
  );
};
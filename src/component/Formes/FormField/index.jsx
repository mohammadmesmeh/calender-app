export const FieldWrapper = ({ label, error, icon, children, htmlFor, required }) => {
  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="flex items-center gap-2 text-sm font-medium text-text">
        {icon}
        <span>{label}{required ? ' *' : ''}</span>
      </label>
      {children}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  )
}

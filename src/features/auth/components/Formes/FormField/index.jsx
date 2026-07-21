import { RequiredMark } from '@/components/ui/RequiredMark'

export const FieldWrapper = ({ label, error, icon, children, htmlFor, required }) => {
  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="flex items-center gap-2 text-sm font-medium text-text">
        {icon}
        <span>{label}{required ? <RequiredMark /> : null}</span>
      </label>
      {children}
      {error ? <p className="text-sm text-danger">{error}</p> : null}
    </div>
  )
}

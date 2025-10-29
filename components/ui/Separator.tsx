interface SeparatorProps {
  label?: string
}

export function Separator({ label = 'o' }: SeparatorProps) {
  return (
    <div className="flex items-center gap-3 my-4" role="separator" aria-label={label}>
      <div className="h-px flex-1 bg-white/20" />
      <span className="text-xs uppercase tracking-wider text-white/80 font-medium">
        {label}
      </span>
      <div className="h-px flex-1 bg-white/20" />
    </div>
  )
}

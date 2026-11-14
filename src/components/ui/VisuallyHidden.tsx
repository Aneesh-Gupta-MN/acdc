// VisuallyHidden provides screen-reader context for decorative visual regions without affecting layout.
export function VisuallyHidden({ children }: { children: React.ReactNode }) {
  return <span className="sr-only">{children}</span>;
}

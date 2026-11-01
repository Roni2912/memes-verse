export default function PageHeader({ eyebrow, title, description, children }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h1 className="text-3xl sm:text-4xl">{title}</h1>
        {description && <p className="mt-2 text-muted">{description}</p>}
      </div>
      {children}
    </div>
  );
}

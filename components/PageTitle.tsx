export default function PageTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="page-title">
      <div>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      <img src="/logo-embutidos.jpg" alt="Embutidos Rodríguez" />
    </header>
  );
}

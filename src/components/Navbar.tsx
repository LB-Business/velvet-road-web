import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";

const NAV = [
  { label: "Inicio", to: "/" as const, hash: undefined },
  { label: "Catálogo", to: "/catalogo" as const, hash: undefined },
  { label: "Nosotros", to: "/" as const, hash: "nosotros" },
  { label: "Servicios", to: "/" as const, hash: "servicios" },
  { label: "Ubicación", to: "/" as const, hash: "ubicacion" },
  { label: "Contacto", to: "/" as const, hash: "contacto" },
];

export function Navbar({ overlay = false }: { overlay?: boolean }) {
  return (
    <header className={overlay ? "relative z-20" : "relative z-20 border-b border-border/60 bg-background"}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10 lg:py-8">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Sanfilippo Exclusivos" className="h-14 w-14 rounded-full object-cover" />
        </Link>
        <nav className="hidden items-center gap-10 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              hash={n.hash}
              className="text-[11px] tracking-[0.22em] uppercase text-foreground/80 transition-colors hover:text-gold"
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: n.to === "/" && !n.hash }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

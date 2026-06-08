import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import { useCatalogData } from "@/hooks/useCatalogData";

type NavbarProps = {
  overlay?: boolean;
};

export function Navbar({ overlay = false }: NavbarProps) {
  const { data } = useCatalogData();

  const businessLogo = data?.business.logoUrl || logo;
  const businessName = data?.business.name || "Sanfilippo Exclusivos";

  return (
    <header
      className={`z-50 w-full ${
        overlay
          ? "absolute left-0 top-0 bg-transparent"
          : "relative border-b border-border/60 bg-background"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={businessLogo}
            alt={businessName}
            className="h-12 w-12 rounded-full object-cover"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="text-[11px] font-medium uppercase tracking-[0.22em] text-foreground/80 transition-colors hover:text-gold"
          >
            Inicio
          </Link>

          <Link
            to="/catalogo"
            className="text-[11px] font-medium uppercase tracking-[0.22em] text-foreground/80 transition-colors hover:text-gold"
          >
            Catálogo
          </Link>

          <Link
            to="/"
            hash="nosotros"
            className="text-[11px] font-medium uppercase tracking-[0.22em] text-foreground/80 transition-colors hover:text-gold"
          >
            Nosotros
          </Link>

          <Link
            to="/"
            hash="servicios"
            className="text-[11px] font-medium uppercase tracking-[0.22em] text-foreground/80 transition-colors hover:text-gold"
          >
            Servicios
          </Link>

          <Link
            to="/"
            hash="ubicacion"
            className="text-[11px] font-medium uppercase tracking-[0.22em] text-foreground/80 transition-colors hover:text-gold"
          >
            Ubicación
          </Link>

          <Link
            to="/"
            hash="contacto"
            className="text-[11px] font-medium uppercase tracking-[0.22em] text-foreground/80 transition-colors hover:text-gold"
          >
            Contacto
          </Link>
        </nav>
      </div>
    </header>
  );
}
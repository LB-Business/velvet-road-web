import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCatalogData } from "@/hooks/useCatalogData";
import { buildWhatsappHref, formatPrice } from "@/lib/vehicles";

export const Route = createFileRoute("/catalogo/$id")({
  component: VehicleDetailPage,
});

function VehicleDetailPage() {
  const { id } = Route.useParams();
  const { data, loading, error } = useCatalogData();

  const vehicle = data?.vehicles.find((v) => v.id === id || v.slug === id);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <p className="font-display text-3xl">Cargando vehículo...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <Link
            to="/catalogo"
            className="inline-flex items-center gap-2 text-sm text-gold hover:opacity-80"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al catálogo
          </Link>

          <div className="mt-12 border border-border/60 bg-surface p-12">
            <p className="font-display text-3xl">Vehículo no encontrado.</p>
            <p className="mt-3 text-sm text-muted-foreground">
              Puede que la unidad ya no esté publicada o que el enlace sea incorrecto.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const whatsappMessage = `Hola, quiero consultar por el vehículo ${vehicle.marca} ${vehicle.modelo} ${vehicle.version} ${vehicle.año}.`;
  const whatsappHref = buildWhatsappHref(data?.business.contactPhone, whatsappMessage);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <Link
          to="/catalogo"
          className="inline-flex items-center gap-2 text-sm text-gold transition-opacity hover:opacity-80"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al catálogo
        </Link>

        <section className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="overflow-hidden border border-border/60 bg-surface">
              <img
                src={vehicle.imagenPrincipal}
                alt={vehicle.name}
                className="h-[320px] w-full object-cover sm:h-[480px] lg:h-[560px]"
              />
            </div>

            {vehicle.imagenes.length > 1 && (
              <div className="mt-4 grid grid-cols-3 gap-4 sm:grid-cols-4">
                {vehicle.imagenes.slice(0, 8).map((img) => (
                  <div
                    key={img}
                    className="overflow-hidden border border-border/60 bg-surface"
                  >
                    <img
                      src={img}
                      alt={vehicle.name}
                      className="h-24 w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <aside className="border border-border/60 bg-surface p-8 lg:p-10">
            <p className="eyebrow">{vehicle.marca}</p>

            <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
              {vehicle.modelo} {vehicle.version}
            </h1>

            <p className="mt-4 text-xl text-gold">
              {formatPrice(vehicle)}
            </p>

            <div className="mt-8 grid gap-4 border-y border-border/60 py-8">
              <Detail label="Año" value={vehicle.año || "Consultar"} />
              <Detail
                label="Kilómetros"
                value={
                  vehicle.kilometros
                    ? `${vehicle.kilometros.toLocaleString("es-AR")} km`
                    : "Consultar"
                }
              />
              <Detail label="Transmisión" value={vehicle.transmision || "Consultar"} />
              <Detail label="Combustible" value={vehicle.combustible || "Consultar"} />
              <Detail label="Color" value={vehicle.color || "Consultar"} />
              <Detail label="Patente" value={vehicle.patente || "Consultar"} />
            </div>

            {vehicle.descripcion && (
              <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
                {vehicle.descripcion}
              </p>
            )}

            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex w-full items-center justify-center gap-3 bg-gold px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-black shadow-[var(--shadow-gold)] transition-transform hover:-translate-y-0.5 hover:bg-gold/90"
            >
              <MessageCircle className="h-4 w-4" />
              Consultar por WhatsApp
            </a>
          </aside>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between gap-6">
      <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </span>
      <span className="text-sm text-foreground">{value}</span>
    </div>
  );
}
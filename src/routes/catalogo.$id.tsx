import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
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

  const gallery = useMemo(() => {
    if (!vehicle) return [];

    const images = [
      vehicle.imagenPrincipal,
      ...(vehicle.imagenes ?? []),
    ].filter((img): img is string => Boolean(img));

    return [...new Set(images)];
  }, [vehicle]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setSelectedIndex(0);
  }, [vehicle?.id]);

  const selectedImage =
    gallery[selectedIndex] || vehicle?.imagenPrincipal || "/placeholder-car.jpg";

  const hasMultipleImages = gallery.length > 1;

  const goPrev = () => {
    if (!hasMultipleImages) return;

    setSelectedIndex((current) =>
      current === 0 ? gallery.length - 1 : current - 1,
    );
  };

  const goNext = () => {
    if (!hasMultipleImages) return;

    setSelectedIndex((current) =>
      current === gallery.length - 1 ? 0 : current + 1,
    );
  };

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
            <div className="group relative overflow-hidden border border-border/60 bg-surface">
              <img
                src={selectedImage}
                alt={vehicle.name}
                className="h-[320px] w-full object-cover sm:h-[480px] lg:h-[560px]"
              />

              {hasMultipleImages && (
                <>
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label="Imagen anterior"
                    className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold/50 bg-black/55 text-gold backdrop-blur-sm transition-all hover:bg-gold hover:text-black"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  <button
                    type="button"
                    onClick={goNext}
                    aria-label="Imagen siguiente"
                    className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold/50 bg-black/55 text-gold backdrop-blur-sm transition-all hover:bg-gold hover:text-black"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>

                  <div className="absolute bottom-4 right-4 rounded-full border border-gold/40 bg-black/60 px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                    {selectedIndex + 1} / {gallery.length}
                  </div>
                </>
              )}
            </div>

            {gallery.length > 1 && (
              <div className="mt-4 grid grid-cols-3 gap-4 sm:grid-cols-4">
                {gallery.map((img, index) => (
                  <button
                    type="button"
                    key={`${img}-${index}`}
                    onClick={() => setSelectedIndex(index)}
                    className={`overflow-hidden border bg-surface transition-all ${selectedIndex === index
                        ? "border-gold opacity-100"
                        : "border-border/60 opacity-60 hover:border-gold/60 hover:opacity-100"
                      }`}
                  >
                    <img
                      src={img}
                      alt={`${vehicle.name} imagen ${index + 1}`}
                      className="h-24 w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <aside className="border border-border/60 bg-surface p-8 lg:p-10">
            <p className="eyebrow">{vehicle.marca}</p>

            <h1 className="mt-4 font-display text-4xl font-medium leading-tight tracking-[-0.04em] sm:text-5xl">
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
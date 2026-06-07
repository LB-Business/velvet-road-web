import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, MessageCircle, Gauge, Fuel, Cog, Settings2, Calendar, BadgeCheck } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getVehicleById, formatKm, formatPrice, whatsappLinkForVehicle } from "@/lib/vehicles";

export const Route = createFileRoute("/catalogo/$id")({
  loader: ({ params }) => {
    const v = getVehicleById(params.id);
    if (!v) throw notFound();
    return v;
  },
  component: VehicleDetail,
  notFoundComponent: () => (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="font-display text-4xl">Vehículo no encontrado</h1>
        <Link to="/catalogo" className="mt-8 inline-flex items-center gap-2 text-gold hover:gap-3 transition-all">
          <ArrowLeft className="h-4 w-4" /> Volver al catálogo
        </Link>
      </div>
      <Footer />
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
      <p className="text-sm text-muted-foreground">{error.message}</p>
    </div>
  ),
});

function VehicleDetail() {
  const v = Route.useLoaderData();
  const [active, setActive] = useState(0);
  const imgs = v.imagenes.length ? v.imagenes : [v.imagenPrincipal];

  const specs = [
    { icon: Calendar, label: "Año", value: String(v.año) },
    { icon: Gauge, label: "Kilómetros", value: formatKm(v.kilometros) },
    { icon: Cog, label: "Motor", value: v.motor },
    { icon: Settings2, label: "Transmisión", value: v.transmision },
    { icon: Fuel, label: "Combustible", value: v.combustible },
    { icon: Settings2, label: "Tracción", value: v.traccion },
    { icon: BadgeCheck, label: "Estado", value: v.estado },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
        <Link to="/catalogo" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold hover:gap-3 transition-all">
          <ArrowLeft className="h-4 w-4" /> Volver al catálogo
        </Link>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          {/* Gallery */}
          <div>
            <div className="relative aspect-[4/3] overflow-hidden border border-border/60 bg-surface">
              <img src={imgs[active]} alt={`${v.marca} ${v.modelo}`} className="h-full w-full object-cover" />
              <span className="absolute bottom-4 left-4 bg-background/80 px-3 py-1 text-[10px] tracking-[0.2em] text-gold">{v.año}</span>
            </div>
            {imgs.length > 1 && (
              <div className="mt-4 grid grid-cols-5 gap-3">
                {imgs.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`aspect-[4/3] overflow-hidden border ${i === active ? "border-gold" : "border-border/60"} transition-colors`}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <p className="eyebrow">{v.marca}</p>
            <h1 className="mt-3 font-display text-4xl sm:text-5xl leading-tight">
              {v.modelo}
            </h1>
            <p className="mt-2 text-lg text-foreground/70">{v.version} · {v.año}</p>

            <div className="mt-8 border-y border-border/60 py-6">
              <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Precio</p>
              <p className="mt-2 font-display text-3xl text-gold">{formatPrice(v)}</p>
            </div>

            <a
              href={whatsappLinkForVehicle(v)}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex w-full items-center justify-center gap-3 bg-[var(--gradient-gold)] px-6 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-primary-foreground shadow-[var(--shadow-gold)] transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="h-4 w-4" /> Consultar por WhatsApp
            </a>

            <dl className="mt-10 grid grid-cols-2 gap-6">
              {specs.map((s) => (
                <div key={s.label} className="flex items-start gap-3">
                  <s.icon className="mt-0.5 h-5 w-5 text-gold" strokeWidth={1.2} />
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{s.label}</dt>
                    <dd className="mt-1 text-sm text-foreground">{s.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Description */}
        <div className="mt-16 border-t border-border/60 pt-12">
          <p className="eyebrow">Descripción</p>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">{v.descripcion}</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

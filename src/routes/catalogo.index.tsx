import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { VehicleCard } from "@/components/VehicleCard";
import { VEHICLES } from "@/lib/vehicles";

export const Route = createFileRoute("/catalogo/")({
  component: CatalogoPage,
});

type SortKey = "recent" | "price-asc" | "price-desc" | "km-asc" | "year-desc";

const EMPTY_FILTERS = {
  q: "",
  marca: "",
  modelo: "",
  yearFrom: "",
  yearTo: "",
  priceMin: "",
  priceMax: "",
  kmMax: "",
  combustible: "",
  transmision: "",
  traccion: "",
  estado: "",
  sort: "recent" as SortKey,
};

function CatalogoPage() {
  const [f, setF] = useState(EMPTY_FILTERS);

  const marcas = useMemo(() => [...new Set(VEHICLES.map((v) => v.marca))].sort(), []);
  const modelos = useMemo(
    () => [...new Set(VEHICLES.filter((v) => !f.marca || v.marca === f.marca).map((v) => v.modelo))].sort(),
    [f.marca],
  );

  const results = useMemo(() => {
    const q = f.q.trim().toLowerCase();
    let list = VEHICLES.filter((v) => {
      if (q) {
        const hay = `${v.marca} ${v.modelo} ${v.version} ${v.descripcion}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (f.marca && v.marca !== f.marca) return false;
      if (f.modelo && v.modelo !== f.modelo) return false;
      if (f.yearFrom && v.año < +f.yearFrom) return false;
      if (f.yearTo && v.año > +f.yearTo) return false;
      if (f.priceMin && (v.precio ?? 0) < +f.priceMin) return false;
      if (f.priceMax && (v.precio ?? Infinity) > +f.priceMax) return false;
      if (f.kmMax && v.kilometros > +f.kmMax) return false;
      if (f.combustible && v.combustible !== f.combustible) return false;
      if (f.transmision && v.transmision !== f.transmision) return false;
      if (f.traccion && v.traccion !== f.traccion) return false;
      if (f.estado && v.estado !== f.estado) return false;
      return true;
    });
    list = [...list].sort((a, b) => {
      switch (f.sort) {
        case "price-asc": return (a.precio ?? Infinity) - (b.precio ?? Infinity);
        case "price-desc": return (b.precio ?? -1) - (a.precio ?? -1);
        case "km-asc": return a.kilometros - b.kilometros;
        case "year-desc": return b.año - a.año;
        default: return a.createdAt < b.createdAt ? 1 : -1;
      }
    });
    return list;
  }, [f]);

  const update = <K extends keyof typeof f>(k: K, v: (typeof f)[K]) => setF((p) => ({ ...p, [k]: v }));
  const clear = () => setF(EMPTY_FILTERS);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <p className="eyebrow">Nuestro inventario</p>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl">Catálogo de unidades</h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Explorá nuestra selección de vehículos exclusivos disponibles.
        </p>

        {/* Search */}
        <div className="mt-10 relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" />
          <input
            value={f.q}
            onChange={(e) => update("q", e.target.value)}
            placeholder="Buscar por marca, modelo, versión o palabra clave"
            className="w-full border border-border/60 bg-surface px-12 py-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/60 focus:outline-none"
          />
        </div>

        {/* Filters */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Select label="Marca" value={f.marca} onChange={(v) => { update("marca", v); update("modelo", ""); }} options={marcas} />
          <Select label="Modelo" value={f.modelo} onChange={(v) => update("modelo", v)} options={modelos} />
          <Input label="Año desde" type="number" value={f.yearFrom} onChange={(v) => update("yearFrom", v)} />
          <Input label="Año hasta" type="number" value={f.yearTo} onChange={(v) => update("yearTo", v)} />
          <Input label="Precio mín. (USD)" type="number" value={f.priceMin} onChange={(v) => update("priceMin", v)} />
          <Input label="Precio máx. (USD)" type="number" value={f.priceMax} onChange={(v) => update("priceMax", v)} />
          <Input label="Km máximos" type="number" value={f.kmMax} onChange={(v) => update("kmMax", v)} />
          <Select label="Combustible" value={f.combustible} onChange={(v) => update("combustible", v)} options={["Nafta", "Diésel", "Híbrido", "Eléctrico"]} />
          <Select label="Transmisión" value={f.transmision} onChange={(v) => update("transmision", v)} options={["Automática", "Manual", "Secuencial"]} />
          <Select label="Tracción" value={f.traccion} onChange={(v) => update("traccion", v)} options={["4x2", "4x4", "AWD"]} />
          <Select label="Estado" value={f.estado} onChange={(v) => update("estado", v)} options={["0 KM", "Seminuevo", "Usado"]} />
          <Select
            label="Ordenar por"
            value={f.sort}
            onChange={(v) => update("sort", v as SortKey)}
            options={[
              { value: "recent", label: "Más recientes" },
              { value: "price-asc", label: "Menor precio" },
              { value: "price-desc", label: "Mayor precio" },
              { value: "km-asc", label: "Menor kilometraje" },
              { value: "year-desc", label: "Año más nuevo" },
            ]}
            allowEmpty={false}
          />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
            Mostrando {results.length} {results.length === 1 ? "unidad" : "unidades"}
          </p>
          <button
            onClick={clear}
            className="inline-flex items-center gap-2 border border-gold/60 px-5 py-2.5 text-[11px] uppercase tracking-[0.22em] text-gold transition-colors hover:bg-gold/10"
          >
            <X className="h-3.5 w-3.5" /> Limpiar filtros
          </button>
        </div>

        {/* Grid */}
        {results.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {results.map((v) => <VehicleCard key={v.id} v={v} />)}
          </div>
        ) : (
          <div className="mt-16 border border-border/60 bg-surface p-16 text-center">
            <p className="font-display text-2xl">No encontramos unidades con esos filtros.</p>
            <p className="mt-3 text-sm text-muted-foreground">Probá ajustar la búsqueda o limpiar los filtros.</p>
            <button
              onClick={clear}
              className="mt-8 inline-flex items-center gap-2 border border-gold/60 px-6 py-3 text-[11px] uppercase tracking-[0.22em] text-gold transition-colors hover:bg-gold/10"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

function Input({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-[0.22em] text-muted-foreground mb-2">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-border/60 bg-surface px-4 py-3 text-sm text-foreground focus:border-gold/60 focus:outline-none"
      />
    </label>
  );
}

type Opt = string | { value: string; label: string };
function Select({ label, value, onChange, options, allowEmpty = true }: { label: string; value: string; onChange: (v: string) => void; options: Opt[]; allowEmpty?: boolean }) {
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-[0.22em] text-muted-foreground mb-2">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-border/60 bg-surface px-4 py-3 text-sm text-foreground focus:border-gold/60 focus:outline-none"
      >
        {allowEmpty && <option value="">Todos</option>}
        {options.map((o) => {
          const val = typeof o === "string" ? o : o.value;
          const lab = typeof o === "string" ? o : o.label;
          return <option key={val} value={val}>{lab}</option>;
        })}
      </select>
    </label>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { VehicleCard } from "@/components/VehicleCard";
import { useCatalogData } from "@/hooks/useCatalogData";

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
  kmMax: "",
  transmision: "",
  sort: "recent" as SortKey,
};

function CatalogoPage() {
  const { data, loading, error } = useCatalogData();
  const vehicles = data?.vehicles ?? [];

  const [f, setF] = useState(EMPTY_FILTERS);

  const marcas = useMemo(() => {
    return [...new Set(vehicles.map((v) => v.marca).filter(Boolean))].sort();
  }, [vehicles]);

  const modelos = useMemo(() => {
    return [
      ...new Set(
        vehicles
          .filter((v) => !f.marca || v.marca === f.marca)
          .map((v) => v.modelo)
          .filter(Boolean),
      ),
    ].sort();
  }, [vehicles, f.marca]);

  const transmisiones = useMemo(() => {
    return [...new Set(vehicles.map((v) => v.transmision).filter(Boolean))].sort();
  }, [vehicles]);

  const results = useMemo(() => {
    const q = f.q.trim().toLowerCase();

    let list = vehicles.filter((v) => {
      if (q) {
        const hay = `${v.marca} ${v.modelo} ${v.version} ${v.descripcion} ${v.name}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }

      if (f.marca && v.marca !== f.marca) return false;
      if (f.modelo && v.modelo !== f.modelo) return false;
      if (f.yearFrom && v.año < Number(f.yearFrom)) return false;
      if (f.yearTo && v.año > Number(f.yearTo)) return false;
      if (f.kmMax && v.kilometros > Number(f.kmMax)) return false;
      if (f.transmision && v.transmision !== f.transmision) return false;

      return true;
    });

    list = [...list].sort((a, b) => {
      switch (f.sort) {
        case "price-asc":
          return (a.precio ?? Infinity) - (b.precio ?? Infinity);
        case "price-desc":
          return (b.precio ?? -1) - (a.precio ?? -1);
        case "km-asc":
          return a.kilometros - b.kilometros;
        case "year-desc":
          return b.año - a.año;
        default:
          return a.createdAt < b.createdAt ? 1 : -1;
      }
    });

    return list;
  }, [vehicles, f]);

  const update = <K extends keyof typeof f>(k: K, v: (typeof f)[K]) => {
    setF((p) => ({ ...p, [k]: v }));
  };

  const clear = () => setF(EMPTY_FILTERS);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <p className="eyebrow">Nuestro inventario</p>

        <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl">
          Catálogo de unidades
        </h1>

        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Explorá nuestra selección de vehículos exclusivos disponibles.
        </p>

        <div className="relative mt-10">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" />

          <input
            value={f.q}
            onChange={(e) => update("q", e.target.value)}
            placeholder="Buscar por marca, modelo, versión o palabra clave"
            className="w-full border border-border/60 bg-surface px-12 py-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/60 focus:outline-none"
          />
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Select
            label="Marca"
            value={f.marca}
            onChange={(v) => {
              update("marca", v);
              update("modelo", "");
            }}
            options={marcas}
          />

          <Select
            label="Modelo"
            value={f.modelo}
            onChange={(v) => update("modelo", v)}
            options={modelos}
          />

          <Input
            label="Año desde"
            type="number"
            value={f.yearFrom}
            onChange={(v) => update("yearFrom", v)}
          />

          <Input
            label="Año hasta"
            type="number"
            value={f.yearTo}
            onChange={(v) => update("yearTo", v)}
          />

          <Input
            label="Km máximos"
            type="number"
            value={f.kmMax}
            onChange={(v) => update("kmMax", v)}
          />

          <Select
            label="Transmisión"
            value={f.transmision}
            onChange={(v) => update("transmision", v)}
            options={transmisiones}
          />

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
            <X className="h-3.5 w-3.5" />
            Limpiar filtros
          </button>
        </div>

        {loading ? (
          <div className="mt-16 border border-border/60 bg-surface p-16 text-center">
            <p className="font-display text-2xl">Cargando catálogo...</p>
          </div>
        ) : error ? (
          <div className="mt-16 border border-border/60 bg-surface p-16 text-center">
            <p className="font-display text-2xl">No se pudo cargar el catálogo.</p>
            <p className="mt-3 text-sm text-muted-foreground">{error}</p>
          </div>
        ) : results.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {results.map((v) => (
              <VehicleCard key={v.id} v={v} />
            ))}
          </div>
        ) : (
          <div className="mt-16 border border-border/60 bg-surface p-16 text-center">
            <p className="font-display text-2xl">
              No encontramos unidades con esos filtros.
            </p>

            <p className="mt-3 text-sm text-muted-foreground">
              Probá ajustar la búsqueda o limpiar los filtros.
            </p>

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

function Input({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </span>

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

function Select({
  label,
  value,
  onChange,
  options,
  allowEmpty = true,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: Opt[];
  allowEmpty?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </span>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-border/60 bg-surface px-4 py-3 text-sm text-foreground focus:border-gold/60 focus:outline-none"
      >
        {allowEmpty && <option value="">Todos</option>}

        {options.map((o) => {
          const val = typeof o === "string" ? o : o.value;
          const lab = typeof o === "string" ? o : o.label;

          return (
            <option key={val} value={val}>
              {lab}
            </option>
          );
        })}
      </select>
    </label>
  );
}
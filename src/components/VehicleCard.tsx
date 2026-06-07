import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { formatKm, formatPrice, type Vehicle } from "@/lib/vehicles";

export function VehicleCard({ v }: { v: Vehicle }) {
  return (
    <Link
      to="/catalogo/$id"
      params={{ id: v.id }}
      className="group block border border-border/60 bg-surface overflow-hidden transition-all hover:border-gold/60 hover:shadow-[0_20px_60px_-20px_oklch(0.78_0.13_80/0.25)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={v.imagenPrincipal}
          alt={`${v.marca} ${v.modelo} ${v.version}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute bottom-4 left-4 bg-background/80 px-3 py-1 text-[10px] tracking-[0.2em] text-gold">
          {v.año}
        </span>
      </div>
      <div className="p-6">
        <h3 className="font-display text-2xl leading-tight">
          {v.marca} {v.modelo}
        </h3>
        <p className="mt-1 text-sm text-foreground/70">{v.version}</p>
        <p className="mt-3 text-xs tracking-wider text-muted-foreground">
          {formatKm(v.kilometros)} · {v.motor}
        </p>
        <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-5">
          <span className="text-sm text-gold">{formatPrice(v)}</span>
          <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-foreground/80">
            Ver detalles
            <ArrowUpRight className="h-4 w-4 text-gold transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}

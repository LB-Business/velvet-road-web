import car1 from "@/assets/car-1.jpg";
import car2 from "@/assets/car-2.jpg";
import car3 from "@/assets/car-3.jpg";

export type Vehicle = {
  id: string;
  marca: string;
  modelo: string;
  version: string;
  año: number;
  kilometros: number;
  precio: number | null;
  moneda: "USD" | "ARS";
  imagenPrincipal: string;
  imagenes: string[];
  descripcion: string;
  combustible: "Nafta" | "Diésel" | "Híbrido" | "Eléctrico";
  transmision: "Automática" | "Manual" | "Secuencial";
  motor: string;
  traccion: "4x2" | "4x4" | "AWD";
  estado: "Usado" | "0 KM" | "Seminuevo";
  destacado: boolean;
  createdAt: string;
};

export const VEHICLES: Vehicle[] = [
  {
    id: "can-am-maverick-x3-2023",
    marca: "Can-Am",
    modelo: "Maverick X3",
    version: "Turbo RR",
    año: 2023,
    kilometros: 1000,
    precio: null,
    moneda: "USD",
    imagenPrincipal: car1,
    imagenes: [car1],
    descripcion: "Unidad impecable, lista para entregar. Mantenimiento al día.",
    combustible: "Nafta",
    transmision: "Secuencial",
    motor: "900cc Turbo · 195 HP",
    traccion: "4x4",
    estado: "Seminuevo",
    destacado: true,
    createdAt: "2026-05-20",
  },
  {
    id: "audi-a5-sportback-2021",
    marca: "Audi",
    modelo: "A5 Sportback",
    version: "S Line",
    año: 2021,
    kilometros: 28000,
    precio: 48500,
    moneda: "USD",
    imagenPrincipal: car2,
    imagenes: [car2],
    descripcion: "Audi A5 Sportback S Line en estado excepcional. Service oficial.",
    combustible: "Nafta",
    transmision: "Automática",
    motor: "2.0 TFSI · 190 HP",
    traccion: "4x2",
    estado: "Usado",
    destacado: true,
    createdAt: "2026-05-15",
  },
  {
    id: "ford-f150-raptor-2022",
    marca: "Ford",
    modelo: "F-150",
    version: "Raptor",
    año: 2022,
    kilometros: 15000,
    precio: 95000,
    moneda: "USD",
    imagenPrincipal: car3,
    imagenes: [car3],
    descripcion: "Ford F-150 Raptor. Equipamiento full, unidad de colección.",
    combustible: "Nafta",
    transmision: "Automática",
    motor: "3.5 V6 EcoBoost · 450 HP",
    traccion: "4x4",
    estado: "Seminuevo",
    destacado: true,
    createdAt: "2026-05-10",
  },
];

export function getLatestVehicles(limit = 6): Vehicle[] {
  return [...VEHICLES]
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .slice(0, limit);
}

export function getVehicleById(id: string): Vehicle | undefined {
  return VEHICLES.find((v) => v.id === id);
}

export function formatPrice(v: Vehicle): string {
  if (v.precio == null) return "Consultar";
  const formatted = new Intl.NumberFormat("es-AR").format(v.precio);
  return v.moneda === "USD" ? `US$ ${formatted}` : `$ ${formatted}`;
}

export function formatKm(km: number): string {
  return `${new Intl.NumberFormat("es-AR").format(km)} km`;
}

export const WHATSAPP_NUMBER = "541136855346";
export const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_NUMBER}`;

export function whatsappLinkForVehicle(v: Vehicle): string {
  const text = `Hola, quiero consultar por el vehículo ${v.marca} ${v.modelo} ${v.version} ${v.año}.`;
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(text)}`;
}

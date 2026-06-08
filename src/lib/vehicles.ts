const API_URL =
  "https://api.lbcodeworks.com.ar/api/public/sanfilippoexclusivos/products";

const FALLBACK_WHATSAPP_NUMBER = "1136855346";
const FALLBACK_WHATSAPP_DISPLAY = "11 3685-5346";

export const WHATSAPP_BASE = buildWhatsappHref();

export type PublicBusiness = {
  id: string;
  name: string;
  slug: string;
  logoUrl: string | null;
  contactPhone: string | null;
  publicEmail: string | null;
};

export type PublicProduct = {
  id: string;
  businessId: string;
  name: string;
  slug: string;
  productType: string;
  description: string;
  salePrice: number | null;
  currency: string;
  stock: number;
  category: string;
  tags: string[];
  coverImage?: {
    url: string;
    publicId: string;
    order: number;
    isCover: boolean;
  } | null;
  images: {
    url: string;
    publicId: string;
    order: number;
    isCover: boolean;
  }[];
  variants: unknown[];
  documents: unknown[];
  vehicleDetails?: {
    brand?: string;
    model?: string;
    version?: string;
    year?: number;
    kms?: number;
    fuelType?: string;
    transmission?: string;
    color?: string;
    plate?: string;
  } | null;
  ownership?: unknown;
  status: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Vehicle = {
  id: string;
  slug: string;
  name: string;
  marca: string;
  modelo: string;
  version: string;
  año: number;
  kilometros: number;
  precio: number | null;
  moneda: string;
  imagenPrincipal: string;
  imagenes: string[];
  descripcion: string;
  combustible: string;
  transmision: string;
  color: string;
  patente: string;
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

export type PublicCatalogResponse = {
  business: PublicBusiness;
  products: PublicProduct[];
};

export type CatalogData = {
  business: PublicBusiness;
  products: PublicProduct[];
  vehicles: Vehicle[];
  whatsappHref: string;
  whatsappDisplay: string;
};

let catalogCache: Promise<CatalogData> | null = null;

export function buildWhatsappHref(phone?: string | null, message?: string) {
  const raw = phone || FALLBACK_WHATSAPP_NUMBER;
  const digits = raw.replace(/\D/g, "");
  const withCountry = digits.startsWith("54") ? digits : `54${digits}`;
  const text = message ? `?text=${encodeURIComponent(message)}` : "";

  return `https://wa.me/${withCountry}${text}`;
}

export function formatWhatsappDisplay(phone?: string | null) {
  if (!phone) return FALLBACK_WHATSAPP_DISPLAY;

  const digits = phone.replace(/\D/g, "");

  if (digits.startsWith("54911")) {
    return `11 ${digits.slice(5, 9)}-${digits.slice(9)}`;
  }

  if (digits.startsWith("5411")) {
    return `11 ${digits.slice(4, 8)}-${digits.slice(8)}`;
  }

  if (digits.startsWith("11")) {
    return `11 ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }

  return phone;
}

function productToVehicle(product: PublicProduct): Vehicle {
  const details = product.vehicleDetails || {};

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    marca: details.brand || "",
    modelo: details.model || "",
    version: details.version || "",
    año: details.year || 0,
    kilometros: details.kms || 0,
    precio: product.salePrice ?? null,
    moneda: product.currency || "ARS",
    imagenPrincipal:
      product.coverImage?.url ||
      product.images?.[0]?.url ||
      "/placeholder-car.jpg",
    imagenes: product.images?.map((img) => img.url) || [],
    descripcion: product.description || "",
    combustible: details.fuelType || "",
    transmision: details.transmission || "",
    color: details.color || "",
    patente: details.plate || "",
    category: product.category || "",
    tags: product.tags || [],
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
}

export async function fetchCatalogData(): Promise<CatalogData> {
  if (catalogCache) return catalogCache;

  catalogCache = fetch(API_URL)
    .then(async (res) => {
      if (!res.ok) {
        throw new Error("No se pudo cargar el catálogo.");
      }

      const data = (await res.json()) as PublicCatalogResponse;

      const products = data.products.filter(
        (p) =>
          p.isPublished &&
          p.status === "published" &&
          p.productType === "auto",
      );

      const vehicles = products
        .map(productToVehicle)
        .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

      return {
        business: data.business,
        products,
        vehicles,
        whatsappHref: buildWhatsappHref(data.business.contactPhone),
        whatsappDisplay: formatWhatsappDisplay(data.business.contactPhone),
      };
    })
    .catch((err) => {
      catalogCache = null;
      throw err;
    });

  return catalogCache;
}

export function getLatestVehicles(vehicles: Vehicle[], limit = 6) {
  return [...vehicles]
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .slice(0, limit);
}

export function formatPrice(vehicle: Vehicle) {
  if (!vehicle.precio) return "Consultar";

  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: vehicle.moneda || "ARS",
    maximumFractionDigits: 0,
  }).format(vehicle.precio);
}

export function formatKm(km?: number | null) {
  if (km === null || km === undefined) return "Consultar";

  return `${new Intl.NumberFormat("es-AR").format(km)} km`;
}

export function getVehicleWhatsappLink(vehicle: Vehicle) {
  const message = `Hola, quiero consultar por el vehículo ${vehicle.marca} ${vehicle.modelo} ${vehicle.version} ${vehicle.año}.`;

  return buildWhatsappHref(null, message);
}
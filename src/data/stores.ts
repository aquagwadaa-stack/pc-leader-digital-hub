export type StoreId = "jarry" | "dothemare" | "lemoule";

export interface Store {
  id: StoreId;
  name: string;
  shortName: string;
  city: string;
  address: string;
  postalCode: string;
  phone: string;
  hours: { label: string; value: string }[];
  hasSav: boolean;
}

export const stores: Store[] = [
  {
    id: "jarry",
    name: "PC Leader Jarry",
    shortName: "Jarry",
    city: "Baie-Mahault",
    address: "42 rue de l'Industrie prolongée, Z.I. Jarry",
    postalCode: "97122",
    phone: "05 90 32 63 63",
    hours: [
      { label: "Boutique - Lun. au ven.", value: "8h30 – 17h30" },
      { label: "Boutique - Samedi", value: "9h00 – 12h30" },
      { label: "SAV - Lun. au ven.", value: "8h30 – 14h00" },
      { label: "SAV - Samedi", value: "9h00 – 12h30" },
    ],
    hasSav: true,
  },
  {
    id: "dothemare",
    name: "PC Leader Dothémare",
    shortName: "Dothémare",
    city: "Les Abymes",
    address: "C.C. La Coulée Verte, ZAC Dothémare",
    postalCode: "97139",
    phone: "05 90 32 63 63",
    hours: [{ label: "Lun. au sam.", value: "9h00 – 18h30" }],
    hasSav: false,
  },
  {
    id: "lemoule",
    name: "PC Leader Le Moule",
    shortName: "Le Moule",
    city: "Le Moule",
    address: "ZAC de Damencourt",
    postalCode: "97160",
    phone: "05 90 32 63 63",
    hours: [{ label: "Lun. au sam.", value: "9h00 – 18h30" }],
    hasSav: false,
  },
];

export const getStore = (id: StoreId) => stores.find((s) => s.id === id)!;

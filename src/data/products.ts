import type { StoreId } from "./stores";

export type CategoryId =
  | "apple"
  | "portables"
  | "bureau"
  | "smartphones"
  | "tablettes"
  | "ecrans"
  | "imprimantes"
  | "consoles"
  | "accessoires"
  | "stockage"
  | "reseau"
  | "logiciels"
  | "encres"
  | "pieces"
  | "videoprojecteurs";

export interface Category {
  id: CategoryId;
  name: string;
  icon: string;
}

export const categories: Category[] = [
  { id: "apple", name: "Produits Apple", icon: "Apple" },
  { id: "portables", name: "Portables PC", icon: "Laptop" },
  { id: "bureau", name: "Ordinateurs PC", icon: "Monitor" },
  { id: "smartphones", name: "Téléphones", icon: "Smartphone" },
  { id: "tablettes", name: "Tablettes PC", icon: "Tablet" },
  { id: "ecrans", name: "Ecrans", icon: "MonitorSmartphone" },
  { id: "imprimantes", name: "Imprimantes", icon: "Printer" },
  { id: "consoles", name: "Consoles & Jeux", icon: "Gamepad2" },
  { id: "accessoires", name: "Accessoires - Housses", icon: "Mouse" },
  { id: "stockage", name: "Stockage externe", icon: "HardDrive" },
  { id: "reseau", name: "Réseau", icon: "Wifi" },
  { id: "logiciels", name: "Logiciels", icon: "AppWindow" },
  { id: "encres", name: "Encres & Toners", icon: "Droplet" },
  { id: "pieces", name: "Pièces détachées", icon: "Cpu" },
  { id: "videoprojecteurs", name: "Vidéoprojecteurs", icon: "Projector" },
];

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: CategoryId;
  price: number | null; // null => "Nous consulter"
  oldPrice?: number;
  image: string;
  shortSpecs: string[];
  description: string;
  specs: { label: string; value: string }[];
  stock: Record<StoreId, number>;
  popular?: boolean;
  isNew?: boolean;
}

const img = (q: string) => `https://images.unsplash.com/${q}?auto=format&fit=crop&w=800&q=80`;

export const products: Product[] = [
  {
    id: "macbook-air-m3",
    name: 'MacBook Air 13" M3',
    brand: "Apple",
    category: "apple",
    price: 1399,
    image: img("photo-1517336714731-489689fd1ca8"),
    shortSpecs: ["Puce M3", "16 Go RAM", "512 Go SSD"],
    description:
      "Ultra-fin, ultra-rapide. Le MacBook Air M3 combine autonomie 18h, écran Liquid Retina et puissance Apple Silicon pour le travail comme la création.",
    specs: [
      { label: "Processeur", value: "Apple M3 8 cœurs" },
      { label: "Mémoire", value: "16 Go unifiée" },
      { label: "Stockage", value: "512 Go SSD" },
      { label: "Écran", value: '13,6" Liquid Retina' },
      { label: "Autonomie", value: "Jusqu'à 18h" },
      { label: "Garantie", value: "2 ans constructeur" },
    ],
    stock: { jarry: 4, dothemare: 2, lemoule: 0 },
    popular: true,
    isNew: true,
  },
  {
    id: "iphone-15",
    name: "iPhone 15 128 Go",
    brand: "Apple",
    category: "smartphones",
    price: 869,
    oldPrice: 929,
    image: img("photo-1592286927505-1def25115558"),
    shortSpecs: ['Écran 6,1"', "Dynamic Island", "USB-C"],
    description:
      "iPhone 15 avec puce A16 Bionic, double appareil photo 48 Mpx et port USB-C. Disponible coloris noir, bleu, rose, jaune.",
    specs: [
      { label: "Écran", value: '6,1" Super Retina XDR' },
      { label: "Puce", value: "A16 Bionic" },
      { label: "Stockage", value: "128 Go" },
      { label: "Photo", value: "48 Mpx + 12 Mpx" },
      { label: "Connectique", value: "USB-C" },
    ],
    stock: { jarry: 8, dothemare: 5, lemoule: 3 },
    popular: true,
  },
  {
    id: "ipad-air-11",
    name: 'iPad Air 11" M2',
    brand: "Apple",
    category: "tablettes",
    price: 799,
    image: img("photo-1561154464-82e9adf32764"),
    shortSpecs: ["Puce M2", "128 Go", "Wi-Fi"],
    description:
      "Tablette polyvalente pour le travail, l'école et la création. Compatible Apple Pencil Pro.",
    specs: [
      { label: "Écran", value: '11" Liquid Retina' },
      { label: "Puce", value: "Apple M2" },
      { label: "Stockage", value: "128 Go" },
      { label: "Connectivité", value: "Wi-Fi 6E" },
    ],
    stock: { jarry: 3, dothemare: 4, lemoule: 1 },
    isNew: true,
  },
  {
    id: "thinkpad-e14",
    name: "ThinkPad E14 Gen 5",
    brand: "Lenovo",
    category: "portables",
    price: 1099,
    image: img("photo-1496181133206-80ce9b88a853"),
    shortSpecs: ["Intel Core i7", "16 Go", "512 Go SSD"],
    description:
      "Portable professionnel robuste. Clavier reconnu, sécurité TPM, idéal pour la bureautique pro et les déplacements.",
    specs: [
      { label: "Processeur", value: "Intel Core i7-1355U" },
      { label: "Mémoire", value: "16 Go DDR4" },
      { label: "Stockage", value: "512 Go SSD NVMe" },
      { label: "Écran", value: '14" Full HD IPS' },
      { label: "OS", value: "Windows 11 Pro" },
    ],
    stock: { jarry: 6, dothemare: 2, lemoule: 0 },
    popular: true,
  },
  {
    id: "zenbook-14",
    name: "ZenBook 14 OLED",
    brand: "Asus",
    category: "portables",
    price: 1249,
    image: img("photo-1525547719571-a2d4ac8945e2"),
    shortSpecs: ["Core Ultra 7", "OLED 2.8K", "1 To"],
    description:
      "Ultraportable premium avec écran OLED 2.8K, châssis aluminium et autonomie longue durée.",
    specs: [
      { label: "Processeur", value: "Intel Core Ultra 7" },
      { label: "Mémoire", value: "16 Go LPDDR5" },
      { label: "Stockage", value: "1 To SSD" },
      { label: "Écran", value: '14" OLED 2.8K 120 Hz' },
    ],
    stock: { jarry: 2, dothemare: 1, lemoule: 0 },
    isNew: true,
  },
  {
    id: "hp-aio-24",
    name: "HP All-in-One 24",
    brand: "HP",
    category: "bureau",
    price: 849,
    image: img("photo-1547082299-de196ea013d6"),
    shortSpecs: ['Tout-en-un 23,8"', "Ryzen 5", "16 Go"],
    description:
      "PC tout-en-un compact pour la maison ou le bureau. Webcam HD intégrée, design propre sans tour.",
    specs: [
      { label: "Processeur", value: "AMD Ryzen 5 7520U" },
      { label: "Mémoire", value: "16 Go DDR5" },
      { label: "Stockage", value: "512 Go SSD" },
      { label: "Écran", value: '23,8" Full HD' },
    ],
    stock: { jarry: 3, dothemare: 0, lemoule: 2 },
  },
  {
    id: "samsung-s24",
    name: "Galaxy S24 256 Go",
    brand: "Samsung",
    category: "smartphones",
    price: 899,
    image: img("photo-1511707171634-5f897ff02aa9"),
    shortSpecs: ['6,2" AMOLED', "Galaxy AI", "256 Go"],
    description:
      "Smartphone Galaxy AI avec triple appareil photo et écran Dynamic AMOLED 2X 120 Hz.",
    specs: [
      { label: "Écran", value: '6,2" Dynamic AMOLED 120 Hz' },
      { label: "Stockage", value: "256 Go" },
      { label: "Photo", value: "50 + 10 + 12 Mpx" },
      { label: "Batterie", value: "4000 mAh" },
    ],
    stock: { jarry: 5, dothemare: 4, lemoule: 2 },
    popular: true,
    isNew: true,
  },
  {
    id: "epson-ecotank",
    name: "Epson EcoTank ET-2870",
    brand: "Epson",
    category: "imprimantes",
    price: 299,
    oldPrice: 349,
    image: img("photo-1612815154858-60aa4c59eaa6"),
    shortSpecs: ["3-en-1", "Réservoirs", "Wi-Fi"],
    description:
      "Multifonction avec réservoirs rechargeables. Jusqu'à 3 ans d'encre fournis. Idéale famille et TPE.",
    specs: [
      { label: "Fonctions", value: "Imprimer, copier, scanner" },
      { label: "Connectivité", value: "Wi-Fi, USB" },
      { label: "Vitesse", value: "10 ppm noir" },
    ],
    stock: { jarry: 4, dothemare: 3, lemoule: 3 },
  },
  {
    id: "samsung-monitor-27",
    name: 'Écran Samsung ViewFinity 27"',
    brand: "Samsung",
    category: "ecrans",
    price: 329,
    oldPrice: 379,
    image: img("photo-1527443224154-c4a3942d3acf"),
    shortSpecs: ['27" QHD', "IPS", "75 Hz"],
    description:
      "Écran QHD 2560x1440 pour le travail et le multimédia. Mode Eye Saver, sortie HDMI/DisplayPort.",
    specs: [
      { label: "Taille", value: '27"' },
      { label: "Résolution", value: "2560 x 1440 QHD" },
      { label: "Dalle", value: "IPS" },
      { label: "Fréquence", value: "75 Hz" },
    ],
    stock: { jarry: 6, dothemare: 4, lemoule: 1 },
  },
  {
    id: "lg-ultragear",
    name: "LG UltraGear 27GP850",
    brand: "LG",
    category: "ecrans",
    price: 449,
    image: img("photo-1616763355548-1b606f439f86"),
    shortSpecs: ['27" QHD', "180 Hz", "1 ms"],
    description:
      "Écran gaming Nano IPS 180 Hz avec G-Sync compatible. Couleurs précises pour le jeu et la création.",
    specs: [
      { label: "Taille", value: '27"' },
      { label: "Résolution", value: "QHD 1440p" },
      { label: "Fréquence", value: "180 Hz" },
      { label: "Temps de réponse", value: "1 ms GtG" },
    ],
    stock: { jarry: 2, dothemare: 0, lemoule: 0 },
  },
  {
    id: "airpods-pro",
    name: "AirPods Pro 2 USB-C",
    brand: "Apple",
    category: "accessoires",
    price: 279,
    oldPrice: 299,
    image: img("photo-1606220588913-b3aacb4d2f46"),
    shortSpecs: ["Réduction bruit", "USB-C", "Audio spatial"],
    description:
      "Réduction active du bruit améliorée, mode Transparence adaptatif et boîtier USB-C.",
    specs: [
      { label: "Connectique", value: "USB-C / Lightning" },
      { label: "Autonomie", value: "Jusqu'à 30h avec boîtier" },
    ],
    stock: { jarry: 10, dothemare: 6, lemoule: 4 },
    popular: true,
  },
  {
    id: "ssd-samsung-1to",
    name: "SSD Samsung 990 PRO 1 To",
    brand: "Samsung",
    category: "stockage",
    price: 119,
    image: img("photo-1597872200969-2b65d56bd16b"),
    shortSpecs: ["NVMe Gen4", "7450 Mo/s", "1 To"],
    description: "SSD M.2 NVMe haute performance pour PC gaming et stations de travail.",
    specs: [
      { label: "Format", value: "M.2 2280 NVMe Gen4" },
      { label: "Lecture", value: "7450 Mo/s" },
      { label: "Capacité", value: "1 To" },
    ],
    stock: { jarry: 12, dothemare: 8, lemoule: 5 },
  },
  {
    id: "logitech-mxmaster",
    name: "Logitech MX Master 3S",
    brand: "Logitech",
    category: "accessoires",
    price: 109,
    image: img("photo-1527864550417-7fd91fc51a46"),
    shortSpecs: ["Sans fil", "Silencieuse", "8000 dpi"],
    description: "Souris pro avec capteur 8000 dpi, défilement MagSpeed et clics ultra-silencieux.",
    specs: [
      { label: "Connectique", value: "Bluetooth + USB-C" },
      { label: "Autonomie", value: "70 jours" },
    ],
    stock: { jarry: 8, dothemare: 6, lemoule: 3 },
  },
  {
    id: "ps5-slim",
    name: "PlayStation 5 Slim",
    brand: "Sony",
    category: "consoles",
    price: 549,
    oldPrice: 599,
    image: img("photo-1606144042614-b2417e99c4e3"),
    shortSpecs: ["Lecteur disque", "1 To SSD", "4K"],
    description:
      "Console PS5 Slim version disque. Manette DualSense incluse. Réservation possible en magasin.",
    specs: [
      { label: "Stockage", value: "1 To SSD" },
      { label: "4K", value: "Jusqu'à 120 fps" },
    ],
    stock: { jarry: 2, dothemare: 1, lemoule: 0 },
    popular: true,
  },
  {
    id: "cartouche-hp",
    name: "Cartouche HP 305XL Couleur",
    brand: "HP",
    category: "encres",
    price: 32,
    image: img("photo-1612815154858-60aa4c59eaa6"),
    shortSpecs: ["Origine HP", "Haute capacité"],
    description:
      "Cartouche d'encre couleur d'origine HP, haute capacité pour imprimantes DeskJet/Envy compatibles.",
    specs: [{ label: "Type", value: "Origine HP, XL" }],
    stock: { jarry: 25, dothemare: 18, lemoule: 12 },
  },
  {
    id: "office-2024",
    name: "Microsoft 365 Famille 1 an",
    brand: "Microsoft",
    category: "logiciels",
    price: 99,
    image: img("photo-1633419461186-7d40a38105ec"),
    shortSpecs: ["6 personnes", "1 To OneDrive", "1 an"],
    description:
      "Word, Excel, PowerPoint, Outlook + 1 To OneDrive par personne. Activation immédiate en magasin.",
    specs: [{ label: "Licence", value: "6 utilisateurs / 1 an" }],
    stock: { jarry: 15, dothemare: 10, lemoule: 8 },
  },
  {
    id: "tplink-deco",
    name: "TP-Link Deco X50 Mesh",
    brand: "TP-Link",
    category: "reseau",
    price: 229,
    image: img("photo-1606318313846-7c46c95c4f2e"),
    shortSpecs: ["Wi-Fi 6", "Pack 3", "AX3000"],
    description: "Système Wi-Fi mesh AX3000, couverture jusqu'à 600 m². Pack de 3 bornes.",
    specs: [
      { label: "Norme", value: "Wi-Fi 6 AX3000" },
      { label: "Couverture", value: "Jusqu'à 600 m²" },
    ],
    stock: { jarry: 3, dothemare: 2, lemoule: 1 },
  },
  {
    id: "carte-mere-pro",
    name: "Carte mère ASUS Prime B650",
    brand: "Asus",
    category: "pieces",
    price: null,
    image: img("photo-1518770660439-4636190af475"),
    shortSpecs: ["AM5", "DDR5", "PCIe 5.0"],
    description:
      "Carte mère AM5 pour processeurs AMD Ryzen 7000. Disponible sur commande, conseil en magasin.",
    specs: [
      { label: "Socket", value: "AMD AM5" },
      { label: "Mémoire", value: "DDR5" },
    ],
    stock: { jarry: 1, dothemare: 0, lemoule: 0 },
  },
  {
    id: "epson-eb-fh52",
    name: "Vidéoprojecteur Epson EB-FH52",
    brand: "Epson",
    category: "videoprojecteurs",
    price: 799,
    image: img("photo-1565814329452-e1efa11c5b89"),
    shortSpecs: ["Full HD", "4000 lumens", "Wi-Fi"],
    description:
      "Vidéoprojecteur Full HD lumineux pour salle de réunion, classe ou home cinéma. Disponible sur commande et conseil en magasin.",
    specs: [
      { label: "Résolution", value: "Full HD 1080p" },
      { label: "Luminosité", value: "4000 lumens" },
      { label: "Connectivité", value: "HDMI, USB, Wi-Fi" },
    ],
    stock: { jarry: 1, dothemare: 0, lemoule: 0 },
  },
  {
    id: "tablette-samsung-a9",
    name: 'Galaxy Tab A9+ 11"',
    brand: "Samsung",
    category: "tablettes",
    price: 269,
    image: img("photo-1544244015-0df4b3ffc6b0"),
    shortSpecs: ['11" 90 Hz', "64 Go", "Wi-Fi"],
    description:
      "Tablette familiale 11\" avec écran 90 Hz et son surround. Idéale pour les enfants et l'école.",
    specs: [
      { label: "Écran", value: '11" 90 Hz' },
      { label: "Stockage", value: "64 Go extensible" },
    ],
    stock: { jarry: 5, dothemare: 3, lemoule: 4 },
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const getRelated = (p: Product, n = 4) =>
  products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, n);

export const formatPrice = (price: number | null) =>
  price === null
    ? "Nous consulter"
    : new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }).format(price);

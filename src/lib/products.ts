export type Product = {
  id: number;
  slug: string;
  name: string;
  category: string;
  price: number;
  oldPrice: number;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  description: string;
  benefits: string[];
  shopifyEmbedId: string;
  supplierUrl: string;
  featured: boolean;
};

export const products: Product[] = [
  {
    id: 1,
    slug: "masseur-cervical-bionique-pro",
    name: "Masseur Cervical Bionique Pro",
    category: "Masseurs électriques",
    price: 109,
    oldPrice: 149,
    rating: 4.8,
    reviews: 247,
    image: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=900&q=80",
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=900&q=80",
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=900&q=80",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=900&q=80",
    ],
    description:
      "Masseur chauffant bionique pour cou et épaules, 3 modes d'intensité, chaleur infrarouge, moteur sans balais silencieux. Idéal pour le télétravail, les douleurs cervicales, la détente après écran.",
    benefits: [
      "3 modes d'intensité",
      "Chaleur infrarouge 42°C",
      "Moteur sans balais silencieux",
      "Autonomie 3h",
      "Pliable, compact",
    ],
    shopifyEmbedId: "product-component-masseur-cervical",
    supplierUrl: "https://fr.aliexpress.com/item/1005010314956451.html",
    featured: true,
  },
  {
    id: 2,
    slug: "pistolet-massage-percussion-x5",
    name: "Pistolet de Massage Percussion X5",
    category: "Récupération sportive",
    price: 89,
    oldPrice: 129,
    rating: 4.7,
    reviews: 183,
    image: "https://images.unsplash.com/photo-1620052582992-ffb6c2fb53b2?w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1620052582992-ffb6c2fb53b2?w=900&q=80",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=900&q=80",
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=900&q=80",
      "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=900&q=80",
    ],
    description:
      "Pistolet de massage à percussion professionnel, 30 vitesses, 6 têtes interchangeables, autonomie 6h, silencieux < 45dB.",
    benefits: [
      "30 niveaux de vitesse",
      "6 têtes incluses",
      "Autonomie 6 heures",
      "Silencieux < 45dB",
      "Écran LED intégré",
    ],
    shopifyEmbedId: "product-component-pistolet-massage",
    supplierUrl: "https://fr.aliexpress.com/w/wholesale-massage-gun.html",
    featured: true,
  },
  {
    id: 3,
    slug: "ceinture-lombaire-chauffante",
    name: "Ceinture Lombaire Chauffante",
    category: "Thérapie thermique",
    price: 59,
    oldPrice: 79,
    rating: 4.6,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=900&q=80",
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=900&q=80",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=900&q=80",
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=900&q=80",
    ],
    description:
      "Ceinture lombaire chauffante avec vibration, USB rechargeable, 3 niveaux de chaleur, maintien lombaire et soulagement des tensions dorsales.",
    benefits: [
      "3 niveaux de chaleur",
      "Vibration intégrée",
      "USB rechargeable",
      "Taille ajustable",
      "Usage quotidien ou sport",
    ],
    shopifyEmbedId: "product-component-ceinture-lombaire",
    supplierUrl: "https://fr.aliexpress.com/w/wholesale-heated-back-belt.html",
    featured: false,
  },
  {
    id: 4,
    slug: "coussin-masseur-shiatsu",
    name: "Coussin Masseur Shiatsu",
    category: "Masseurs électriques",
    price: 69,
    oldPrice: 99,
    rating: 4.8,
    reviews: 421,
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=900&q=80",
      "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=900&q=80",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=900&q=80",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=900&q=80",
    ],
    description:
      "Coussin masseur shiatsu 8 têtes rotatives avec chauffage intégré, compatible voiture et bureau.",
    benefits: [
      "8 têtes rotatives",
      "Chaleur intégrée",
      "Voiture & bureau",
      "Rotation bidirectionnelle",
      "Housse lavable",
    ],
    shopifyEmbedId: "product-component-coussin-shiatsu",
    supplierUrl: "https://fr.aliexpress.com/w/wholesale-shiatsu-massage-pillow.html",
    featured: true,
  },
  {
    id: 5,
    slug: "rouleau-massage-cervical",
    name: "Rouleau de Massage Cervical",
    category: "Coussins & supports",
    price: 29,
    oldPrice: 39,
    rating: 4.5,
    reviews: 198,
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&q=80",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=900&q=80",
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=900&q=80",
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=900&q=80",
    ],
    description:
      "Rouleau de massage cervical en mousse haute densité avec points trigger, parfait en upsell ou bundle avec le masseur cervical.",
    benefits: [
      "Mousse haute densité",
      "Points trigger intégrés",
      "Idéal en bundle",
      "Compact & léger",
      "Sans électricité",
    ],
    shopifyEmbedId: "product-component-rouleau-cervical",
    supplierUrl: "https://fr.aliexpress.com/w/wholesale-neck-massage-roller.html",
    featured: false,
  },
  {
    id: 6,
    slug: "masque-yeux-chauffant",
    name: "Masque Yeux Chauffant",
    category: "Thérapie thermique",
    price: 39,
    oldPrice: 55,
    rating: 4.7,
    reviews: 267,
    image: "https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?w=900&q=80",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&q=80",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=900&q=80",
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=900&q=80",
    ],
    description:
      "Masque yeux chauffant et vibrant, chaleur ajustable 3 niveaux, compression douce, idéal routine sommeil et récupération oculaire.",
    benefits: [
      "3 niveaux de chaleur",
      "Vibration douce",
      "Routine sommeil",
      "Pliable pour voyage",
      "USB-C rechargeable",
    ],
    shopifyEmbedId: "product-component-masque-yeux",
    supplierUrl: "https://fr.aliexpress.com/w/wholesale-heated-eye-mask.html",
    featured: true,
  },
  {
    id: 7,
    slug: "botte-recuperation-compression",
    name: "Botte de Récupération Compression",
    category: "Récupération sportive",
    price: 129,
    oldPrice: 189,
    rating: 4.9,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=900&q=80",
      "https://images.unsplash.com/photo-1620052582992-ffb6c2fb53b2?w=900&q=80",
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=900&q=80",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=900&q=80",
    ],
    description:
      "Bottes de récupération à compression pneumatique, 4 zones de pression indépendantes, 6 modes, pour sportifs sérieux.",
    benefits: [
      "4 zones indépendantes",
      "6 modes de pression",
      "Récupération accélérée",
      "Taille universelle",
      "Sac de transport inclus",
    ],
    shopifyEmbedId: "product-component-botte-compression",
    supplierUrl: "https://fr.aliexpress.com/w/wholesale-compression-recovery-boots.html",
    featured: false,
  },
  {
    id: 8,
    slug: "tapis-acupression-premium",
    name: "Tapis d'Acupression Premium",
    category: "Coussins & supports",
    price: 49,
    oldPrice: 69,
    rating: 4.6,
    reviews: 534,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=900&q=80",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&q=80",
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=900&q=80",
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=900&q=80",
    ],
    description:
      "Tapis d'acupression premium avec oreiller inclus, 6210 points de pression, mousse haute densité, housse en coton bio.",
    benefits: [
      "6210 points de pression",
      "Oreiller cervical inclus",
      "Mousse haute densité",
      "Housse coton bio",
      "Sac de rangement inclus",
    ],
    shopifyEmbedId: "product-component-tapis-acupression",
    supplierUrl: "https://fr.aliexpress.com/w/wholesale-acupressure-mat.html",
    featured: false,
  },
];

export const categories = [
  "Tous",
  "Masseurs électriques",
  "Thérapie thermique",
  "Récupération sportive",
  "Coussins & supports",
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

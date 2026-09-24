export type ProductCategory = 
  | 'decorados'
  | 'hexagonais'
  | 'antiderrapantes'
  | 'podotatil'
  | 'faixas-rodapes'
  | 'tosetos';

export interface ProductSpecification {
  espessura: string;
  pesoPorM2: string;
  pecasPorM2: string;
  resistenciaMpa: string;
  acabamento: string;
  juntaRecomendada: string;
  impermeabilizacao: string;
  usoIndicado: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  dimensions: string;
  shortDescription: string;
  fullDescription: string;
  primaryImage: string;
  patternImage: string;
  colors: string[];
  specs: ProductSpecification;
  isBestseller?: boolean;
  isNew?: boolean;
}

export interface ProjectRoom {
  id: string;
  title: string;
  category: 'cozinhas' | 'varandas' | 'banheiros' | 'salas' | 'comercial';
  categoryLabel: string;
  architect: string;
  location: string;
  image: string;
  description: string;
  usedTileId: string;
  usedTileName: string;
  usedTileDimensions: string;
  usedTileThumb: string;
  usedGroutColor: string;
}

export interface SimulatorEnvironment {
  id: string;
  name: string;
  roomType: 'cozinha' | 'varanda' | 'banheiro' | 'sala';
  perspectiveImage: string;
  description: string;
  defaultTileId: string;
  defaultGroutColor: string;
}

export interface GroutColor {
  id: string;
  name: string;
  hex: string;
  borderHex: string;
}

import type { SimulatorEnvironment, GroutColor } from '../types';

export const environments: SimulatorEnvironment[] = [
  {
    id: 'cozinha-gourmet',
    name: 'Cozinha Gourmet & Ilha',
    roomType: 'cozinha',
    perspectiveImage: '/images/projeto-cozinha-azul.png',
    description: 'Bancadas brancas, iluminação quente e armários planejados com piso de destaque.',
    defaultTileId: 'floral-colonial-azul',
    defaultGroutColor: 'branco'
  },
  {
    id: 'sala-jantar',
    name: 'Sala de Jantar & Estar',
    roomType: 'sala',
    perspectiveImage: '/images/projeto-sala-hexagonal.png',
    description: 'Integração visual com mobiliário de design e iluminação natural abundante.',
    defaultTileId: 'hexagonal-terracota-artesanal',
    defaultGroutColor: 'bege'
  },
  {
    id: 'varanda-lounge',
    name: 'Varanda & Área Externa Coberta',
    roomType: 'varanda',
    perspectiveImage: '/images/projeto-corredor-xadrez.jpg',
    description: 'Ambiente aconchegante com vasos, plantas e piso rústico de alta inércia térmica.',
    defaultTileId: 'quadriculado-tradicao-1985',
    defaultGroutColor: 'cinza'
  },
  {
    id: 'frontao-cooktop',
    name: 'Frontão de Cozinha (Backsplash)',
    roomType: 'cozinha',
    perspectiveImage: '/images/projeto-backsplash-verde.png',
    description: 'Revestimento de parede entre a bancada e armários superiores.',
    defaultTileId: 'geometrico-origami-verde',
    defaultGroutColor: 'cinza'
  }
];

export const groutColors: GroutColor[] = [
  { id: 'branco', name: 'Branco Alvo', hex: '#FFFFFF', borderHex: '#D4CFC9' },
  { id: 'bege', name: 'Bege Areia Linho', hex: '#E2DBD0', borderHex: '#B8AFA0' },
  { id: 'cinza', name: 'Cinza Cimento Natural', hex: '#8F908F', borderHex: '#696B69' },
  { id: 'terracota', name: 'Terracota Cimentício', hex: '#A8523A', borderHex: '#803824' }
];

export const selectableTiles = [
  {
    id: 'floral-colonial-azul',
    name: 'Floral Colonial Cobalto',
    tileSvg: '/tiles/floral-colonial.svg',
    dimensions: '20 × 20 cm',
    category: 'Decorado'
  },
  {
    id: 'hexagonal-terracota-artesanal',
    name: 'Hexagonal Terracota',
    tileSvg: '/tiles/hexagonal-terracota.svg',
    dimensions: '20 × 23 cm',
    category: 'Hexagonal'
  },
  {
    id: 'geometrico-origami-verde',
    name: 'Geométrico Chevron Oliva',
    tileSvg: '/tiles/geometrico-verde.svg',
    dimensions: '20 × 20 cm',
    category: 'Geométrico'
  },
  {
    id: 'estrela-imperial-grafite',
    name: 'Estrela Imperial Grafite',
    tileSvg: '/tiles/estrela-imperial.svg',
    dimensions: '20 × 20 cm',
    category: 'Geométrico'
  },
  {
    id: 'copacabana-ondas-preto',
    name: 'Ondas Modernistas P&B',
    tileSvg: '/tiles/copacabana-ondas.svg',
    dimensions: '20 × 20 cm',
    category: 'Modernista'
  },
  {
    id: 'quadriculado-tradicao-1985',
    name: 'Quadriculado Tradição 1985',
    tileSvg: '/tiles/xadrez-tradicao.svg',
    dimensions: '20 × 20 cm',
    category: 'Clássico'
  }
];

import type { Product } from '../types';

export const products: Product[] = [
  // --- DECORADOS (15x15 e 20x20 cm) ---
  {
    id: 'floral-colonial-azul',
    slug: 'floral-colonial-azul',
    name: 'Floral Colonial Cobalto',
    category: 'decorados',
    categoryLabel: 'Ladrilhos Decorados',
    dimensions: '20 × 20 cm',
    shortDescription: 'Clássico desenho colonial luso-brasileiro com arabescos em azul cobalto, mostarda e off-white.',
    fullDescription: 'Produzido artesanalmente um a um com matriz metálica secular. As quatro peças formam uma suntuosa rosácea central quando paginadas em conjunto. Ideal para cozinhas nobres, halls de entrada e restaurações patrimoniais.',
    primaryImage: '/tiles/floral-colonial.svg',
    patternImage: '/images/projeto-cozinha-azul.png',
    colors: ['#2C4258', '#F3EFE6', '#C49746', '#B85D43'],
    isBestseller: true,
    specs: {
      espessura: '18 mm (Camada de desgaste: 4 a 5 mm)',
      pesoPorM2: '38,0 kg/m²',
      pecasPorM2: '25 peças/m²',
      resistenciaMpa: '≥ 25 MPa (Tráfego intenso comercial/residencial)',
      acabamento: 'Fosco acetinado artesanal (cura hidráulica sem queima)',
      juntaRecomendada: '1,0 mm a 1,5 mm (Junta seca clássica)',
      impermeabilizacao: 'Oleofugante impermeabilizante hidrorrepelente + cera protetora',
      usoIndicado: 'Pisos e paredes de áreas internas e varandas cobertas'
    }
  },
  {
    id: 'geometrico-origami-verde',
    slug: 'geometrico-origami-verde',
    name: 'Geométrico Chevron Oliva',
    category: 'decorados',
    categoryLabel: 'Ladrilhos Decorados',
    dimensions: '20 × 20 cm',
    shortDescription: 'Linhas contemporâneas com efeito tridimensional em verde musgo arquitetônico e linho.',
    fullDescription: 'Desenvolvido em parceria com arquitetos modernistas paulistanos. A angulação geométrica permite criar diversas variações de paginação (espinha de peixe, diagonais contínuas ou cubos ópticos).',
    primaryImage: '/tiles/geometrico-verde.svg',
    patternImage: '/images/projeto-backsplash-verde.png',
    colors: ['#3E5641', '#344837', '#F4EFE6'],
    isNew: true,
    specs: {
      espessura: '18 mm',
      pesoPorM2: '38,5 kg/m²',
      pecasPorM2: '25 peças/m²',
      resistenciaMpa: '≥ 26 MPa',
      acabamento: 'Acetinado suave cimentício',
      juntaRecomendada: '1,0 mm a 1,5 mm',
      impermeabilizacao: 'Oleofugante hidrofugante Rochbeton Pro',
      usoIndicado: 'Backsplashes, ilhas gourmet, cozinhas e lavabos'
    }
  },
  {
    id: 'estrela-imperial-grafite',
    slug: 'estrela-imperial-grafite',
    name: 'Estrela Imperial Monocromática',
    category: 'decorados',
    categoryLabel: 'Ladrilhos Decorados',
    dimensions: '20 × 20 cm',
    shortDescription: 'Padrão geométrico atemporal com estrela de 8 pontas em grafite profundo, ocre e terracota.',
    fullDescription: 'Um dos modelos mais requisitados da nossa história desde 1985. Composição nobre que equilibra o rigor geométrico com o calor das tonalidades minerais selecionadas.',
    primaryImage: '/tiles/estrela-imperial.svg',
    patternImage: '/tiles/estrela-imperial.svg',
    colors: ['#1C1D1F', '#C49746', '#B85D43', '#F5F2EB'],
    isBestseller: true,
    specs: {
      espessura: '18 mm',
      pesoPorM2: '38,0 kg/m²',
      pecasPorM2: '25 peças/m²',
      resistenciaMpa: '≥ 25 MPa',
      acabamento: 'Mineral mate acetinado',
      juntaRecomendada: '1,5 mm',
      impermeabilizacao: 'Impermeabilizante com realce de tom opcional',
      usoIndicado: 'Salas de estar, varandas gourmet, restaurantes e bistrôs'
    }
  },
  {
    id: 'copacabana-ondas-preto',
    slug: 'copacabana-ondas-preto',
    name: 'Ondas Modernistas P&B',
    category: 'decorados',
    categoryLabel: 'Ladrilhos Decorados',
    dimensions: '20 × 20 cm',
    shortDescription: 'Inspirado no consagrado calçadão modernista brasileiro em preto ônix e off-white.',
    fullDescription: 'Homenagem à arquitetura modernista de Burle Marx e Niemeyer. Forma uma onda fluida contínua capaz de ampliar visualmente o espaço onde é aplicado.',
    primaryImage: '/tiles/copacabana-ondas.svg',
    patternImage: '/tiles/copacabana-ondas.svg',
    colors: ['#1C1D1F', '#F7F5F0', '#B85D43'],
    specs: {
      espessura: '18 mm',
      pesoPorM2: '38,2 kg/m²',
      pecasPorM2: '25 peças/m²',
      resistenciaMpa: '≥ 28 MPa',
      acabamento: 'Cimentício fosco polido',
      juntaRecomendada: '1,0 mm',
      impermeabilizacao: 'Oleofugante impermeabilizante de alta penetração',
      usoIndicado: 'Pátios internos, varandas, recepções e corredores'
    }
  },

  // --- HEXAGONAIS (15x17 e 20x23 cm) ---
  {
    id: 'hexagonal-terracota-artesanal',
    slug: 'hexagonal-terracota-artesanal',
    name: 'Hexagonal Terracota Cimentícia',
    category: 'hexagonais',
    categoryLabel: 'Hexagonais',
    dimensions: '20 × 23 cm (Lados 11,5 cm)',
    shortDescription: 'Formato colmeia marcante em tonalidade terracota quente queimada artesanalmente sem forno.',
    fullDescription: 'O clássico formato hexagonal ganha vida com pigmentos naturais à base de óxidos de ferro nobres. Cria uma volumetria acolhedora que conversa perfeitamente com madeira nobre e pedras rústicas.',
    primaryImage: '/tiles/hexagonal-terracota.svg',
    patternImage: '/images/projeto-sala-hexagonal.png',
    colors: ['#B85D43', '#A8523A'],
    isBestseller: true,
    specs: {
      espessura: '18 mm',
      pesoPorM2: '39,0 kg/m²',
      pecasPorM2: '29 peças/m²',
      resistenciaMpa: '≥ 25 MPa',
      acabamento: 'Tátil aveludado mineral',
      juntaRecomendada: '1,5 mm a 2,0 mm',
      impermeabilizacao: 'Oleofugante com acabamento acetinado natural',
      usoIndicado: 'Salas de jantar, cozinhas abertas, varandas e lofts'
    }
  },
  {
    id: 'hexagonal-offwhite-puro',
    slug: 'hexagonal-offwhite-puro',
    name: 'Hexagonal Areia Linho',
    category: 'hexagonais',
    categoryLabel: 'Hexagonais',
    dimensions: '20 × 23 cm',
    shortDescription: 'Monocromático luminoso e sutil em tom linho natural, ideal para mesclar com peças coloridas.',
    fullDescription: 'Usado isoladamente para paginações minimalistas ou combinado com o Hexagonal Terracota para criar transições orgânicas entre ambientes (degradê de ladrilhos integrando sala e cozinha).',
    primaryImage: '/tiles/hexagonal-offwhite.svg',
    patternImage: '/images/projeto-sala-hexagonal.png',
    colors: ['#EFECE6', '#F8F6F0'],
    specs: {
      espessura: '18 mm',
      pesoPorM2: '39,0 kg/m²',
      pecasPorM2: '29 peças/m²',
      resistenciaMpa: '≥ 25 MPa',
      acabamento: 'Cimentício sedoso natural',
      juntaRecomendada: '1,5 mm',
      impermeabilizacao: 'Oleofugante incolor anti-manchas',
      usoIndicado: 'Pisos e revestimentos verticais de banheiros e livings'
    }
  },

  // --- ANTIDERRAPANTES (20x20, 25x25 e 30x30 cm) ---
  {
    id: 'antiderrapante-canelado-16q',
    slug: 'antiderrapante-canelado-16q',
    name: 'Antiderrapante 16 Quadros Cinza Chumbo',
    category: 'antiderrapantes',
    categoryLabel: 'Antiderrapantes',
    dimensions: '20 × 20 cm e 25 × 25 cm',
    shortDescription: 'Relevo piramidal em alto padrão de atrito para calçadas, garagens e rampas seguras.',
    fullDescription: 'Especialmente formulado para alta aderência mesmo quando molhado. Testado conforme normas técnicas de atrito dinâmico. Alta durabilidade mecânica suportando tráfego de veículos pesados.',
    primaryImage: '/tiles/antiderrapante-canelado.svg',
    patternImage: '/tiles/antiderrapante-canelado.svg',
    colors: ['#7A7875', '#555350'],
    specs: {
      espessura: '22 mm (Reforçado para carga)',
      pesoPorM2: '45,0 kg/m²',
      pecasPorM2: '25 peças/m² (20x20) / 16 peças/m² (25x25)',
      resistenciaMpa: '≥ 35 MPa (Alta resistência à compressão)',
      acabamento: 'Textura antiderrapante em relevo de matriz',
      juntaRecomendada: '2,0 mm a 3,0 mm',
      impermeabilizacao: 'Resina acrílica base água para áreas externas',
      usoIndicado: 'Calçadas de condomínios, garagens, bordas de piscina e rampas'
    }
  },

  // --- LINHA PODOTÁTIL (Acessibilidade NBR 9050) ---
  {
    id: 'podotatil-alerta-amarelo',
    slug: 'podotatil-alerta-amarelo',
    name: 'Podotátil Alerta (Bolinhas) NBR 9050',
    category: 'podotatil',
    categoryLabel: 'Linha Podotátil',
    dimensions: '25 × 25 cm (Espessura 22 mm)',
    shortDescription: 'Ladrilho tátil de alerta com semiesferas normatizadas para sinalização de perigo ou desníveis.',
    fullDescription: 'Fabricado em rigorosa conformidade com a ABNT NBR 9050. Pigmentação amarela integral indelével em toda a massa ou cor contrastante. Resistente à abrasão severa e intempéries.',
    primaryImage: '/tiles/podotatil-alerta.svg',
    patternImage: '/tiles/podotatil-alerta.svg',
    colors: ['#D68B29', '#C57C1E'],
    isBestseller: true,
    specs: {
      espessura: '22 mm (Placa 17mm + relevo tronco-cônico 5mm)',
      pesoPorM2: '46,0 kg/m²',
      pecasPorM2: '16 peças/m²',
      resistenciaMpa: '≥ 35 MPa',
      acabamento: 'Texturizado com relevo em conformidade NBR 9050',
      juntaRecomendada: '2,0 mm',
      impermeabilizacao: 'Hidrofugante de penetração profunda',
      usoIndicado: 'Início e término de escadas, elevadores, calçadas públicas e plataformas'
    }
  },
  {
    id: 'podotatil-direcional-amarelo',
    slug: 'podotatil-direcional-amarelo',
    name: 'Podotátil Direcional (Faixas) NBR 9050',
    category: 'podotatil',
    categoryLabel: 'Linha Podotátil',
    dimensions: '25 × 25 cm (Espessura 22 mm)',
    shortDescription: 'Linhas longitudinais em relevo para guiar a locomoção de deficientes visuais com segurança.',
    fullDescription: 'Projetado para orientar o percurso com a ponta da bengala. Confeccionado em concreto de alta performance mecânica com agregados nobres e pigmentação minerais Bayer.',
    primaryImage: '/tiles/podotatil-direcional.svg',
    patternImage: '/tiles/podotatil-direcional.svg',
    colors: ['#D68B29', '#C57C1E'],
    specs: {
      espessura: '22 mm (Placa 17mm + relevo direcional 5mm)',
      pesoPorM2: '46,0 kg/m²',
      pecasPorM2: '16 peças/m²',
      resistenciaMpa: '≥ 35 MPa',
      acabamento: 'Ranhuras de relevo trapezoidal NBR 9050',
      juntaRecomendada: '2,0 mm',
      impermeabilizacao: 'Hidrofugante acrílico impermeável',
      usoIndicado: 'Corredores de hospitais, escolas, shoppings, calçadas e terminais'
    }
  },

  // --- FAIXAS & RODAPÉS ---
  {
    id: 'faixa-renascenca-grega',
    slug: 'faixa-renascenca-grega',
    name: 'Faixa Clássica Renascença',
    category: 'faixas-rodapes',
    categoryLabel: 'Faixas & Rodapés',
    dimensions: '10 × 20 cm',
    shortDescription: 'Faixa perimetral para molduras, tapetes e rodapés com requinte arquitetônico.',
    fullDescription: 'Usada para emoldurar paginações de ladrilhos decorados centrais formando os cobiçados "tapetes de ladrilho hidráulico" em salas e varandas nobres. Combina perfeitamente com pisos de madeira.',
    primaryImage: '/tiles/faixa-renascenca.svg',
    patternImage: '/tiles/faixa-renascenca.svg',
    colors: ['#B85D43', '#C49746', '#F4EFE6'],
    specs: {
      espessura: '18 mm',
      pesoPorM2: '38,0 kg/m²',
      pecasPorM2: '50 peças/m² (ou 5 peças por metro linear)',
      resistenciaMpa: '≥ 25 MPa',
      acabamento: 'Cimentício artesanal fosco',
      juntaRecomendada: '1,0 mm a 1,5 mm',
      impermeabilizacao: 'Oleofugante impermeabilizante',
      usoIndicado: 'Bordas de tapetes cimentícios, rodapés nobres e detalhes em escadas'
    }
  },

  // --- TOSETOS (5x5 e 10x10 cm) ---
  {
    id: 'toseto-artesanal-terracota',
    slug: 'toseto-artesanal-terracota',
    name: 'Toseto Terracota Solstício',
    category: 'tosetos',
    categoryLabel: 'Tosetos',
    dimensions: '10 × 10 cm (e opção 5 × 5 cm)',
    shortDescription: 'Pequenos pontos focais decorativos para intercalar em pisos de tijolo, cimento queimado ou madeira.',
    fullDescription: 'Peças de destaque com desenho central em relevo suave. Podem ser inseridas nos vértices de placas cimentícias maiores ou tábuas de assoalho, conferindo personalidade única ao ambiente.',
    primaryImage: '/tiles/toseto-terracota.svg',
    patternImage: '/tiles/toseto-terracota.svg',
    colors: ['#B85D43', '#C49746', '#F4EFE6'],
    specs: {
      espessura: '18 mm',
      pesoPorM2: '36,0 kg/m²',
      pecasPorM2: '100 peças/m² (10x10) / 400 peças/m² (5x5)',
      resistenciaMpa: '≥ 25 MPa',
      acabamento: 'Artesanal sedoso',
      juntaRecomendada: '1,5 mm',
      impermeabilizacao: 'Oleofugante e resina fosca',
      usoIndicado: 'Ponto focal em pisos rústicos, decks de piscina e paredes de churrasqueira'
    }
  },

  // --- CLÁSSICO RETRÔ TRADIÇÃO 1985 ---
  {
    id: 'quadriculado-tradicao-1985',
    slug: 'quadriculado-tradicao-1985',
    name: 'Quadriculado Retrô Tradição 1985',
    category: 'decorados',
    categoryLabel: 'Ladrilhos Decorados',
    dimensions: '20 × 20 cm',
    shortDescription: 'Paginação histórica em blocos de cores puras (terracota, ocre, azul e verde sálvia).',
    fullDescription: 'Um ícone da memória arquitetônica brasileira dos anos 80 e 90, ainda fabricado com as matrizes originais da fundação da Rochbeton. Cada peça recebe pigmentação manual cuidadosa.',
    primaryImage: '/tiles/xadrez-tradicao.svg',
    patternImage: '/images/projeto-corredor-xadrez.jpg',
    colors: ['#B85D43', '#C49746', '#2C4258', '#4B665A'],
    isBestseller: true,
    specs: {
      espessura: '18 mm',
      pesoPorM2: '38,0 kg/m²',
      pecasPorM2: '25 peças/m²',
      resistenciaMpa: '≥ 25 MPa',
      acabamento: 'Cimentício artesanal acetinado',
      juntaRecomendada: '1,5 mm',
      impermeabilizacao: 'Oleofugante hidrorrepelente',
      usoIndicado: 'Varandas acolhedoras, cozinhas de fazenda, copas e corredores'
    }
  }
];

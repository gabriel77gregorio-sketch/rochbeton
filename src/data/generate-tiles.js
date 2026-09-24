import fs from 'fs';
import path from 'path';

const outDir = path.resolve('public/tiles');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 1. Floral Colonial Azul & Branco (Inspirado no projeto real da foto do usuário)
const floralAzulSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="400" height="400">
  <rect width="200" height="200" fill="#F3EFE6"/>
  <!-- Borda de encaixe sutil -->
  <rect x="2" y="2" width="196" height="196" fill="none" stroke="#2C4258" stroke-width="1.5" stroke-opacity="0.3"/>
  <g fill="#2C4258">
    <!-- Centro floral -->
    <circle cx="100" cy="100" r="14" fill="#C49746"/>
    <circle cx="100" cy="100" r="8" fill="#F3EFE6"/>
    <!-- Pétalas cardeais -->
    <path d="M100,50 C118,70 118,85 100,90 C82,85 82,70 100,50 Z"/>
    <path d="M100,150 C118,130 118,115 100,110 C82,115 82,130 100,150 Z"/>
    <path d="M50,100 C70,118 85,118 90,100 C85,82 70,82 50,100 Z"/>
    <path d="M150,100 C130,118 115,118 110,100 C115,82 130,82 150,100 Z"/>
    <!-- Volutas diagonais -->
    <path d="M45,45 Q75,45 80,75 Q60,70 45,45 Z" fill="#B85D43"/>
    <path d="M155,45 Q125,45 120,75 Q140,70 155,45 Z" fill="#B85D43"/>
    <path d="M45,155 Q75,155 80,125 Q60,130 45,155 Z" fill="#B85D43"/>
    <path d="M155,155 Q125,155 120,125 Q140,130 155,155 Z" fill="#B85D43"/>
    <!-- Cantos para formar arabescos quando agrupados em 4 -->
    <path d="M0,0 Q30,0 30,30 Q0,30 0,0 Z"/>
    <path d="M200,0 Q170,0 170,30 Q200,30 200,0 Z"/>
    <path d="M0,200 Q30,200 30,170 Q0,170 0,200 Z"/>
    <path d="M200,200 Q170,200 170,170 Q200,170 200,200 Z"/>
    <circle cx="0" cy="0" r="16" fill="#C49746"/>
    <circle cx="200" cy="0" r="16" fill="#C49746"/>
    <circle cx="0" cy="200" r="16" fill="#C49746"/>
    <circle cx="200" cy="200" r="16" fill="#C49746"/>
  </g>
</svg>`;

// 2. Geométrico Flecha / Origami Verde Musgo (Inspirado no backsplash da foto do usuário)
const geometricoVerdeSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="400" height="400">
  <rect width="200" height="200" fill="#F4EFE6"/>
  <!-- Padrão Chevron Moderno -->
  <polygon points="0,0 100,100 100,60 0,-40" fill="#3E5641"/>
  <polygon points="100,100 200,0 200,-40 100,60" fill="#344837"/>
  <polygon points="0,100 100,200 100,160 0,60" fill="#3E5641"/>
  <polygon points="100,200 200,100 200,60 100,160" fill="#344837"/>
  <polygon points="0,200 100,300 100,260 0,160" fill="#3E5641"/>
  <polygon points="100,300 200,200 200,160 100,260" fill="#344837"/>
  <line x1="0" y1="100" x2="200" y2="100" stroke="#F4EFE6" stroke-width="4"/>
  <line x1="100" y1="0" x2="100" y2="200" stroke="#F4EFE6" stroke-width="4"/>
</svg>`;

// 3. Hexagonal Bicolor Terracota & Off-White (Inspirado na sala de jantar da foto do usuário)
const hexagonalTerracotaSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 230" width="400" height="460">
  <polygon points="100,0 200,57.7 200,173.2 100,230.9 0,173.2 0,57.7" fill="#B85D43"/>
  <!-- Textura cimentícia interna e relevo artesanal -->
  <polygon points="100,12 188,63 188,167 100,218 12,167 12,63" fill="#A8523A"/>
  <polygon points="100,25 175,69 175,161 100,205 25,161 25,69" fill="#B85D43"/>
</svg>`;

// 4. Hexagonal Off-White puro
const hexagonalOffWhiteSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 230" width="400" height="460">
  <polygon points="100,0 200,57.7 200,173.2 100,230.9 0,173.2 0,57.7" fill="#EFECE6"/>
  <polygon points="100,12 188,63 188,167 100,218 12,167 12,63" fill="#F8F6F0"/>
</svg>`;

// 5. Quadriculado Xadrez Tradição 1985 (Inspirado no piso multicor da foto)
const xadrezTradicaoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="400" height="400">
  <rect width="100" height="100" x="0" y="0" fill="#B85D43"/>
  <rect width="100" height="100" x="100" y="0" fill="#C49746"/>
  <rect width="100" height="100" x="0" y="100" fill="#2C4258"/>
  <rect width="100" height="100" x="100" y="100" fill="#4B665A"/>
  <!-- Linhas de junta artesanal -->
  <line x1="0" y1="100" x2="200" y2="100" stroke="#DFD9CF" stroke-width="3"/>
  <line x1="100" y1="0" x2="100" y2="200" stroke="#DFD9CF" stroke-width="3"/>
</svg>`;

// 6. Modelo Estrela Imperial (Decorado 20x20cm)
const estrelaImperialSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="400" height="400">
  <rect width="200" height="200" fill="#F5F2EB"/>
  <g transform="translate(100,100)">
    <polygon points="0,-85 24,-24 85,0 24,24 0,85 -24,24 -85,0 -24,-24" fill="#1C1D1F"/>
    <polygon points="0,-60 17,-17 60,0 17,17 0,60 -17,17 -60,0 -17,-17" fill="#C49746"/>
    <circle cx="0" cy="0" r="16" fill="#B85D43"/>
    <circle cx="0" cy="0" r="6" fill="#F5F2EB"/>
  </g>
  <!-- Cantos decorados -->
  <polygon points="0,0 35,0 0,35" fill="#1C1D1F"/>
  <polygon points="200,0 165,0 200,35" fill="#1C1D1F"/>
  <polygon points="0,200 35,200 0,165" fill="#1C1D1F"/>
  <polygon points="200,200 165,200 200,165" fill="#1C1D1F"/>
</svg>`;

// 7. Modelo Copacabana Ondas (Decorado 20x20cm)
const copacabanaOndasSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="400" height="400">
  <rect width="200" height="200" fill="#F7F5F0"/>
  <path d="M0,70 C50,70 50,130 100,130 C150,130 150,70 200,70 L200,200 L0,200 Z" fill="#1C1D1F"/>
  <path d="M0,0 C50,0 50,60 100,60 C150,60 150,0 200,0 L200,-50 L0,-50 Z" fill="#1C1D1F"/>
  <circle cx="100" cy="100" r="10" fill="#B85D43"/>
</svg>`;

// 8. Podotátil Alerta (Bolinhas 25x25cm)
const podotatilAlertaSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="400" height="400">
  <rect width="200" height="200" fill="#D68B29"/>
  <!-- Grade 4x4 de relevos tronco-cônicos -->
  <defs>
    <radialGradient id="alertaGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FFDD78"/>
      <stop offset="60%" stop-color="#C57C1E"/>
      <stop offset="100%" stop-color="#8E520A"/>
    </radialGradient>
  </defs>
  ${[25, 75, 125, 175].map(x => 
    [25, 75, 125, 175].map(y => 
      `<circle cx="${x}" cy="${y}" r="16" fill="url(#alertaGrad)"/>
       <circle cx="${x}" cy="${y}" r="11" fill="#FFC94A" opacity="0.6"/>`
    ).join('')
  ).join('')}
</svg>`;

// 9. Podotátil Direcional (Faixas lineares de caminhamento 25x25cm)
const podotatilDirecionalSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="400" height="400">
  <rect width="200" height="200" fill="#D68B29"/>
  <defs>
    <linearGradient id="faixaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#9A5A0F"/>
      <stop offset="35%" stop-color="#FFDE82"/>
      <stop offset="70%" stop-color="#C57C1E"/>
      <stop offset="100%" stop-color="#804706"/>
    </linearGradient>
  </defs>
  ${[20, 70, 120, 170].map(x => 
    `<rect x="${x-10}" y="10" width="20" height="180" rx="4" fill="url(#faixaGrad)"/>`
  ).join('')}
</svg>`;

// 10. Antiderrapante Canelado / 16 Quadros (20x20cm)
const antiderrapanteSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="400" height="400">
  <rect width="200" height="200" fill="#7A7875"/>
  <defs>
    <radialGradient id="relevoQuad" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#9E9B97"/>
      <stop offset="100%" stop-color="#555350"/>
    </radialGradient>
  </defs>
  ${[12, 60, 108, 156].map(x => 
    [12, 60, 108, 156].map(y => 
      `<rect x="${x}" y="${y}" width="36" height="36" rx="2" fill="url(#relevoQuad)"/>
       <rect x="${x+2}" y="${y+2}" width="32" height="32" rx="1" fill="#757370" opacity="0.3"/>`
    ).join('')
  ).join('')}
</svg>`;

// 11. Faixa Renascença Grega (10x20cm)
const faixaRenascencaSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100" width="400" height="200">
  <rect width="200" height="100" fill="#F4EFE6"/>
  <rect x="0" y="8" width="200" height="84" fill="#B85D43"/>
  <path d="M0,50 L20,30 L40,50 L60,30 L80,50 L100,30 L120,50 L140,30 L160,50 L180,30 L200,50 L180,70 L160,50 L140,70 L120,50 L100,70 L80,50 L60,70 L40,50 L20,70 Z" fill="#F4EFE6"/>
  <circle cx="50" cy="50" r="5" fill="#C49746"/>
  <circle cx="100" cy="50" r="5" fill="#C49746"/>
  <circle cx="150" cy="50" r="5" fill="#C49746"/>
</svg>`;

// 12. Toseto Artesanal Terracota (10x10cm)
const tosetoTerracotaSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="200" height="200">
  <rect width="100" height="100" fill="#B85D43"/>
  <rect x="12" y="12" width="76" height="76" fill="#A44D35"/>
  <polygon points="50,22 78,50 50,78 22,50" fill="#C49746"/>
  <circle cx="50" cy="50" r="10" fill="#F4EFE6"/>
</svg>`;

const files = {
  'floral-colonial.svg': floralAzulSvg,
  'geometrico-verde.svg': geometricoVerdeSvg,
  'hexagonal-terracota.svg': hexagonalTerracotaSvg,
  'hexagonal-offwhite.svg': hexagonalOffWhiteSvg,
  'xadrez-tradicao.svg': xadrezTradicaoSvg,
  'estrela-imperial.svg': estrelaImperialSvg,
  'copacabana-ondas.svg': copacabanaOndasSvg,
  'podotatil-alerta.svg': podotatilAlertaSvg,
  'podotatil-direcional.svg': podotatilDirecionalSvg,
  'antiderrapante-canelado.svg': antiderrapanteSvg,
  'faixa-renascenca.svg': faixaRenascencaSvg,
  'toseto-terracota.svg': tosetoTerracotaSvg,
};

for (const [name, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(outDir, name), content.trim(), 'utf-8');
}

console.log('SVGs gerados com sucesso:', Object.keys(files).length);

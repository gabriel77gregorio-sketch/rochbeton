import React, { useState } from 'react';
import { environments, groutColors, selectableTiles } from '../data/ambientes-simulador';

export default function SimulatorIsland() {
  const [selectedEnvId, setSelectedEnvId] = useState(environments[0].id);
  const [selectedTileId, setSelectedTileId] = useState(selectableTiles[0].id);
  const [selectedGroutId, setSelectedGroutId] = useState(groutColors[0].id);
  const [gridDensity, setGridDensity] = useState<number>(3); // 2x2, 3x3, 4x4
  const [areaSquareMeters, setAreaSquareMeters] = useState<number>(15);

  const currentEnv = environments.find(e => e.id === selectedEnvId) || environments[0];
  const currentTile = selectableTiles.find(t => t.id === selectedTileId) || selectableTiles[0];
  const currentGrout = groutColors.find(g => g.id === selectedGroutId) || groutColors[0];

  // Cálculo de peças: normalmente 25 peças de 20x20 por m²
  const piecesPerM2 = 25;
  const estimatedPieces = Math.round(areaSquareMeters * piecesPerM2 * 1.05); // 5% de margem técnica

  const whatsappSimulationUrl = `https://wa.me/5511991008594?text=${encodeURIComponent(
    `Olá Rochbeton! Fiz uma simulação no site com os seguintes parâmetros:\n\n• Ambiente: ${currentEnv.name}\n• Modelo de Ladrilho: ${currentTile.name} (${currentTile.dimensions})\n• Cor de Rejunte: ${currentGrout.name}\n• Área estimada: ${areaSquareMeters} m² (~${estimatedPieces} peças com 5% de perda técnica)\n\nGostaria de receber a cotação e prazo de fabricação.`
  )}`;

  return (
    <section id="simulador" className="py-24 bg-[#1C1D1F] text-white relative overflow-hidden">
      {/* Luz ambiente de fundo */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#B85D43]/20 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#C49746]/15 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabeçalho */}
        <div className="max-w-3xl mx-auto text-center mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#C49746] text-xs font-semibold tracking-wider uppercase border border-white/10 backdrop-blur-md">
            <span>Pilar 3 • Experiência Interativa</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl font-semibold text-white tracking-tight">
            Simulador de Ambientes & Paginações
          </h2>
          <p className="text-stone-300 text-base sm:text-lg">
            Teste diferentes composições de ladrilhos, altere o tom do rejunte e visualize o ritmo visual antes da fabricação artesanal.
          </p>
        </div>

        {/* Layout do Simulador: Maquete + Painel de Configurações */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Coluna Visual: Maquete Digital do Ambiente (7 colunas) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative rounded-3xl overflow-hidden bg-stone-900 border border-white/15 shadow-2xl">
              
              {/* Moldura Superior do Visualizador */}
              <div className="px-5 py-3.5 bg-black/40 backdrop-blur-md border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                  <span className="text-xs text-stone-300 font-medium ml-2">{currentEnv.name}</span>
                </div>
                <div className="text-[11px] text-stone-400 font-mono">
                  Escala: {gridDensity}x{gridDensity}
                </div>
              </div>

              {/* Área de Visualização Interativa do Ambiente */}
              <div className="relative h-[380px] sm:h-[460px] w-full overflow-hidden bg-stone-950 flex flex-col justify-end">
                {/* Foto de Fundo do Ambiente (Cozinha, Sala, etc.) */}
                <img
                  src={currentEnv.perspectiveImage}
                  alt={currentEnv.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-85 transition-opacity duration-500"
                />

                {/* Sombra de oclusão e profundidade da maquete */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent"></div>

                {/* Camada Interativa do Piso com Perspectiva 3D */}
                <div className="relative w-full h-[52%] px-4 sm:px-8 pb-4 flex items-end">
                  <div
                    className="w-full h-full rounded-2xl p-2 sm:p-3 overflow-hidden shadow-2xl transition-all duration-300 relative border"
                    style={{
                      backgroundColor: currentGrout.hex,
                      borderColor: currentGrout.borderHex,
                      boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                      transform: 'perspective(600px) rotateX(24deg)',
                      transformOrigin: 'bottom center',
                    }}
                  >
                    {/* Grade dinâmica repetida de ladrilhos */}
                    <div
                      className="w-full h-full grid gap-1 sm:gap-1.5"
                      style={{
                        gridTemplateColumns: `repeat(${gridDensity * 2}, 1fr)`,
                        gridTemplateRows: `repeat(${gridDensity}, 1fr)`,
                        backgroundColor: currentGrout.hex,
                      }}
                    >
                      {Array.from({ length: gridDensity * gridDensity * 2 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-full h-full bg-[#F3EFE6] rounded-xs overflow-hidden shadow-xs relative"
                        >
                          <img
                            src={currentTile.tileSvg}
                            alt={currentTile.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Legenda flutuante sobre a maquete */}
                <div className="absolute top-4 left-4 p-3 rounded-2xl bg-black/75 backdrop-blur-md border border-white/10 text-xs space-y-1">
                  <div className="text-[#C49746] font-bold text-[10px] uppercase tracking-wider">Ladrilho Ativo</div>
                  <div className="font-semibold text-white">{currentTile.name}</div>
                  <div className="text-stone-300 text-[11px]">Rejunte: {currentGrout.name}</div>
                </div>

                {/* Controle Rápido de Densidade / Escala */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 p-1.5 rounded-2xl bg-black/75 backdrop-blur-md border border-white/10">
                  <span className="text-[10px] text-stone-400 px-2 font-medium">Zoom:</span>
                  {[2, 3, 4].map(density => (
                    <button
                      key={density}
                      onClick={() => setGridDensity(density)}
                      className={`px-2.5 py-1 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                        gridDensity === density
                          ? 'bg-[#B85D43] text-white'
                          : 'text-stone-300 hover:bg-white/10'
                      }`}
                    >
                      {density}x{density}
                    </button>
                  ))}
                </div>

              </div>

              {/* Barra inferior descritiva */}
              <div className="p-4 bg-stone-900/90 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <span className="text-stone-300">
                  {currentEnv.description}
                </span>
                <span className="text-[#C49746] font-medium whitespace-nowrap">
                  Dimensão da peça: {currentTile.dimensions}
                </span>
              </div>

            </div>

            {/* Banner de Consultoria Técnica para Cores Customizadas */}
            <div className="p-5 rounded-3xl bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-sm font-bold text-white flex items-center justify-center sm:justify-start gap-2">
                  <span className="text-base">🎨</span>
                  <span>Deseja alterar as cores deste desenho?</span>
                </h4>
                <p className="text-xs text-stone-400">
                  Podemos inverter as cores ou preparar tonalidades sob medida a partir de amostras de tecidos, tintas ou marcenaria.
                </p>
              </div>
              <a
                href="https://wa.me/5511991008594?text=Ol%C3%A1!%20Gostaria%20de%20consultoria%20para%20personalizar%20as%20cores%20de%20um%20ladrilho%20Rochbeton."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-white/15 hover:bg-white text-white hover:text-[#1C1D1F] text-xs font-semibold border border-white/20 transition-all duration-300 whitespace-nowrap"
              >
                Personalizar Cores Sob Medida
              </a>
            </div>
          </div>

          {/* Coluna Controles: Painel Interativo de Configuração (5 colunas) */}
          <div className="lg:col-span-5 space-y-6 bg-white/5 backdrop-blur-xl p-6 sm:p-7 rounded-3xl border border-white/10 shadow-2xl">
            
            {/* 1. Escolha de Ambiente */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block">
                1. Selecione o Cenário
              </label>
              <div className="grid grid-cols-2 gap-2">
                {environments.map(env => (
                  <button
                    key={env.id}
                    onClick={() => {
                      setSelectedEnvId(env.id);
                      if (env.defaultTileId) setSelectedTileId(env.defaultTileId);
                    }}
                    className={`p-3 rounded-2xl text-left text-xs font-medium border transition-all duration-200 cursor-pointer ${
                      selectedEnvId === env.id
                        ? 'bg-white/20 border-[#B85D43] text-white shadow-md'
                        : 'bg-stone-900/60 border-white/5 text-stone-400 hover:bg-stone-850 hover:text-white'
                    }`}
                  >
                    <div className="font-bold text-white text-xs">{env.name}</div>
                    <div className="text-[10px] text-stone-400 mt-0.5 capitalize">{env.roomType}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Seleção de Modelos de Ladrilhos */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block">
                2. Escolha o Padrão do Ladrilho
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {selectableTiles.map(tile => (
                  <button
                    key={tile.id}
                    onClick={() => setSelectedTileId(tile.id)}
                    className={`p-2.5 rounded-2xl flex flex-col items-center text-center border transition-all duration-200 cursor-pointer group ${
                      selectedTileId === tile.id
                        ? 'bg-[#B85D43]/20 border-[#B85D43] ring-2 ring-[#B85D43]/40'
                        : 'bg-stone-900/60 border-white/5 hover:bg-stone-850'
                    }`}
                  >
                    <div className="w-14 h-14 rounded-xl bg-[#F9F8F6] p-1 mb-2 border border-white/20 overflow-hidden shadow-inner">
                      <img
                        src={tile.tileSvg}
                        alt={tile.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-[11px] font-bold text-white leading-tight line-clamp-1">
                      {tile.name}
                    </span>
                    <span className="text-[9px] text-stone-400 mt-0.5">
                      {tile.dimensions}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Seleção de Cor de Rejunte */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block">
                3. Tonalidade do Rejunte
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {groutColors.map(grout => (
                  <button
                    key={grout.id}
                    onClick={() => setSelectedGroutId(grout.id)}
                    className={`p-2 rounded-2xl flex items-center gap-2 border transition-all duration-200 cursor-pointer ${
                      selectedGroutId === grout.id
                        ? 'bg-white/20 border-white ring-1 ring-white/50 text-white'
                        : 'bg-stone-900/60 border-white/5 text-stone-400 hover:bg-stone-850'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-stone-600 inline-block shadow-inner"
                      style={{ backgroundColor: grout.hex }}
                    />
                    <span className="text-[11px] font-semibold truncate text-white">
                      {grout.name.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Calculadora Rápida de Metragem e Estimativa de Peças */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-300 font-medium">Área Estimada do Projeto:</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max="500"
                    value={areaSquareMeters}
                    onChange={(e) => setAreaSquareMeters(Math.max(1, Number(e.target.value) || 1))}
                    className="w-16 px-2 py-1 bg-stone-900 border border-white/20 rounded-lg text-white font-bold text-right text-xs focus:ring-1 focus:ring-[#B85D43] focus:outline-none"
                  />
                  <span className="text-stone-300 font-bold">m²</span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-stone-400">Total com 5% de margem técnica:</span>
                <span className="font-bold text-[#C49746] text-sm">
                  ~{estimatedPieces} peças
                </span>
              </div>
            </div>

            {/* Botão de Orçamento da Simulação */}
            <div className="pt-1">
              <a
                href={whatsappSimulationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-4 rounded-2xl bg-[#B85D43] hover:bg-[#984832] text-white font-semibold text-sm shadow-xl flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-[1.02] active:scale-98"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.697c.974.532 1.802.814 2.806.815 3.183 0 5.77-2.587 5.77-5.767 0-3.18-2.587-5.766-5.77-5.766zm3.407 8.163c-.144.406-.834.774-1.157.822-.323.048-.745.068-1.206-.08-1.503-.482-2.541-1.637-2.618-1.74-.076-.102-.622-.828-.622-1.58 0-.751.393-1.121.532-1.265.14-.143.305-.18.406-.18.102 0 .204.002.292.006.094.005.219-.036.342.261.127.307.433 1.056.471 1.134.038.077.064.168.013.27-.051.102-.077.166-.153.254-.076.089-.16.198-.229.266-.076.076-.156.159-.067.311.089.153.395.652.848 1.055.582.518 1.074.679 1.227.755.153.076.242.064.331-.038.089-.102.382-.445.484-.598.102-.153.204-.127.343-.076.14.051.889.419 1.042.495.153.076.255.114.292.178.038.064.038.369-.106.775z"/>
                </svg>
                <span>Solicitar Este Padrão no WhatsApp</span>
              </a>
              <p className="text-center text-[11px] text-stone-400 mt-2">
                Envio direto da simulação pronta para a equipe de orçamentos técnicos da Rochbeton.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

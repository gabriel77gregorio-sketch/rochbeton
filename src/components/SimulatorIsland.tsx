import React, { useState, useEffect } from 'react';
import { environments, groutColors, selectableTiles } from '../data/ambientes-simulador';

export default function SimulatorIsland() {
  // Controle do modo tela cheia (onboarding)
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Estados da simulação
  const [selectedEnvId, setSelectedEnvId] = useState(environments[0].id);
  const [selectedTileId, setSelectedTileId] = useState(selectableTiles[0].id);
  const [selectedGroutId, setSelectedGroutId] = useState(groutColors[0].id);
  const [gridDensity, setGridDensity] = useState<number>(3); // 2x2, 3x3, 4x4
  const [areaSquareMeters, setAreaSquareMeters] = useState<number>(15);
  const [applicationType, setApplicationType] = useState<'piso' | 'parede' | 'ambos'>('piso');
  const [safetyMarginPercent, setSafetyMarginPercent] = useState<number>(5); // 5% ou 10%
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const currentEnv = environments.find(e => e.id === selectedEnvId) || environments[0];
  const currentTile = selectableTiles.find(t => t.id === selectedTileId) || selectableTiles[0];
  const currentGrout = groutColors.find(g => g.id === selectedGroutId) || groutColors[0];

  // Cálculos técnicos de engenharia cimentícia
  const piecesPerM2 = 25; // Peças nominais de 20x20cm por metro quadrado
  const rawPieces = areaSquareMeters * piecesPerM2;
  const marginMultiplier = 1 + (safetyMarginPercent / 100);
  const estimatedPieces = Math.ceil(rawPieces * marginMultiplier);
  const estimatedWeightKg = Math.round(areaSquareMeters * 38); // ~38kg por m²

  // Efeito para travar o scroll do body quando em tela cheia
  useEffect(() => {
    if (isFullScreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isFullScreen]);

  // Mensagem WhatsApp formatada
  const applicationLabels = {
    piso: 'Piso',
    parede: 'Parede / Revestimento',
    ambos: 'Piso e Parede'
  };

  const whatsappMessage = `🏛️ *ORÇAMENTO DE LADRILHOS HIDRÁULICOS - ROCHBETON (1985)*

Olá! Concluí a simulação do meu projeto no site oficial da Rochbeton:

• *Ambiente Escolhido:* ${currentEnv.name}
• *Modelo do Ladrilho:* ${currentTile.name} (${currentTile.dimensions})
• *Tonalidade de Rejunte:* ${currentGrout.name}
• *Tipo de Aplicação:* ${applicationLabels[applicationType]}
• *Área do Projeto:* ${areaSquareMeters} m²
• *Estimativa de Peças:* ~${estimatedPieces} peças (incluindo ${safetyMarginPercent}% de margem técnica)
• *Peso Estimado da Carga:* ~${estimatedWeightKg} kg

Gostaria de receber a cotação formal com condições comerciais, frete para meu CEP e prazo de cura/fabricação artesanal.`;

  const whatsappUrl = `https://wa.me/5511991008594?text=${encodeURIComponent(whatsappMessage)}`;

  // Gerador de PDF Executivo com jsPDF
  const handleDownloadPdf = async () => {
    try {
      setIsGeneratingPdf(true);
      const { jsPDF } = await import('jspdf');

      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Cores institucionais
      const colorDark = [28, 29, 31]; // #1C1D1F
      const colorTerracotta = [184, 93, 67]; // #B85D43
      const colorGold = [196, 151, 70]; // #C49746
      const colorSand = [244, 239, 230]; // #F4EFE6

      // Cabeçalho institucional escuro
      doc.setFillColor(colorDark[0], colorDark[1], colorDark[2]);
      doc.rect(0, 0, 210, 42, 'F');

      // Faixa dourada decorativa
      doc.setFillColor(colorGold[0], colorGold[1], colorGold[2]);
      doc.rect(0, 42, 210, 3, 'F');

      // Título do documento
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(20);
      doc.text('ROCHBETON', 20, 18);

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(colorGold[0], colorGold[1], colorGold[2]);
      doc.text('LADRILHOS HIDRÁULICOS & DESIGN ARQUITETÔNICO • DESDE 1985', 20, 25);

      doc.setTextColor(220, 220, 220);
      doc.setFontSize(8);
      doc.text('Fábrica & Showroom: Rua Guairá, 36 – Jardim Salete, Taboão da Serra – SP', 20, 33);
      doc.text('Tel: (11) 4138-1015 | WhatsApp: (11) 99100-8594 | vendas@rochbeton.com.br', 20, 37);

      // Data e Número do Relatório
      const today = new Date().toLocaleDateString('pt-BR');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8);
      doc.text(`Data: ${today}`, 160, 20);
      doc.text('Simulação Digital Web', 160, 25);

      // Bloco de Título da Ficha
      let y = 56;
      doc.setTextColor(colorTerracotta[0], colorTerracotta[1], colorTerracotta[2]);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('FICHA DE ESPECIFICAÇÃO & PROPOSTA TÉCNICA', 20, y);

      y += 6;
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(80, 80, 80);
      doc.text('Resumo dos parâmetros definidos pelo cliente no simulador interativo de paginação.', 20, y);

      // Box 1: Dados do Projeto Simulado
      y += 10;
      doc.setFillColor(colorSand[0], colorSand[1], colorSand[2]);
      doc.roundedRect(20, y, 170, 72, 3, 3, 'F');
      doc.setDrawColor(220, 215, 205);
      doc.roundedRect(20, y, 170, 72, 3, 3, 'D');

      doc.setTextColor(colorDark[0], colorDark[1], colorDark[2]);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('1. Detalhes da Simulação de Ambiente', 26, y + 9);

      const items = [
        ['Ambiente / Tipologia:', currentEnv.name],
        ['Modelo de Ladrilho:', `${currentTile.name} (${currentTile.dimensions})`],
        ['Tonalidade de Rejunte:', currentGrout.name],
        ['Aplicação Prevista:', applicationLabels[applicationType]],
        ['Área Estimada do Projeto:', `${areaSquareMeters} m²`],
        ['Quantidade com Quebra Técnica:', `~${estimatedPieces} peças (margem de ${safetyMarginPercent}%)`],
        ['Peso Estimado para Frete:', `~${estimatedWeightKg} kg (38 kg/m²)`]
      ];

      doc.setFontSize(9);
      let lineY = y + 17;
      items.forEach(([label, value]) => {
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(90, 90, 90);
        doc.text(label, 26, lineY);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(20, 20, 20);
        doc.text(value, 95, lineY);
        lineY += 7.5;
      });

      // Box 2: Especificações Técnicas de Engenharia
      y += 82;
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(200, 200, 200);
      doc.roundedRect(20, y, 170, 68, 3, 3, 'D');

      doc.setTextColor(colorDark[0], colorDark[1], colorDark[2]);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('2. Recomendações e Especificações Construtivas', 26, y + 9);

      const specs = [
        ['Processo de Fabricação:', 'Prensagem hidráulica com matriz metálica artesanal'],
        ['Processo de Cura:', 'Cura hidráulica por imersão em água por 28 dias (0% queima)'],
        ['Espessura Total:', '18 mm (Camada pura de desgaste colorida: 4 a 5 mm)'],
        ['Resistência Mecânica:', '≥ 25 MPa (Tráfego residencial e comercial nobre)'],
        ['Argamassa Recomendada:', 'Argamassa colante industrializada AC-III (dupla colagem)'],
        ['Junta de Assentamento:', '1,0 mm a 1,5 mm (Junta seca clássica)'],
        ['Tratamento de Proteção:', 'Oleofugante impermeabilizante hidrorrepelente pós-cura']
      ];

      doc.setFontSize(8.5);
      lineY = y + 17;
      specs.forEach(([label, value]) => {
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(110, 110, 110);
        doc.text(label, 26, lineY);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(30, 30, 30);
        doc.text(value, 78, lineY);
        lineY += 7;
      });

      // Box 3: Contatos e Próximos Passos
      y += 76;
      doc.setFillColor(colorDark[0], colorDark[1], colorDark[2]);
      doc.roundedRect(20, y, 170, 36, 3, 3, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text('COMO EFETIVAR SEU PEDIDO COM A ROCHBETON:', 26, y + 8);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(220, 220, 220);
      doc.text('1. Envie esta ficha técnica diretamente para o WhatsApp comercial: (11) 99100-8594.', 26, y + 15);
      doc.text('2. Nossa equipe técnica validará o cálculo das peças e enviará a cotação com valor de frete.', 26, y + 21);
      doc.text('3. Opcional: Solicite amostras físicas ou personalização de cores das nossas 32 tonalidades.', 26, y + 27);

      // Rodapé
      doc.setTextColor(140, 140, 140);
      doc.setFontSize(7.5);
      doc.text('Rochbeton Ladrilhos Hidráulicos Ltda. • CNPJ: 54.341.289/0001-85 • Taboão da Serra - SP', 105, 288, { align: 'center' });

      // Salva o PDF
      doc.save(`Rochbeton_Simulacao_${currentTile.id}.pdf`);
    } catch (err) {
      console.error('Erro ao gerar PDF:', err);
      // Fallback para impressão do navegador caso haja problema
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const stepsList = [
    { number: 1, title: 'Ambiente', subtitle: 'Escolha o espaço' },
    { number: 2, title: 'Ladrilho', subtitle: 'Selecione o modelo' },
    { number: 3, title: 'Rejunte', subtitle: 'Cor e escala visual' },
    { number: 4, title: 'Metragem', subtitle: 'Área e quantitativo' },
    { number: 5, title: 'Conclusão', subtitle: 'Resumo & Envio' },
  ];

  return (
    <section id="simulador" className="py-24 bg-[#1C1D1F] text-white relative overflow-hidden">
      {/* Luz ambiente de fundo */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#B85D43]/20 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#C49746]/15 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabeçalho da Seção na Página */}
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#C49746] text-xs font-semibold tracking-wider uppercase border border-white/10 backdrop-blur-md">
            <span>Pilar 3 • Experiência Interativa Guiada</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl font-semibold text-white tracking-tight">
            Simulador de Ambientes & Paginações
          </h2>
          <p className="text-stone-300 text-base sm:text-lg">
            Experimente o passo a passo imersivo em tela cheia para planejar seu ambiente com texturas de ladrilho, tons de rejunte e cálculo automático de peças.
          </p>
        </div>

        {/* Card Teaser / Convite para Iniciar Onboarding em Tela Cheia */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-stone-900 via-stone-850 to-stone-900 border border-white/15 p-8 sm:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="space-y-6 max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B85D43]/20 text-[#B85D43] text-xs font-bold border border-[#B85D43]/30">
              <span>Etapas Guiadas • Onboarding 5 Passos</span>
            </div>

            <h3 className="font-editorial text-2xl sm:text-4xl font-bold text-white leading-tight">
              Crie a simulação do seu projeto em tela cheia e receba o PDF executivo.
            </h3>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Escolha o ambiente (cozinha, sala, varanda ou frontão), selecione entre 6 clássicos da Rochbeton, ajuste o tom de rejunte e receba o orçamento pronto para envio no WhatsApp ou download em PDF.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 justify-center lg:justify-start">
              <button
                onClick={() => {
                  setIsFullScreen(true);
                  setCurrentStep(1);
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#B85D43] hover:bg-[#984832] text-white font-semibold text-sm sm:text-base tracking-wide shadow-xl flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Iniciar Simulação em Tela Cheia</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </button>

              <span className="text-xs text-stone-400 font-medium">Leva menos de 1 minuto</span>
            </div>
          </div>

          {/* Preview Visual Flutuante do Teaser */}
          <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden bg-stone-950 border border-white/10 shadow-2xl flex items-end p-4 group cursor-pointer"
            onClick={() => {
              setIsFullScreen(true);
              setCurrentStep(1);
            }}
          >
            <img
              src={currentEnv.perspectiveImage}
              alt="Preview do ambiente"
              className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent"></div>

            <div className="relative z-10 w-full p-4 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#C49746]">Modelo Atual</span>
                <div className="text-xs font-bold text-white">{currentTile.name}</div>
              </div>
              <span className="text-xs px-3 py-1.5 rounded-lg bg-[#B85D43] text-white font-semibold flex items-center gap-1">
                <span>Abrir</span>
                <span>↗</span>
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* ======================================================== */}
      {/* MODAL FULLSCREEN ONBOARDING (Tela Cheia em 5 Etapas)    */}
      {/* ======================================================== */}
      {isFullScreen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#141517] text-white flex flex-col animate-fadeIn">
          
          {/* TOPO: Barra de Navegação e Stepper estilo Apple */}
          <header className="sticky top-0 z-30 bg-[#1C1D1F]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-4 flex items-center justify-between gap-4">
            
            {/* Logo e Nome da Etapa */}
            <div className="flex items-center gap-3">
              <img
                src="/images/logo-rochbeton.png"
                alt="Rochbeton"
                className="h-8 w-auto filter brightness-110 hidden sm:block"
              />
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#B85D43] font-bold block">
                  Simulador de Ambientes • Rochbeton
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Passo {currentStep} de 5: {stepsList[currentStep - 1].title}
                </h3>
              </div>
            </div>

            {/* Stepper Visual Central (Oculto em telas muito pequenas) */}
            <div className="hidden md:flex items-center gap-2">
              {stepsList.map(step => (
                <button
                  key={step.number}
                  onClick={() => setCurrentStep(step.number)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    currentStep === step.number
                      ? 'bg-white/20 text-white ring-1 ring-white/50'
                      : currentStep > step.number
                      ? 'bg-[#B85D43]/30 text-white hover:bg-[#B85D43]/40'
                      : 'text-stone-500 hover:text-stone-300'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                    currentStep === step.number
                      ? 'bg-[#B85D43] text-white'
                      : currentStep > step.number
                      ? 'bg-emerald-600 text-white'
                      : 'bg-stone-800 text-stone-400'
                  }`}>
                    {currentStep > step.number ? '✓' : step.number}
                  </span>
                  <span>{step.title}</span>
                </button>
              ))}
            </div>

            {/* Botão Fechar Tela Cheia */}
            <button
              onClick={() => setIsFullScreen(false)}
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>✕</span>
              <span className="hidden sm:inline">Sair do Modo Tela Cheia</span>
            </button>
          </header>

          {/* Barra de Progresso Superior */}
          <div className="w-full bg-stone-800 h-1">
            <div
              className="bg-gradient-to-r from-[#B85D43] to-[#C49746] h-1 transition-all duration-500"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            ></div>
          </div>

          {/* CONTEÚDO PRINCIPAL DO ONBOARDING (Split Screen Maquete vs Controles) */}
          <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-6 sm:py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LADO ESQUERDO: Maquete Visual em Tempo Real (5 colunas no desktop) */}
            <div className="lg:col-span-5 sticky top-24 space-y-4">
              <div className="relative rounded-3xl overflow-hidden bg-stone-950 border border-white/15 shadow-2xl">
                
                {/* Topo da Maquete */}
                <div className="px-4 py-3 bg-black/60 backdrop-blur-md border-b border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span className="font-semibold text-stone-200 ml-1 truncate max-w-[160px]">{currentEnv.name}</span>
                  </div>
                  <span className="text-[10px] text-[#C49746] font-mono">{gridDensity}x{gridDensity}</span>
                </div>

                {/* Área da Maquete 3D Interativa */}
                <div className="relative h-[280px] sm:h-[360px] w-full overflow-hidden flex flex-col justify-end">
                  <img
                    src={currentEnv.perspectiveImage}
                    alt={currentEnv.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-85 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent"></div>

                  {/* Piso 3D Dinâmico com Rejunte */}
                  <div className="relative w-full h-[52%] px-4 sm:px-6 pb-3 flex items-end">
                    <div
                      className="w-full h-full rounded-2xl p-2 overflow-hidden shadow-2xl transition-all duration-300 relative border"
                      style={{
                        backgroundColor: currentGrout.hex,
                        borderColor: currentGrout.borderHex,
                        transform: 'perspective(600px) rotateX(24deg)',
                        transformOrigin: 'bottom center',
                      }}
                    >
                      <div
                        className="w-full h-full grid gap-1"
                        style={{
                          gridTemplateColumns: `repeat(${gridDensity * 2}, 1fr)`,
                          gridTemplateRows: `repeat(${gridDensity}, 1fr)`,
                          backgroundColor: currentGrout.hex,
                        }}
                      >
                        {Array.from({ length: gridDensity * gridDensity * 2 }).map((_, i) => (
                          <div
                            key={i}
                            className="w-full h-full bg-[#F3EFE6] rounded-xs overflow-hidden shadow-xs"
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

                  {/* Tag Flutuante do Ladrilho */}
                  <div className="absolute top-3 left-3 p-2.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-xs">
                    <div className="text-[9px] uppercase font-bold text-[#C49746]">Ladrilho Ativo</div>
                    <div className="font-bold text-white text-xs">{currentTile.name}</div>
                    <div className="text-[10px] text-stone-300">Rejunte: {currentGrout.name.split(' ')[0]}</div>
                  </div>
                </div>

                {/* Rodapé da Maquete */}
                <div className="p-3 bg-stone-900 border-t border-white/10 text-[11px] text-stone-400 flex items-center justify-between">
                  <span>Dimensões: <strong className="text-white">{currentTile.dimensions}</strong></span>
                  <span>Cura: <strong className="text-emerald-400">100% na água</strong></span>
                </div>
              </div>

              {/* Dica da Etapa */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-stone-300 flex items-center gap-3">
                <span className="text-xl">💡</span>
                <p>
                  As alterações feitas nos passos à direita refletem instantaneamente no visualizador 3D.
                </p>
              </div>
            </div>

            {/* LADO DIREITO: Passos do Onboarding (7 colunas no desktop) */}
            <div className="lg:col-span-7 bg-white/5 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl flex flex-col justify-between min-h-[500px]">
              
              {/* CONTEÚDO DA ETAPA ATUAL */}
              <div>
                
                {/* ==================================================== */}
                {/* PASSO 1: ESCOLHA DO AMBIENTE                          */}
                {/* ==================================================== */}
                {currentStep === 1 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div>
                      <span className="text-xs font-bold text-[#B85D43] uppercase tracking-wider">Etapa 1 de 5</span>
                      <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white mt-1">
                        Qual ambiente você deseja transformar?
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-400 mt-1">
                        Selecione o espaço do seu projeto residencial ou comercial para carregar a perspectiva ideal.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {environments.map(env => {
                        const isSelected = selectedEnvId === env.id;
                        return (
                          <div
                            key={env.id}
                            onClick={() => {
                              setSelectedEnvId(env.id);
                              if (env.defaultTileId) setSelectedTileId(env.defaultTileId);
                            }}
                            className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center gap-4 ${
                              isSelected
                                ? 'bg-[#B85D43]/20 border-[#B85D43] ring-2 ring-[#B85D43]/40 shadow-lg'
                                : 'bg-stone-900/60 border-white/5 hover:bg-stone-850 hover:border-white/20'
                            }`}
                          >
                            <img
                              src={env.perspectiveImage}
                              alt={env.name}
                              className="w-16 h-16 rounded-xl object-cover flex-shrink-0 border border-white/10"
                            />
                            <div className="space-y-1">
                              <h4 className="text-sm font-bold text-white">{env.name}</h4>
                              <p className="text-[11px] text-stone-400 line-clamp-2 leading-tight">
                                {env.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ==================================================== */}
                {/* PASSO 2: ESCOLHA DO MODELO DE LADRILHO                */}
                {/* ==================================================== */}
                {currentStep === 2 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div>
                      <span className="text-xs font-bold text-[#B85D43] uppercase tracking-wider">Etapa 2 de 5</span>
                      <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white mt-1">
                        Escolha o padrão do ladrilho hidráulico
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-400 mt-1">
                        Cada matriz foi desenhada e prensada artesanalmente com óxidos minerais nobres.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {selectableTiles.map(tile => {
                        const isSelected = selectedTileId === tile.id;
                        return (
                          <div
                            key={tile.id}
                            onClick={() => setSelectedTileId(tile.id)}
                            className={`p-3 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col items-center text-center ${
                              isSelected
                                ? 'bg-[#B85D43]/25 border-[#B85D43] ring-2 ring-[#B85D43]/50 shadow-lg'
                                : 'bg-stone-900/60 border-white/5 hover:bg-stone-850 hover:border-white/20'
                            }`}
                          >
                            <div className="w-16 h-16 rounded-xl bg-[#F9F8F6] p-1.5 mb-2.5 border border-white/20 shadow-inner flex items-center justify-center">
                              <img
                                src={tile.tileSvg}
                                alt={tile.name}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <span className="text-xs font-bold text-white leading-tight line-clamp-1">
                              {tile.name}
                            </span>
                            <span className="text-[10px] text-[#C49746] mt-0.5 font-medium">
                              {tile.dimensions}
                            </span>
                            <span className="text-[9px] text-stone-400 mt-0.5">
                              {tile.category}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ==================================================== */}
                {/* PASSO 3: REJUNTE & ESCALA DA PAGINAÇÃO               */}
                {/* ==================================================== */}
                {currentStep === 3 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div>
                      <span className="text-xs font-bold text-[#B85D43] uppercase tracking-wider">Etapa 3 de 5</span>
                      <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white mt-1">
                        Harmonia de Rejunte & Escala Visual
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-400 mt-1">
                        A cor do rejunte muda completamente a leitura geométrica do ladrilho no piso.
                      </p>
                    </div>

                    {/* Cores de Rejunte */}
                    <div className="space-y-3">
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-300 block">
                        Tonalidade do Rejunte
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {groutColors.map(grout => {
                          const isSelected = selectedGroutId === grout.id;
                          return (
                            <div
                              key={grout.id}
                              onClick={() => setSelectedGroutId(grout.id)}
                              className={`p-3.5 rounded-2xl border flex items-center gap-3 transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-white/20 border-white ring-2 ring-white/40 shadow-md'
                                  : 'bg-stone-900/60 border-white/5 hover:bg-stone-850'
                              }`}
                            >
                              <span
                                className="w-6 h-6 rounded-full border border-stone-500 shadow-inner flex-shrink-0"
                                style={{ backgroundColor: grout.hex }}
                              />
                              <div>
                                <div className="text-xs font-bold text-white">{grout.name}</div>
                                <div className="text-[10px] text-stone-400">Junta 1,0 a 1,5 mm</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Escala / Densidade */}
                    <div className="space-y-3 pt-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-300 block">
                        Densidade do Padrão / Escala de Repetição
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { val: 2, label: '2x2 Amplo', desc: 'Peças grandes' },
                          { val: 3, label: '3x3 Padrão', desc: 'Ritmo equilibrado' },
                          { val: 4, label: '4x4 Compacto', desc: 'Desenho contínuo' },
                        ].map(item => (
                          <button
                            key={item.val}
                            onClick={() => setGridDensity(item.val)}
                            className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                              gridDensity === item.val
                                ? 'bg-[#B85D43] border-[#B85D43] text-white shadow-md'
                                : 'bg-stone-900/60 border-white/5 text-stone-400 hover:bg-stone-850 hover:text-white'
                            }`}
                          >
                            <div className="text-xs font-bold text-white">{item.label}</div>
                            <div className="text-[10px] text-stone-300 mt-0.5">{item.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ==================================================== */}
                {/* PASSO 4: METRAGEM & QUANTITATIVO DO PROJETO           */}
                {/* ==================================================== */}
                {currentStep === 4 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div>
                      <span className="text-xs font-bold text-[#B85D43] uppercase tracking-wider">Etapa 4 de 5</span>
                      <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white mt-1">
                        Área e Quantitativo de Peças
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-400 mt-1">
                        Informe as medidas aproximadas para calcularmos as peças e a margem de quebra técnica.
                      </p>
                    </div>

                    {/* Tipo de Aplicação */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-300 block">
                        Local de Aplicação
                      </label>
                      <div className="grid grid-cols-3 gap-2.5">
                        {[
                          { id: 'piso', label: 'Piso' },
                          { id: 'parede', label: 'Parede' },
                          { id: 'ambos', label: 'Piso + Parede' },
                        ].map(app => (
                          <button
                            key={app.id}
                            onClick={() => setApplicationType(app.id as any)}
                            className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                              applicationType === app.id
                                ? 'bg-white/20 border-white text-white'
                                : 'bg-stone-900/60 border-white/5 text-stone-400 hover:bg-stone-850'
                            }`}
                          >
                            {app.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Metragem m² */}
                    <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-stone-300">Área Estimada do Projeto:</span>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="1"
                            max="500"
                            value={areaSquareMeters}
                            onChange={(e) => setAreaSquareMeters(Math.max(1, Number(e.target.value) || 1))}
                            className="w-20 px-3 py-1.5 bg-stone-900 border border-white/30 rounded-xl text-white font-bold text-center text-sm focus:ring-2 focus:ring-[#B85D43] focus:outline-none"
                          />
                          <span className="text-sm font-bold text-stone-300">m²</span>
                        </div>
                      </div>

                      {/* Slider de Metragem */}
                      <input
                        type="range"
                        min="2"
                        max="120"
                        value={areaSquareMeters}
                        onChange={(e) => setAreaSquareMeters(Number(e.target.value))}
                        className="w-full accent-[#B85D43] cursor-pointer"
                      />

                      {/* Margem de Quebra */}
                      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                        <span className="text-stone-400">Margem técnica para recortes:</span>
                        <div className="flex gap-2">
                          {[5, 10].map(m => (
                            <button
                              key={m}
                              onClick={() => setSafetyMarginPercent(m)}
                              className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                                safetyMarginPercent === m
                                  ? 'bg-[#C49746] text-white'
                                  : 'bg-stone-800 text-stone-400 hover:bg-stone-700'
                              }`}
                            >
                              +{m}%
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Resumo do Cálculo */}
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="p-3.5 rounded-2xl bg-stone-900 border border-white/10">
                        <span className="text-[11px] text-stone-400 block font-medium">Total com Margem:</span>
                        <span className="text-xl font-bold text-[#C49746]">~{estimatedPieces} peças</span>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-stone-900 border border-white/10">
                        <span className="text-[11px] text-stone-400 block font-medium">Peso Estimado da Carga:</span>
                        <span className="text-xl font-bold text-white">~{estimatedWeightKg} kg</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* ==================================================== */}
                {/* PASSO 5: RESUMO EXECUTIVO & EXPORTAÇÃO               */}
                {/* ==================================================== */}
                {currentStep === 5 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div>
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span>Etapa Final • Simulação Concluída</span>
                      </span>
                      <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white mt-1">
                        Resumo do Pedido do seu Ladrilho
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-400 mt-1">
                        Envie agora para nossa equipe técnica ou baixe o PDF executivo com a ficha de especificação.
                      </p>
                    </div>

                    {/* Ficha Resumo do Pedido */}
                    <div className="p-5 rounded-3xl bg-stone-900/90 border border-white/15 space-y-3 shadow-xl">
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <div className="flex items-center gap-3">
                          <img
                            src={currentTile.tileSvg}
                            alt={currentTile.name}
                            className="w-12 h-12 rounded-xl bg-[#F9F8F6] p-1 border border-stone-200"
                          />
                          <div>
                            <div className="text-sm font-bold text-white">{currentTile.name}</div>
                            <div className="text-xs text-[#C49746]">{currentTile.dimensions} • {currentEnv.name}</div>
                          </div>
                        </div>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-stone-800 text-stone-300">
                          {applicationLabels[applicationType]}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs pt-1">
                        <div className="p-2.5 rounded-xl bg-black/40">
                          <span className="text-[10px] text-stone-400 block">Rejunte:</span>
                          <span className="font-bold text-white">{currentGrout.name.split(' ')[0]}</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-black/40">
                          <span className="text-[10px] text-stone-400 block">Área Total:</span>
                          <span className="font-bold text-white">{areaSquareMeters} m²</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-black/40">
                          <span className="text-[10px] text-stone-400 block">Total Peças:</span>
                          <span className="font-bold text-[#C49746]">~{estimatedPieces} un.</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-black/40">
                          <span className="text-[10px] text-stone-400 block">Peso da Carga:</span>
                          <span className="font-bold text-white">~{estimatedWeightKg} kg</span>
                        </div>
                      </div>

                      <div className="text-[11px] text-stone-400 pt-2 flex items-center gap-2">
                        <span>🛡️</span>
                        <span>Resistência mecânica ≥ 25 MPa | Cura hidráulica na água sem queima.</span>
                      </div>
                    </div>

                    {/* BOTÕES DE EXPORTAÇÃO (WHATSAPP E PDF) */}
                    <div className="space-y-3 pt-2">
                      {/* Botão 1: WhatsApp */}
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm sm:text-base shadow-xl flex items-center justify-center gap-3 transition-transform duration-300 hover:scale-[1.02] active:scale-98"
                      >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.697c.974.532 1.802.814 2.806.815 3.183 0 5.77-2.587 5.77-5.767 0-3.18-2.587-5.766-5.77-5.766zm3.407 8.163c-.144.406-.834.774-1.157.822-.323.048-.745.068-1.206-.08-1.503-.482-2.541-1.637-2.618-1.74-.076-.102-.622-.828-.622-1.58 0-.751.393-1.121.532-1.265.14-.143.305-.18.406-.18.102 0 .204.002.292.006.094.005.219-.036.342.261.127.307.433 1.056.471 1.134.038.077.064.168.013.27-.051.102-.077.166-.153.254-.076.089-.16.198-.229.266-.076.076-.156.159-.067.311.089.153.395.652.848 1.055.582.518 1.074.679 1.227.755.153.076.242.064.331-.038.089-.102.382-.445.484-.598.102-.153.204-.127.343-.076.14.051.889.419 1.042.495.153.076.255.114.292.178.038.064.038.369-.106.775z"/>
                        </svg>
                        <span>Enviar Pedido pelo WhatsApp com Orçamento</span>
                      </a>

                      {/* Botão 2: Baixar PDF Executivo */}
                      <button
                        onClick={handleDownloadPdf}
                        disabled={isGeneratingPdf}
                        className="w-full py-3.5 px-6 rounded-2xl bg-white/15 hover:bg-white text-white hover:text-[#1C1D1F] font-semibold text-sm border border-white/20 shadow-md flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer disabled:opacity-50"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        <span>{isGeneratingPdf ? 'Gerando PDF Executivo...' : 'Baixar Ficha Técnica em PDF'}</span>
                      </button>
                    </div>
                  </div>
                )}

              </div>

              {/* BARRA INFERIOR: Botões de Navegação Anterior / Próximo */}
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between gap-4">
                <button
                  onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                  disabled={currentStep === 1}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold text-stone-300 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer flex items-center gap-1.5"
                >
                  <span>←</span>
                  <span>Etapa Anterior</span>
                </button>

                {currentStep < 5 ? (
                  <button
                    onClick={() => setCurrentStep(prev => Math.min(5, prev + 1))}
                    className="px-7 py-3 rounded-full bg-[#B85D43] hover:bg-[#984832] text-white font-semibold text-xs sm:text-sm tracking-wide shadow-lg flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
                  >
                    <span>Próximo Passo</span>
                    <span>→</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setIsFullScreen(false)}
                    className="px-6 py-2.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Concluir e Voltar ao Site
                  </button>
                )}
              </div>

            </div>

          </div>

        </div>
      )}

    </section>
  );
}

import React, { useState } from 'react';
import type { Product, ProductCategory } from '../types';
import { products } from '../data/products';

const tabs: { key: 'todos' | ProductCategory; label: string; badge?: string }[] = [
  { key: 'todos', label: 'Todos os Modelos' },
  { key: 'decorados', label: 'Ladrilhos Decorados', badge: '20×20 & 15×15' },
  { key: 'hexagonais', label: 'Hexagonais', badge: 'Orgânicos' },
  { key: 'antiderrapantes', label: 'Antiderrapantes', badge: 'Calçadas' },
  { key: 'podotatil', label: 'Linha Podotátil', badge: 'NBR 9050' },
  { key: 'faixas-rodapes', label: 'Faixas & Rodapés', badge: 'Molduras' },
  { key: 'tosetos', label: 'Tosetos', badge: '10×10 & 5×5' },
];

export default function ProductCatalogIsland() {
  const [activeTab, setActiveTab] = useState<'todos' | ProductCategory>('todos');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [hoveredTileId, setHoveredTileId] = useState<string | null>(null);

  const filteredProducts = activeTab === 'todos'
    ? products
    : products.filter(p => p.category === activeTab);

  const openSpecs = (product: Product) => {
    setSelectedProduct(product);
    document.body.style.overflow = 'hidden';
  };

  const closeSpecs = () => {
    setSelectedProduct(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="catalogo" className="py-24 bg-[#EFECE6]/40 relative border-t border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Seção */}
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C1D1F] text-white text-xs font-semibold tracking-wider uppercase">
            <span>Pilar 2 • Portfólio de Fabricação</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl font-semibold text-[#1C1D1F] tracking-tight">
            Catálogo de Modelos Físicos & Matrizes
          </h2>
          <p className="text-stone-600 text-base sm:text-lg">
            De ladrilhos históricos e geométricos a linhas técnicas de alta resistência antiderrapante e podotátil. Cada peça é prensada hidraulicamente com 5mm de camada pura de desgaste.
          </p>
        </div>

        {/* Abas de Navegação do Catálogo */}
        <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar">
          {tabs.map(tab => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#B85D43] text-white shadow-md shadow-[#B85D43]/20 scale-102'
                    : 'bg-white text-stone-700 hover:text-[#1C1D1F] hover:bg-stone-50 border border-stone-200'
                }`}
              >
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-500'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Grid de Cards de Produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => {
            const isHovered = hoveredTileId === product.id;
            return (
              <div
                key={product.id}
                onMouseEnter={() => setHoveredTileId(product.id)}
                onMouseLeave={() => setHoveredTileId(null)}
                className="group bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-[0_8px_25px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Visualizador de Peça / Preview de Repetição 2x2 */}
                <div className="relative aspect-square w-full bg-[#F4EFE6]/50 p-6 flex items-center justify-center overflow-hidden border-b border-stone-100">
                  
                  {/* Badges de Destaque */}
                  <div className="absolute top-3.5 left-3.5 flex flex-col gap-1 z-10">
                    {product.isBestseller && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#B85D43] text-white tracking-wide shadow-xs">
                        Mais Pedido
                      </span>
                    )}
                    {product.isNew && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white tracking-wide shadow-xs">
                        Lançamento
                      </span>
                    )}
                  </div>

                  {/* Dimensões Tag */}
                  <div className="absolute top-3.5 right-3.5 z-10">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/90 text-stone-700 backdrop-blur-sm border border-stone-200 shadow-xs">
                      {product.dimensions}
                    </span>
                  </div>

                  {/* Imagem Normal vs Preview 2x2 no Hover */}
                  <div className="relative w-44 h-44 transition-transform duration-500 group-hover:scale-105">
                    {/* Imagem Isolada da Peça */}
                    <img
                      src={product.primaryImage}
                      alt={product.name}
                      className={`w-full h-full object-contain filter drop-shadow-md transition-opacity duration-300 ${
                        isHovered && product.patternImage !== product.primaryImage ? 'opacity-0 scale-95' : 'opacity-100'
                      }`}
                    />

                    {/* Preview Repetido 2x2 ou em Ambiente Aplicado no Hover */}
                    {product.patternImage !== product.primaryImage && (
                      <div className={`absolute inset-0 rounded-2xl overflow-hidden transition-opacity duration-300 ${
                        isHovered ? 'opacity-100 scale-100' : 'opacity-0 pointer-events-none'
                      }`}>
                        <img
                          src={product.patternImage}
                          alt={`${product.name} aplicado`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <span className="text-[11px] font-semibold text-white bg-black/60 px-3 py-1 rounded-full backdrop-blur-xs">
                            Vista em Ambiente
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Indicador de hover tátil */}
                  <div className="absolute bottom-2 text-[10px] text-stone-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Passe o mouse para ver aplicado
                  </div>
                </div>

                {/* Conteúdo Informativo */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-[11px] font-semibold text-[#B85D43] uppercase tracking-wider">
                      {product.categoryLabel}
                    </div>
                    <h3 className="text-base font-bold text-[#1C1D1F] mt-1 group-hover:text-[#B85D43] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-stone-600 mt-1.5 line-clamp-2 leading-relaxed">
                      {product.shortDescription}
                    </p>
                  </div>

                  {/* Paleta de Cores e Ações */}
                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                    {/* Amostras das cores do modelo */}
                    <div className="flex items-center gap-1.5" title="Pigmentos minerais da peça">
                      {product.colors.slice(0, 4).map((c, i) => (
                        <span
                          key={i}
                          className="w-3.5 h-3.5 rounded-full border border-stone-300 shadow-xs inline-block"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>

                    <button
                      onClick={() => openSpecs(product)}
                      className="px-3.5 py-1.5 rounded-xl bg-stone-100 hover:bg-[#1C1D1F] text-stone-800 hover:text-white text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1"
                    >
                      <span>Ficha Técnica</span>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* MODAL / FICHA TÉCNICA DO PRODUTO (Para Arquitetos e Construtores) */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-fadeIn">
            <div className="absolute inset-0" onClick={closeSpecs}></div>

            <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl border border-stone-200 shadow-2xl z-10 p-6 sm:p-8 flex flex-col space-y-6">
              
              {/* Botão Fechar */}
              <button
                onClick={closeSpecs}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Fechar ficha técnica"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>

              {/* Topo do Produto */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-stone-200 pb-6">
                <div className="w-36 h-36 rounded-2xl bg-[#F9F8F6] border border-stone-200 p-3 flex-shrink-0 flex items-center justify-center shadow-inner">
                  <img
                    src={selectedProduct.primaryImage}
                    alt={selectedProduct.name}
                    className="w-full h-full object-contain filter drop-shadow-md"
                  />
                </div>
                <div className="text-center sm:text-left space-y-2 flex-1">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#B85D43]/10 text-[#B85D43] uppercase tracking-wider">
                    {selectedProduct.categoryLabel}
                  </span>
                  <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1C1D1F]">
                    {selectedProduct.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {selectedProduct.fullDescription}
                  </p>
                </div>
              </div>

              {/* Tabela de Especificações Técnicas para Arquitetos */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  Especificações Técnicas Construtivas
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/70">
                    <span className="text-stone-500 block font-medium">Dimensões Nominais</span>
                    <strong className="text-stone-900 text-sm">{selectedProduct.dimensions}</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/70">
                    <span className="text-stone-500 block font-medium">Espessura Total / Desgaste</span>
                    <strong className="text-stone-900 text-sm">{selectedProduct.specs.espessura}</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/70">
                    <span className="text-stone-500 block font-medium">Peso Estimado por m²</span>
                    <strong className="text-stone-900 text-sm">{selectedProduct.specs.pesoPorM2}</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/70">
                    <span className="text-stone-500 block font-medium">Rendimento de Peças</span>
                    <strong className="text-stone-900 text-sm">{selectedProduct.specs.pecasPorM2}</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/70">
                    <span className="text-stone-500 block font-medium">Resistência à Compressão</span>
                    <strong className="text-stone-900 text-sm">{selectedProduct.specs.resistenciaMpa}</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/70">
                    <span className="text-stone-500 block font-medium">Junta de Assentamento Sugerida</span>
                    <strong className="text-stone-900 text-sm">{selectedProduct.specs.juntaRecomendada}</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/70 sm:col-span-2">
                    <span className="text-stone-500 block font-medium">Tratamento & Hidrofugação</span>
                    <strong className="text-stone-900">{selectedProduct.specs.impermeabilizacao}</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/70 sm:col-span-2">
                    <span className="text-stone-500 block font-medium">Uso e Tráfego Recomendado</span>
                    <strong className="text-stone-900">{selectedProduct.specs.usoIndicado}</strong>
                  </div>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/5511991008594?text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20or%C3%A7amento%20para%20o%20ladrilho%20"${encodeURIComponent(selectedProduct.name)}"%20(${encodeURIComponent(selectedProduct.dimensions)})%20da%20Rochbeton.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3.5 rounded-2xl bg-[#B85D43] hover:bg-[#984832] text-white font-semibold text-sm shadow-md flex items-center justify-center gap-2 transition-transform active:scale-98"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.697c.974.532 1.802.814 2.806.815 3.183 0 5.77-2.587 5.77-5.767 0-3.18-2.587-5.766-5.77-5.766zm3.407 8.163c-.144.406-.834.774-1.157.822-.323.048-.745.068-1.206-.08-1.503-.482-2.541-1.637-2.618-1.74-.076-.102-.622-.828-.622-1.58 0-.751.393-1.121.532-1.265.14-.143.305-.18.406-.18.102 0 .204.002.292.006.094.005.219-.036.342.261.127.307.433 1.056.471 1.134.038.077.064.168.013.27-.051.102-.077.166-.153.254-.076.089-.16.198-.229.266-.076.076-.156.159-.067.311.089.153.395.652.848 1.055.582.518 1.074.679 1.227.755.153.076.242.064.331-.038.089-.102.382-.445.484-.598.102-.153.204-.127.343-.076.14.051.889.419 1.042.495.153.076.255.114.292.178.038.064.038.369-.106.775z"/>
                  </svg>
                  <span>Pedir Orçamento deste Modelo no WhatsApp</span>
                </a>

                <button
                  onClick={closeSpecs}
                  className="px-6 py-3.5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-sm transition-colors cursor-pointer"
                >
                  Continuar Explorando
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}

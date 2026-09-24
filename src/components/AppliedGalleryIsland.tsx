import React, { useState } from 'react';
import type { ProjectRoom } from '../types';
import { projects } from '../data/projects';

type CategoryFilter = 'todos' | 'cozinhas' | 'varandas' | 'banheiros' | 'salas' | 'comercial';

const filterLabels: { key: CategoryFilter; label: string }[] = [
  { key: 'todos', label: 'Todos os Ambientes' },
  { key: 'cozinhas', label: 'Cozinhas & Gourmet' },
  { key: 'varandas', label: 'Varandas & Externas' },
  { key: 'banheiros', label: 'Banheiros & Lavabos' },
  { key: 'salas', label: 'Salas & Livings' },
  { key: 'comercial', label: 'Comercial & Fachadas' },
];

export default function AppliedGalleryIsland() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('todos');
  const [selectedProject, setSelectedProject] = useState<ProjectRoom | null>(null);

  const filteredProjects = activeFilter === 'todos'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const openSpotlight = (project: ProjectRoom) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeSpotlight = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="galeria" class="py-24 bg-[#F9F8F6] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Seção */}
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B85D43]/10 text-[#B85D43] text-xs font-semibold tracking-wider uppercase">
            <span>Pilar 1 • Obras Aplicadas</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl font-semibold text-[#1C1D1F] tracking-tight">
            Veja como o ladrilho transforma a vida do ambiente.
          </h2>
          <p className="text-stone-600 text-base sm:text-lg">
            Projetos reais assinados por arquitetos renomados e executados com as matrizes artesanais da Rochbeton. Clique em qualquer foto para ver a peça utilizada e pedir seu orçamento.
          </p>
        </div>

        {/* Barra de Filtros Liquid Glass */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {filterLabels.map(f => {
            const isActive = activeFilter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#1C1D1F] text-white shadow-md scale-105'
                    : 'bg-white/80 hover:bg-white text-stone-700 hover:text-[#1C1D1F] border border-stone-200/60'
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Grid de Projetos Reais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map(project => (
            <div
              key={project.id}
              onClick={() => openSpotlight(project)}
              className="group relative bg-white rounded-3xl overflow-hidden border border-stone-200/60 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col transform hover:-translate-y-1"
            >
              {/* Imagem do Projeto */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

                {/* Badge da Categoria */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-white/90 text-[#1C1D1F] backdrop-blur-md shadow-xs">
                    {project.categoryLabel}
                  </span>
                </div>

                {/* Miniatura flutuante da Peça Usada (Spotlight Preview) */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 rounded-2xl bg-white/90 backdrop-blur-md border border-white/70 shadow-lg">
                  <div className="flex items-center gap-3">
                    <img
                      src={project.usedTileThumb}
                      alt={project.usedTileName}
                      className="w-10 h-10 rounded-lg object-contain bg-[#F9F8F6] p-0.5 border border-stone-200"
                    />
                    <div>
                      <div className="text-[10px] text-[#B85D43] font-bold uppercase tracking-wider">Peça Usada</div>
                      <div className="text-xs font-bold text-[#1C1D1F] truncate max-w-[140px] sm:max-w-[170px]">
                        {project.usedTileName}
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-[#1C1D1F] px-2.5 py-1 rounded-full bg-stone-100 group-hover:bg-[#B85D43] group-hover:text-white transition-colors duration-300">
                    Ver Obra ↗
                  </span>
                </div>
              </div>

              {/* Informações Textuais do Card */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1C1D1F] group-hover:text-[#B85D43] transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 flex items-center gap-1.5">
                    <span>{project.architect}</span>
                    <span>•</span>
                    <span>{project.location}</span>
                  </p>
                </div>
                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL / DRAWER SPOTLIGHT (Recurso Especial) */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md transition-all duration-300 animate-fadeIn">
            {/* Backdrop click */}
            <div className="absolute inset-0" onClick={closeSpotlight}></div>

            {/* Container do Modal Liquid Glass */}
            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-2xl rounded-3xl border border-white/80 shadow-[0_25px_60px_rgba(0,0,0,0.3)] z-10 flex flex-col md:flex-row overflow-hidden">
              
              {/* Botão Fechar */}
              <button
                onClick={closeSpotlight}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Fechar modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>

              {/* Lado Esquerdo: Imagem da Obra em Alta Resolução */}
              <div className="md:w-3/5 bg-stone-900 relative min-h-[300px] md:min-h-[500px]">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-medium">
                  {selectedProject.location}
                </div>
              </div>

              {/* Lado Direito: Spotlight da Peça e Ação de Orçamento */}
              <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-stone-50/50">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B85D43]/10 text-[#B85D43] text-xs font-semibold">
                    <span>Spotlight da Obra</span>
                  </div>

                  <div>
                    <h3 className="font-editorial text-2xl font-bold text-[#1C1D1F] leading-snug">
                      {selectedProject.title}
                    </h3>
                    <p className="text-xs text-stone-500 mt-1">
                      Projeto: <span className="font-semibold text-stone-700">{selectedProject.architect}</span>
                    </p>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {selectedProject.description}
                  </p>

                  {/* Card em destaque da PEÇA USADA */}
                  <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-sm space-y-3">
                    <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                      Modelo do Ladrilho Aplicado
                    </div>
                    <div className="flex items-center gap-3">
                      <img
                        src={selectedProject.usedTileThumb}
                        alt={selectedProject.usedTileName}
                        className="w-14 h-14 rounded-xl object-contain bg-[#F9F8F6] border border-stone-200 p-1"
                      />
                      <div>
                        <div className="text-sm font-bold text-[#1C1D1F]">
                          {selectedProject.usedTileName}
                        </div>
                        <div className="text-xs text-stone-500 mt-0.5">
                          Formato: <span className="font-medium text-stone-800">{selectedProject.usedTileDimensions}</span>
                        </div>
                        <div className="text-xs text-stone-500 mt-0.5">
                          Rejunte: <span className="font-medium text-stone-800">{selectedProject.usedGroutColor}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-[11px] text-stone-500 bg-stone-100 p-3 rounded-xl border border-stone-200">
                    💡 <strong>Personalização:</strong> Você pode solicitar este mesmo desenho com outras combinações de pigmentos da nossa paleta de 32 cores artesanais.
                  </div>
                </div>

                {/* Botão de Orçamento Direto WhatsApp */}
                <div className="pt-2">
                  <a
                    href={`https://wa.me/5511991008594?text=Ol%C3%A1!%20Vi%20o%20projeto%20"${encodeURIComponent(selectedProject.title)}"%20no%20site%20da%20Rochbeton%20com%20o%20ladrilho%20"${encodeURIComponent(selectedProject.usedTileName)}"%20e%20gostaria%20de%20um%20or%C3%A7amento%20para%20minha%20obra.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-2xl bg-[#B85D43] hover:bg-[#984832] text-white font-semibold text-sm shadow-lg flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-98"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.697c.974.532 1.802.814 2.806.815 3.183 0 5.77-2.587 5.77-5.767 0-3.18-2.587-5.766-5.77-5.766zm3.407 8.163c-.144.406-.834.774-1.157.822-.323.048-.745.068-1.206-.08-1.503-.482-2.541-1.637-2.618-1.74-.076-.102-.622-.828-.622-1.58 0-.751.393-1.121.532-1.265.14-.143.305-.18.406-.18.102 0 .204.002.292.006.094.005.219-.036.342.261.127.307.433 1.056.471 1.134.038.077.064.168.013.27-.051.102-.077.166-.153.254-.076.089-.16.198-.229.266-.076.076-.156.159-.067.311.089.153.395.652.848 1.055.582.518 1.074.679 1.227.755.153.076.242.064.331-.038.089-.102.382-.445.484-.598.102-.153.204-.127.343-.076.14.051.889.419 1.042.495.153.076.255.114.292.178.038.064.038.369-.106.775z"/>
                    </svg>
                    <span>Pedir Orçamento desta Paginação</span>
                  </a>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}

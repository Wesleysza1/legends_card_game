import { useGameStore } from '@/store/gameStore'
import { getImageUrl } from '@/lib/utils'

export function MainMenu() {
  const setPhase = useGameStore((state) => state.setPhase)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ 
          backgroundImage: `url(${getImageUrl('monsters/dragao_ruinas.webp')})`,
          filter: 'blur(2px)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-4 text-center">
        <div className="space-y-4">
          <p className="text-primary font-medium tracking-[0.3em] uppercase text-sm">
            Legends
          </p>
          <h1 className="text-5xl md:text-7xl font-fantasy font-bold text-foreground tracking-wide">
            Card Game
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
            Enfrente monstros, colete equipamentos e seja o primeiro a equipar 3 Reliquias Lendarias!
          </p>
        </div>

        <div className="flex flex-col gap-4 mt-8">
          <button
            onClick={() => setPhase('character-select')}
            className="px-12 py-4 bg-primary text-primary-foreground font-fantasy text-xl rounded-lg
                     hover:bg-primary/90 transition-all duration-200 hover:scale-105
                     shadow-lg shadow-primary/25"
          >
            Nova Aventura
          </button>
          
          <button
            className="px-12 py-4 bg-secondary text-secondary-foreground font-fantasy text-lg rounded-lg
                     hover:bg-secondary/80 transition-all duration-200
                     border border-border"
          >
            Como Jogar
          </button>
        </div>

        <div className="mt-12 flex gap-8 text-muted-foreground text-sm">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <span>6 Herois</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center">
              <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <span>24 Monstros</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center">
              <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <span>20 Reliquias</span>
          </div>
        </div>
      </div>
    </div>
  )
}

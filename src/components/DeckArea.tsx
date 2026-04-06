import { cn } from '@/lib/utils'

interface DeckAreaProps {
  monsterCount: number
  lootCount: number
  onDrawMonster: () => void
  onDrawLoot: () => void
}

export function DeckArea({ monsterCount, lootCount, onDrawMonster, onDrawLoot }: DeckAreaProps) {
  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h2 className="font-fantasy text-2xl text-foreground mb-6">Baralhos</h2>

      <div className="grid grid-cols-2 gap-6">
        {/* Monster Deck */}
        <div className="space-y-3">
          <button
            onClick={onDrawMonster}
            disabled={monsterCount === 0}
            className={cn(
              'w-full aspect-[2/3] rounded-lg transition-all relative overflow-hidden',
              'bg-gradient-to-br from-red-900 to-red-950 border-2 border-red-700',
              'hover:scale-105 hover:shadow-xl hover:shadow-red-900/30',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
              monsterCount > 0 && 'deck-stack'
            )}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <svg className="w-12 h-12 text-red-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                  d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313-12.454z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M17.5 9.5l.5-.5-.5-.5m-5 3l.5-.5-.5-.5" />
              </svg>
              <span className="font-fantasy text-red-300 text-sm">Monstros</span>
              <span className="text-red-400/70 text-xs mt-1">{monsterCount} cartas</span>
            </div>
            
            {/* Card back pattern */}
            <div className="absolute inset-2 border border-red-700/50 rounded opacity-50" />
            <div className="absolute inset-4 border border-red-700/30 rounded opacity-30" />
          </button>
          
          <p className="text-center text-xs text-muted-foreground">
            Clique para comprar
          </p>
        </div>

        {/* Loot Deck */}
        <div className="space-y-3">
          <button
            onClick={onDrawLoot}
            disabled={lootCount === 0}
            className={cn(
              'w-full aspect-[2/3] rounded-lg transition-all relative overflow-hidden',
              'bg-gradient-to-br from-amber-800 to-amber-950 border-2 border-amber-600',
              'hover:scale-105 hover:shadow-xl hover:shadow-amber-900/30',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
              lootCount > 0 && 'deck-stack'
            )}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <svg className="w-12 h-12 text-amber-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span className="font-fantasy text-amber-300 text-sm">Tesouro</span>
              <span className="text-amber-400/70 text-xs mt-1">{lootCount} cartas</span>
            </div>
            
            {/* Card back pattern */}
            <div className="absolute inset-2 border border-amber-600/50 rounded opacity-50" />
            <div className="absolute inset-4 border border-amber-600/30 rounded opacity-30" />
          </button>
          
          <p className="text-center text-xs text-muted-foreground">
            Recompensa
          </p>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <h3 className="text-sm font-medium text-foreground mb-2">Como Jogar</h3>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>1. Compre um monstro para iniciar combate</li>
          <li>2. Derrote o monstro para ganhar Gloria</li>
          <li>3. Compre tesouros para equipar itens</li>
          <li>4. Equipe 3 Reliquias para vencer!</li>
        </ul>
      </div>
    </div>
  )
}

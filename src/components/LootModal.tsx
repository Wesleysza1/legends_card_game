import { getImageUrl, cn } from '@/lib/utils'
import type { Equipment, Relic, PlayerState } from '@/types/game'

interface LootModalProps {
  loot: Equipment | Relic
  player: PlayerState
  onEquip: (slot: number) => void
  onDiscard: () => void
}

const EQUIPMENT_SLOT_TYPES: Record<string, number[]> = {
  'Arma': [0],
  'Armadura': [1],
  'Escudo': [2],
  'Acessório': [3, 4],
}

export function LootModal({ loot, player, onEquip, onDiscard }: LootModalProps) {
  const isRelic = 'rarity' in loot && loot.rarity === 'legendary'
  
  const getAvailableSlots = () => {
    if (isRelic) {
      return player.relics
        .map((r, i) => ({ slot: i, occupied: r !== null }))
        .filter(s => !s.occupied)
    }
    
    const equipment = loot as Equipment
    const slotIndices = EQUIPMENT_SLOT_TYPES[equipment.type] || []
    return slotIndices.map(i => ({ slot: i, occupied: player.equipment[i] !== null }))
  }

  const availableSlots = getAvailableSlots()
  const hasEmptySlot = availableSlots.some(s => !s.occupied)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onDiscard}
      />
      
      {/* Modal */}
      <div className="relative bg-card border border-border rounded-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Relic glow effect */}
        {isRelic && (
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent pointer-events-none" />
        )}
        
        <div className="p-6">
          <div className="flex gap-6">
            {/* Card Image */}
            <div 
              className={cn(
                'w-32 aspect-[2/3] rounded-lg overflow-hidden border-2 flex-shrink-0',
                isRelic ? 'card-rarity-legendary' : `card-rarity-${(loot as Equipment).rarity}`
              )}
            >
              <img 
                src={getImageUrl(loot.image)} 
                alt={loot.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Card Info */}
            <div className="flex-1 min-w-0">
              <p className={cn(
                'text-xs font-medium uppercase tracking-wider',
                isRelic ? 'text-amber-400' : 'text-primary'
              )}>
                {isRelic ? 'Reliquia Lendaria' : (loot as Equipment).type}
              </p>
              <h2 className="text-2xl font-fantasy text-foreground mt-1">{loot.name}</h2>
              
              {'stat_bonus' in loot && Object.keys(loot.stat_bonus).length > 0 && (
                <div className="flex gap-3 mt-3">
                  {loot.stat_bonus.power && (
                    <span className="text-sm stat-power">+{loot.stat_bonus.power} POW</span>
                  )}
                  {loot.stat_bonus.defense && (
                    <span className="text-sm stat-defense">+{loot.stat_bonus.defense} DEF</span>
                  )}
                  {loot.stat_bonus.speed && (
                    <span className="text-sm stat-speed">+{loot.stat_bonus.speed} SPD</span>
                  )}
                  {loot.stat_bonus.hp && (
                    <span className="text-sm stat-hp">+{loot.stat_bonus.hp} HP</span>
                  )}
                </div>
              )}

              <p className="text-sm text-muted-foreground mt-3">
                {isRelic ? (loot as Relic).effect : (loot as Equipment).effect}
              </p>

              {isRelic && (
                <p className="text-xs text-amber-500/60 mt-2 italic">
                  {(loot as Relic).flavor_text}
                </p>
              )}
            </div>
          </div>

          {/* Slot Selection */}
          <div className="mt-6">
            <p className="text-sm text-muted-foreground mb-3">
              {hasEmptySlot 
                ? `Escolha um slot para equipar:`
                : `Todos os slots estao ocupados. Descartar ou substituir?`
              }
            </p>
            
            <div className="flex gap-3 flex-wrap">
              {availableSlots.map(({ slot, occupied }) => (
                <button
                  key={slot}
                  onClick={() => onEquip(slot)}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                    occupied
                      ? 'bg-destructive/20 text-destructive hover:bg-destructive/30 border border-destructive/50'
                      : isRelic 
                        ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 border border-amber-500/50'
                        : 'bg-primary/20 text-primary hover:bg-primary/30 border border-primary/50'
                  )}
                >
                  {isRelic 
                    ? `Reliquia ${slot + 1}` 
                    : occupied 
                      ? `Substituir Slot ${slot + 1}` 
                      : `Slot ${slot + 1}`
                  }
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={onDiscard}
              className="flex-1 py-3 bg-muted text-muted-foreground rounded-lg font-medium
                       hover:bg-muted/80 transition-colors"
            >
              Descartar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

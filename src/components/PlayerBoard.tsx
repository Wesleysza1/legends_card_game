import { useGameStore } from '@/store/gameStore'
import { getImageUrl, cn } from '@/lib/utils'

const EQUIPMENT_SLOTS = [
  { id: 0, name: 'Arma', type: 'Arma' },
  { id: 1, name: 'Armadura', type: 'Armadura' },
  { id: 2, name: 'Escudo', type: 'Escudo' },
  { id: 3, name: 'Acessorio 1', type: 'Acessório' },
  { id: 4, name: 'Acessorio 2', type: 'Acessório' },
]

export function PlayerBoard() {
  const { player } = useGameStore()

  const totalStats = {
    hp: (player.hero?.stats.hp || 0) + (player.class?.stat_modifiers.hp || 0),
    power: (player.hero?.stats.power || 0) + (player.class?.stat_modifiers.power || 0) +
           player.equipment.reduce((sum, eq) => sum + (eq?.stat_bonus?.power || 0), 0),
    defense: (player.hero?.stats.defense || 0) + (player.class?.stat_modifiers.defense || 0) +
             player.equipment.reduce((sum, eq) => sum + (eq?.stat_bonus?.defense || 0), 0),
    speed: (player.hero?.stats.speed || 0) + (player.class?.stat_modifiers.speed || 0) +
           player.equipment.reduce((sum, eq) => sum + (eq?.stat_bonus?.speed || 0), 0),
  }

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h2 className="font-fantasy text-2xl text-foreground mb-6">Tabuleiro do Jogador</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Character Cards */}
        <div className="space-y-4">
          <h3 className="text-sm text-muted-foreground uppercase tracking-wider">Personagem</h3>
          
          <div className="grid grid-cols-3 gap-3">
            {/* Hero */}
            <div className="relative group">
              <div className="aspect-[2/3] rounded-lg overflow-hidden border-2 border-primary bg-muted">
                {player.hero && (
                  <img 
                    src={getImageUrl(player.hero.image)} 
                    alt={player.hero.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <p className="text-xs text-center mt-2 text-muted-foreground">Heroi</p>
              <div className="absolute inset-0 bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg flex flex-col justify-center">
                <p className="text-xs font-medium text-foreground">{player.hero?.name}</p>
                <p className="text-[10px] text-primary mt-1">{player.hero?.ability.name}</p>
              </div>
            </div>

            {/* Class */}
            <div className="relative group">
              <div className="aspect-[2/3] rounded-lg overflow-hidden border-2 border-accent bg-muted">
                {player.class && (
                  <img 
                    src={getImageUrl(player.class.image)} 
                    alt={player.class.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <p className="text-xs text-center mt-2 text-muted-foreground">Classe</p>
              <div className="absolute inset-0 bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg flex flex-col justify-center">
                <p className="text-xs font-medium text-foreground">{player.class?.name}</p>
                <p className="text-[10px] text-accent mt-1">{player.class?.class_ability.name}</p>
              </div>
            </div>

            {/* Subclass */}
            <div className="relative group">
              <div className="aspect-[2/3] rounded-lg overflow-hidden border-2 border-secondary bg-muted">
                {player.subclass && (
                  <img 
                    src={getImageUrl(player.subclass.image)} 
                    alt={player.subclass.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <p className="text-xs text-center mt-2 text-muted-foreground">Subclasse</p>
              <div className="absolute inset-0 bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg flex flex-col justify-center">
                <p className="text-xs font-medium text-foreground">{player.subclass?.name}</p>
                <p className="text-[10px] text-primary mt-1">{player.subclass?.subclass_ability.name}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-4">
          <h3 className="text-sm text-muted-foreground uppercase tracking-wider">Atributos Totais</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-xs text-muted-foreground uppercase">Poder</p>
              <p className="text-3xl font-fantasy stat-power">{totalStats.power}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-xs text-muted-foreground uppercase">Defesa</p>
              <p className="text-3xl font-fantasy stat-defense">{totalStats.defense}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-xs text-muted-foreground uppercase">Velocidade</p>
              <p className="text-3xl font-fantasy stat-speed">{totalStats.speed}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-xs text-muted-foreground uppercase">Vida Max</p>
              <p className="text-3xl font-fantasy stat-hp">{player.maxHp}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Equipment Slots */}
      <div className="mt-8 space-y-4">
        <h3 className="text-sm text-muted-foreground uppercase tracking-wider">Equipamentos</h3>
        
        <div className="grid grid-cols-5 gap-3">
          {EQUIPMENT_SLOTS.map((slot) => {
            const equipped = player.equipment[slot.id]
            return (
              <div key={slot.id} className="relative group">
                <div 
                  className={cn(
                    'aspect-[2/3] rounded-lg overflow-hidden transition-all',
                    equipped 
                      ? `slot-filled card-rarity-${equipped.rarity}` 
                      : 'slot-empty'
                  )}
                >
                  {equipped ? (
                    <img 
                      src={getImageUrl(equipped.image)} 
                      alt={equipped.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-muted-foreground/50 text-xs text-center px-1">
                        {slot.type}
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-center mt-2 text-muted-foreground truncate">
                  {equipped?.name || slot.name}
                </p>
                
                {equipped && (
                  <div className="absolute inset-0 bg-background/95 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg">
                    <p className="text-xs font-medium text-foreground">{equipped.name}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">{equipped.effect}</p>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {equipped.stat_bonus?.power && (
                        <span className="text-[10px] stat-power">+{equipped.stat_bonus.power} POW</span>
                      )}
                      {equipped.stat_bonus?.defense && (
                        <span className="text-[10px] stat-defense">+{equipped.stat_bonus.defense} DEF</span>
                      )}
                      {equipped.stat_bonus?.speed && (
                        <span className="text-[10px] stat-speed">+{equipped.stat_bonus.speed} SPD</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Relic Slots */}
      <div className="mt-8 space-y-4">
        <h3 className="text-sm text-muted-foreground uppercase tracking-wider">Reliquias</h3>
        
        <div className="grid grid-cols-3 gap-4">
          {[0, 1, 2].map((i) => {
            const relic = player.relics[i]
            return (
              <div key={i} className="relative group">
                <div 
                  className={cn(
                    'aspect-[2/3] rounded-lg overflow-hidden transition-all',
                    relic 
                      ? 'card-rarity-legendary border-2' 
                      : 'slot-empty'
                  )}
                >
                  {relic ? (
                    <img 
                      src={getImageUrl(relic.image)} 
                      alt={relic.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-muted-foreground/30" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                  )}
                </div>
                <p className="text-xs text-center mt-2 text-muted-foreground truncate">
                  {relic?.name || `Reliquia ${i + 1}`}
                </p>
                
                {relic && (
                  <div className="absolute inset-0 bg-background/95 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg">
                    <p className="text-xs font-medium text-amber-400">{relic.name}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">{relic.effect}</p>
                    <p className="text-[10px] text-amber-500/60 mt-2 italic">{relic.flavor_text}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

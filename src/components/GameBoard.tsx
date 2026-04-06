import { useState } from 'react'
import { useGameStore } from '@/store/gameStore'
import { getImageUrl, cn } from '@/lib/utils'
import { PlayerBoard } from '@/components/PlayerBoard'
import { DeckArea } from '@/components/DeckArea'
import { LootModal } from '@/components/LootModal'
import type { Equipment, Relic } from '@/types/game'

export function GameBoard() {
  const { player, monsterDeck, lootDeck, drawMonster, drawLoot, equipItem, equipRelic } = useGameStore()
  const [showLootModal, setShowLootModal] = useState(false)
  const [currentLoot, setCurrentLoot] = useState<Equipment | Relic | null>(null)

  const handleDrawMonster = () => {
    drawMonster()
  }

  const handleDrawLoot = () => {
    const loot = drawLoot()
    if (loot) {
      setCurrentLoot(loot)
      setShowLootModal(true)
    }
  }

  const handleEquipLoot = (slot: number) => {
    if (!currentLoot) return
    
    if ('rarity' in currentLoot && currentLoot.rarity === 'legendary') {
      equipRelic(currentLoot as Relic, slot)
    } else {
      equipItem(currentLoot as Equipment, slot)
    }
    setShowLootModal(false)
    setCurrentLoot(null)
  }

  const handleDiscardLoot = () => {
    setShowLootModal(false)
    setCurrentLoot(null)
  }

  return (
    <div className="min-h-screen bg-background p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with stats */}
        <header className="flex items-center justify-between mb-6 p-4 bg-card rounded-xl border border-border">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary">
              <img 
                src={getImageUrl(player.hero?.image || '')} 
                alt={player.hero?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="font-fantasy text-lg text-foreground">{player.hero?.name}</h1>
              <p className="text-sm text-muted-foreground">
                {player.class?.name} - {player.subclass?.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Nivel</p>
              <p className="text-2xl font-fantasy text-primary">{player.level}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Gloria</p>
              <p className="text-2xl font-fantasy text-amber-500">{player.glory}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-32 h-4 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-300"
                  style={{ width: `${(player.currentHp / player.maxHp) * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium stat-hp">
                {player.currentHp}/{player.maxHp}
              </span>
            </div>
          </div>
        </header>

        {/* Main game area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Player Board */}
          <div className="lg:col-span-2">
            <PlayerBoard />
          </div>

          {/* Deck Area */}
          <div className="space-y-6">
            <DeckArea 
              monsterCount={monsterDeck.length}
              lootCount={lootDeck.length}
              onDrawMonster={handleDrawMonster}
              onDrawLoot={handleDrawLoot}
            />

            {/* Trophies */}
            {player.trophies.length > 0 && (
              <div className="bg-card rounded-xl border border-border p-4">
                <h3 className="font-fantasy text-lg text-foreground mb-3">Trofeus</h3>
                <div className="flex flex-wrap gap-2">
                  {player.trophies.map((trophy, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 bg-amber-500/20 text-amber-400 text-xs rounded-full border border-amber-500/30"
                    >
                      {trophy}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Victory Progress */}
            <div className="bg-card rounded-xl border border-border p-4">
              <h3 className="font-fantasy text-lg text-foreground mb-3">Progresso</h3>
              <div className="flex gap-3">
                {[0, 1, 2].map((i) => (
                  <div 
                    key={i}
                    className={cn(
                      'flex-1 aspect-square rounded-lg border-2 flex items-center justify-center transition-all',
                      player.relics[i] 
                        ? 'border-amber-500 bg-amber-500/20 animate-pulse-glow' 
                        : 'border-dashed border-muted-foreground/30'
                    )}
                  >
                    {player.relics[i] ? (
                      <svg className="w-8 h-8 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ) : (
                      <span className="text-muted-foreground/50 text-2xl font-fantasy">{i + 1}</span>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-muted-foreground mt-3">
                Equipe 3 Reliquias para vencer!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Loot Modal */}
      {showLootModal && currentLoot && (
        <LootModal 
          loot={currentLoot}
          player={player}
          onEquip={handleEquipLoot}
          onDiscard={handleDiscardLoot}
        />
      )}
    </div>
  )
}

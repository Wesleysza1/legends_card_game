import { create } from 'zustand'
import type { 
  GamePhase, 
  PlayerState, 
  CombatState, 
  Hero, 
  GameClass, 
  Subclass, 
  Equipment, 
  Relic, 
  Monster,
  ClassMove
} from '@/types/game'
import { monsters, equipment, relics, getMovesByClass, getGloryThreshold, getLevelBonus } from '@/data/gameData'
import { shuffleArray, rollDice } from '@/lib/utils'

interface GameState {
  phase: GamePhase
  player: PlayerState
  combat: CombatState
  monsterDeck: Monster[]
  lootDeck: (Equipment | Relic)[]
  discardPile: Monster[]
  
  // Actions
  setPhase: (phase: GamePhase) => void
  selectHero: (hero: Hero) => void
  selectClass: (gameClass: GameClass) => void
  selectSubclass: (subclass: Subclass) => void
  startGame: () => void
  drawMonster: () => void
  drawLoot: () => void
  equipItem: (item: Equipment, slot: number) => void
  equipRelic: (relic: Relic, slot: number) => void
  startCombat: (monster: Monster) => void
  selectMove: (move: ClassMove) => void
  executePlayerTurn: () => void
  executeMonsterTurn: () => void
  endCombat: (victory: boolean) => void
  addGlory: (amount: number) => void
  takeDamage: (amount: number) => void
  heal: (amount: number) => void
  resetGame: () => void
}

const initialPlayerState: PlayerState = {
  hero: null,
  class: null,
  subclass: null,
  equipment: [null, null, null, null, null],
  relics: [null, null, null],
  currentHp: 0,
  maxHp: 0,
  glory: 0,
  level: 1,
  trophies: [],
}

const initialCombatState: CombatState = {
  monster: null,
  monsterCurrentHp: 0,
  playerTurn: true,
  selectedMove: null,
  combatLog: [],
  round: 1,
}

function createMonsterDeck(): Monster[] {
  const deck: Monster[] = []
  monsters.forEach(monster => {
    for (let i = 0; i < monster.copies; i++) {
      deck.push({ ...monster })
    }
  })
  return shuffleArray(deck)
}

function createLootDeck(): (Equipment | Relic)[] {
  const deck: (Equipment | Relic)[] = [...equipment, ...relics]
  return shuffleArray(deck)
}

export const useGameStore = create<GameState>((set, get) => ({
  phase: 'menu',
  player: { ...initialPlayerState },
  combat: { ...initialCombatState },
  monsterDeck: [],
  lootDeck: [],
  discardPile: [],

  setPhase: (phase) => set({ phase }),

  selectHero: (hero) => set((state) => ({
    player: {
      ...state.player,
      hero,
      currentHp: hero.stats.hp,
      maxHp: hero.stats.hp,
    }
  })),

  selectClass: (gameClass) => set((state) => {
    const hero = state.player.hero
    if (!hero) return state

    const newMaxHp = hero.stats.hp + gameClass.stat_modifiers.hp
    return {
      player: {
        ...state.player,
        class: gameClass,
        maxHp: newMaxHp,
        currentHp: newMaxHp,
      }
    }
  }),

  selectSubclass: (subclass) => set((state) => ({
    player: {
      ...state.player,
      subclass,
    }
  })),

  startGame: () => {
    const monsterDeck = createMonsterDeck()
    const lootDeck = createLootDeck()
    set({
      phase: 'playing',
      monsterDeck,
      lootDeck,
      discardPile: [],
    })
  },

  drawMonster: () => {
    const { monsterDeck, discardPile } = get()
    
    if (monsterDeck.length === 0) {
      if (discardPile.length === 0) return
      const reshuffled = shuffleArray([...discardPile])
      set({ monsterDeck: reshuffled, discardPile: [] })
      return
    }

    const [monster, ...rest] = monsterDeck
    set({ monsterDeck: rest })
    get().startCombat(monster)
  },

  drawLoot: () => {
    const { lootDeck } = get()
    if (lootDeck.length === 0) return null
    
    const [loot, ...rest] = lootDeck
    set({ lootDeck: rest })
    return loot
  },

  equipItem: (item, slot) => set((state) => {
    const newEquipment = [...state.player.equipment]
    newEquipment[slot] = item
    return {
      player: {
        ...state.player,
        equipment: newEquipment,
      }
    }
  }),

  equipRelic: (relic, slot) => set((state) => {
    const newRelics = [...state.player.relics]
    newRelics[slot] = relic
    
    const equippedCount = newRelics.filter(r => r !== null).length
    const newPhase = equippedCount >= 3 ? 'victory' : state.phase
    
    return {
      phase: newPhase,
      player: {
        ...state.player,
        relics: newRelics,
      }
    }
  }),

  startCombat: (monster) => {
    const { player } = get()
    const playerSpeed = (player.hero?.stats.speed || 0) + 
                       (player.class?.stat_modifiers.speed || 0)
    const monsterSpeed = monster.stats.speed
    
    set({
      phase: 'combat',
      combat: {
        monster,
        monsterCurrentHp: monster.stats.hp,
        playerTurn: playerSpeed >= monsterSpeed,
        selectedMove: null,
        combatLog: [`${monster.name} aparece!`, monster.ability],
        round: 1,
      }
    })
  },

  selectMove: (move) => set((state) => ({
    combat: {
      ...state.combat,
      selectedMove: move,
    }
  })),

  executePlayerTurn: () => {
    const { combat, player } = get()
    const { selectedMove, monster, monsterCurrentHp } = combat
    
    if (!selectedMove || !monster) return

    const roll = rollDice()
    const totalPower = (player.hero?.stats.power || 0) + 
                      (player.class?.stat_modifiers.power || 0) + 
                      selectedMove.power

    let log: string[] = [...combat.combatLog]
    
    if (roll >= selectedMove.hit) {
      const damage = Math.max(1, totalPower)
      const newHp = monsterCurrentHp - damage
      log.push(`${selectedMove.name}! Rolou ${roll}. Causou ${damage} de dano!`)
      
      if (newHp <= 0) {
        log.push(`${monster.name} foi derrotado!`)
        set((state) => ({
          combat: {
            ...state.combat,
            monsterCurrentHp: 0,
            combatLog: log,
          }
        }))
        setTimeout(() => get().endCombat(true), 1500)
        return
      }
      
      set((state) => ({
        combat: {
          ...state.combat,
          monsterCurrentHp: newHp,
          playerTurn: false,
          selectedMove: null,
          combatLog: log,
        }
      }))
    } else {
      log.push(`${selectedMove.name} errou! Rolou ${roll}.`)
      set((state) => ({
        combat: {
          ...state.combat,
          playerTurn: false,
          selectedMove: null,
          combatLog: log,
        }
      }))
    }

    setTimeout(() => get().executeMonsterTurn(), 1000)
  },

  executeMonsterTurn: () => {
    const { combat, player } = get()
    const { monster } = combat
    
    if (!monster) return

    const monsterMoves = monster.moves
    const selectedMove = monsterMoves[Math.floor(Math.random() * monsterMoves.length)]
    const roll = rollDice()
    
    let log = [...combat.combatLog]
    
    const diceRange = selectedMove.dice.split('-').map(Number)
    const minRoll = diceRange[0]
    const maxRoll = diceRange[1] || diceRange[0]
    
    if (roll >= minRoll && roll <= maxRoll) {
      const defense = (player.hero?.stats.defense || 0) + 
                     (player.class?.stat_modifiers.defense || 0)
      const damage = Math.max(1, selectedMove.damage - defense)
      
      log.push(`${monster.name} usa ${selectedMove.name}! Rolou ${roll}. Causou ${damage} de dano!`)
      get().takeDamage(damage)
      
      if (get().player.currentHp <= 0) {
        log.push('Voce foi derrotado!')
        set((state) => ({
          combat: {
            ...state.combat,
            combatLog: log,
          }
        }))
        setTimeout(() => get().endCombat(false), 1500)
        return
      }
    } else {
      log.push(`${monster.name} usa ${selectedMove.name} e erra! Rolou ${roll}.`)
    }

    set((state) => ({
      combat: {
        ...state.combat,
        playerTurn: true,
        round: state.combat.round + 1,
        combatLog: log,
      }
    }))
  },

  endCombat: (victory) => {
    const { combat, discardPile } = get()
    
    if (victory && combat.monster) {
      get().addGlory(combat.monster.stats.glory)
      
      if (combat.monster.reward.trophy) {
        set((state) => ({
          player: {
            ...state.player,
            trophies: [...state.player.trophies, combat.monster!.reward.trophy!],
          }
        }))
      }
    }
    
    set({
      phase: victory ? 'playing' : 'defeat',
      discardPile: combat.monster ? [...discardPile, combat.monster] : discardPile,
      combat: { ...initialCombatState },
    })
  },

  addGlory: (amount) => set((state) => {
    const newGlory = state.player.glory + amount
    const className = state.player.class?.name
    
    let newLevel = state.player.level
    let newMaxHp = state.player.maxHp
    let newCurrentHp = state.player.currentHp
    
    if (className) {
      const nextThreshold = getGloryThreshold(state.player.level + 1)
      if (newGlory >= nextThreshold && state.player.level < 7) {
        newLevel = state.player.level + 1
        const bonus = getLevelBonus(className, newLevel)
        if (bonus?.hp) {
          newMaxHp += bonus.hp
          newCurrentHp += bonus.hp
        }
      }
    }
    
    return {
      player: {
        ...state.player,
        glory: newGlory,
        level: newLevel,
        maxHp: newMaxHp,
        currentHp: newCurrentHp,
      }
    }
  }),

  takeDamage: (amount) => set((state) => ({
    player: {
      ...state.player,
      currentHp: Math.max(0, state.player.currentHp - amount),
    }
  })),

  heal: (amount) => set((state) => ({
    player: {
      ...state.player,
      currentHp: Math.min(state.player.maxHp, state.player.currentHp + amount),
    }
  })),

  resetGame: () => set({
    phase: 'menu',
    player: { ...initialPlayerState },
    combat: { ...initialCombatState },
    monsterDeck: [],
    lootDeck: [],
    discardPile: [],
  }),
}))

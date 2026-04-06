export interface Stats {
  hp: number
  power: number
  defense: number
  speed: number
}

export interface MonsterStats {
  hp: number
  damage: number
  glory: number
  speed: number
}

export interface Move {
  name: string
  damage: number
  hit: number
  dice: string
  effect?: string
}

export interface Monster {
  id: number
  name: string
  level: number
  unique: boolean
  image: string
  stats: MonsterStats
  ability: string
  moves: Move[]
  reward: {
    trophy: string | null
    effect: string
  }
  boss: boolean
  copies: number
}

export interface HeroAbility {
  name: string
  effect: string
}

export interface Hero {
  id: number
  name: string
  title: string
  description: string
  image: string
  stats: Stats
  ability: HeroAbility
  preferred_classes: string[]
}

export interface ClassAbility {
  name: string
  type: string
  usage: string
  effect: string
}

export interface GameClass {
  id: number
  name: string
  description: string
  image: string
  stat_modifiers: Stats
  class_ability: ClassAbility
  playstyle: string
}

export interface SubclassAbility {
  name: string
  type: string
  usage: string
  power: number
  hit: number
  effect: string | null
}

export interface Subclass {
  id: number
  name: string
  class: string
  description: string
  image: string
  subclass_ability: SubclassAbility
}

export interface Equipment {
  id: number
  name: string
  type: string
  rarity: 'common' | 'rare' | 'epic'
  image: string
  stat_bonus: Partial<Stats & { hp: number }>
  effect: string
  synergy?: string[]
}

export interface Relic {
  id: number
  name: string
  type: string
  rarity: 'legendary'
  slot: string
  effect: string
  flavor_text: string
  image: string
  copies: number
}

export interface ClassMove {
  id: number
  class: string
  name: string
  type: 'attack' | 'defense'
  power: number
  hit: number
  effect: string | null
  description: string
}

export interface LevelBonus {
  level: number
  glory: number
  bonus: Partial<Stats>
}

export interface Progression {
  level_progression: {
    glory_thresholds: number[]
    classes: Record<string, LevelBonus[]>
  }
}

export type GamePhase = 'menu' | 'character-select' | 'playing' | 'combat' | 'victory' | 'defeat'

export interface PlayerState {
  hero: Hero | null
  class: GameClass | null
  subclass: Subclass | null
  equipment: (Equipment | null)[]
  relics: (Relic | null)[]
  currentHp: number
  maxHp: number
  glory: number
  level: number
  trophies: string[]
}

export interface CombatState {
  monster: Monster | null
  monsterCurrentHp: number
  playerTurn: boolean
  selectedMove: ClassMove | null
  combatLog: string[]
  round: number
}

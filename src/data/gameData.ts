import type { Monster, Hero, GameClass, Subclass, Equipment, Relic, ClassMove, Progression } from '@/types/game'

import monstersData from '../../db/monsters.json'
import heroesData from '../../db/heroes.json'
import classesData from '../../db/classes.json'
import subclassesData from '../../db/subclasses.json'
import equipmentsData from '../../db/equipments.json'
import relicsData from '../../db/relics.json'
import movesData from '../../db/moves.json'
import progressionData from '../../db/progression.json'

export const monsters: Monster[] = monstersData.monsters
export const heroes: Hero[] = heroesData.heroes
export const classes: GameClass[] = classesData.classes
export const subclasses: Subclass[] = subclassesData.subclasses
export const equipment: Equipment[] = equipmentsData.equipment
export const relics: Relic[] = relicsData.relics
export const moves: ClassMove[] = movesData.moves
export const progression: Progression = progressionData as Progression

export function getMonstersByLevel(minLevel: number, maxLevel: number): Monster[] {
  return monsters.filter(m => m.level >= minLevel && m.level <= maxLevel)
}

export function getSubclassesByClass(className: string): Subclass[] {
  return subclasses.filter(s => s.class === className)
}

export function getMovesByClass(className: string): ClassMove[] {
  return moves.filter(m => m.class === className)
}

export function getEquipmentByType(type: string): Equipment[] {
  return equipment.filter(e => e.type === type)
}

export function getBosses(): Monster[] {
  return monsters.filter(m => m.boss)
}

export function getGloryThreshold(level: number): number {
  const thresholds = progression.level_progression.glory_thresholds
  return thresholds[level - 1] || thresholds[thresholds.length - 1]
}

export function getLevelBonus(className: string, level: number): Partial<{ hp: number; power: number; defense: number; speed: number }> | null {
  const classProgression = progression.level_progression.classes[className]
  if (!classProgression) return null
  
  const levelData = classProgression.find(l => l.level === level)
  return levelData?.bonus || null
}

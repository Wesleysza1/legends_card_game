import { useGameStore } from '@/store/gameStore'
import { MainMenu } from '@/components/MainMenu'
import { CharacterSelect } from '@/components/CharacterSelect'
import { GameBoard } from '@/components/GameBoard'
import { CombatScreen } from '@/components/CombatScreen'
import { VictoryScreen } from '@/components/VictoryScreen'
import { DefeatScreen } from '@/components/DefeatScreen'

function App() {
  const phase = useGameStore((state) => state.phase)

  return (
    <div className="min-h-screen bg-background">
      {phase === 'menu' && <MainMenu />}
      {phase === 'character-select' && <CharacterSelect />}
      {phase === 'playing' && <GameBoard />}
      {phase === 'combat' && <CombatScreen />}
      {phase === 'victory' && <VictoryScreen />}
      {phase === 'defeat' && <DefeatScreen />}
    </div>
  )
}

export default App

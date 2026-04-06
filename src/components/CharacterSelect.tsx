import { useState } from 'react'
import { useGameStore } from '@/store/gameStore'
import { heroes, classes, subclasses } from '@/data/gameData'
import { getImageUrl, cn } from '@/lib/utils'
import type { Hero, GameClass, Subclass } from '@/types/game'

type SelectStep = 'hero' | 'class' | 'subclass'

export function CharacterSelect() {
  const [step, setStep] = useState<SelectStep>('hero')
  const { player, selectHero, selectClass, selectSubclass, startGame, setPhase } = useGameStore()

  const availableSubclasses = player.class 
    ? subclasses.filter(s => s.class === player.class.name)
    : []

  const handleHeroSelect = (hero: Hero) => {
    selectHero(hero)
    setStep('class')
  }

  const handleClassSelect = (gameClass: GameClass) => {
    selectClass(gameClass)
    setStep('subclass')
  }

  const handleSubclassSelect = (subclass: Subclass) => {
    selectSubclass(subclass)
  }

  const handleStart = () => {
    if (player.hero && player.class && player.subclass) {
      startGame()
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => step === 'hero' ? setPhase('menu') : setStep(step === 'class' ? 'hero' : 'class')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar
          </button>

          <div className="flex gap-2">
            {['hero', 'class', 'subclass'].map((s, i) => (
              <div
                key={s}
                className={cn(
                  'w-3 h-3 rounded-full transition-colors',
                  step === s ? 'bg-primary' : 
                  (step === 'class' && i === 0) || (step === 'subclass' && i <= 1) 
                    ? 'bg-primary/50' : 'bg-muted'
                )}
              />
            ))}
          </div>
        </div>

        {/* Step: Hero Selection */}
        {step === 'hero' && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-fantasy text-foreground">Escolha seu Heroi</h1>
              <p className="text-muted-foreground">Cada heroi possui habilidades unicas e atributos distintos</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {heroes.map((hero) => (
                <button
                  key={hero.id}
                  onClick={() => handleHeroSelect(hero)}
                  className={cn(
                    'group relative bg-card rounded-xl overflow-hidden border-2 transition-all duration-300',
                    'hover:border-primary hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10',
                    player.hero?.id === hero.id ? 'border-primary' : 'border-border'
                  )}
                >
                  <div className="aspect-[3/4] relative">
                    <img 
                      src={getImageUrl(hero.image)} 
                      alt={hero.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                    <p className="text-xs text-primary font-medium tracking-wider uppercase">
                      {hero.title}
                    </p>
                    <h3 className="text-xl font-fantasy text-foreground mt-1">{hero.name}</h3>
                    
                    <div className="flex gap-4 mt-3 text-sm">
                      <span className="stat-hp">HP {hero.stats.hp}</span>
                      <span className="stat-power">POW {hero.stats.power}</span>
                      <span className="stat-defense">DEF {hero.stats.defense}</span>
                      <span className="stat-speed">SPD {hero.stats.speed}</span>
                    </div>

                    <div className="mt-3 p-2 bg-muted/50 rounded-lg">
                      <p className="text-xs text-primary font-medium">{hero.ability.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{hero.ability.effect}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step: Class Selection */}
        {step === 'class' && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-fantasy text-foreground">Escolha sua Classe</h1>
              <p className="text-muted-foreground">
                Jogando com <span className="text-primary">{player.hero?.name}</span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {classes.map((gameClass) => (
                <button
                  key={gameClass.id}
                  onClick={() => handleClassSelect(gameClass)}
                  className={cn(
                    'group relative bg-card rounded-xl overflow-hidden border-2 transition-all duration-300',
                    'hover:border-primary hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10',
                    player.class?.id === gameClass.id ? 'border-primary' : 'border-border'
                  )}
                >
                  <div className="aspect-[3/4] relative">
                    <img 
                      src={getImageUrl(gameClass.image)} 
                      alt={gameClass.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                    <p className="text-xs text-accent font-medium tracking-wider uppercase">
                      {gameClass.playstyle}
                    </p>
                    <h3 className="text-xl font-fantasy text-foreground mt-1">{gameClass.name}</h3>
                    
                    <div className="flex gap-3 mt-3 text-sm">
                      <span className={cn(gameClass.stat_modifiers.hp >= 0 ? 'stat-hp' : 'text-red-600')}>
                        HP {gameClass.stat_modifiers.hp >= 0 ? '+' : ''}{gameClass.stat_modifiers.hp}
                      </span>
                      <span className={cn(gameClass.stat_modifiers.power >= 0 ? 'stat-power' : 'text-red-600')}>
                        POW {gameClass.stat_modifiers.power >= 0 ? '+' : ''}{gameClass.stat_modifiers.power}
                      </span>
                      <span className={cn(gameClass.stat_modifiers.defense >= 0 ? 'stat-defense' : 'text-red-600')}>
                        DEF {gameClass.stat_modifiers.defense >= 0 ? '+' : ''}{gameClass.stat_modifiers.defense}
                      </span>
                      <span className={cn(gameClass.stat_modifiers.speed >= 0 ? 'stat-speed' : 'text-red-600')}>
                        SPD {gameClass.stat_modifiers.speed >= 0 ? '+' : ''}{gameClass.stat_modifiers.speed}
                      </span>
                    </div>

                    <div className="mt-3 p-2 bg-muted/50 rounded-lg">
                      <p className="text-xs text-accent font-medium">{gameClass.class_ability.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{gameClass.class_ability.effect}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step: Subclass Selection */}
        {step === 'subclass' && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-fantasy text-foreground">Escolha sua Subclasse</h1>
              <p className="text-muted-foreground">
                <span className="text-primary">{player.hero?.name}</span> - {' '}
                <span className="text-accent">{player.class?.name}</span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {availableSubclasses.map((subclass) => (
                <button
                  key={subclass.id}
                  onClick={() => handleSubclassSelect(subclass)}
                  className={cn(
                    'group relative bg-card rounded-xl overflow-hidden border-2 transition-all duration-300',
                    'hover:border-primary hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10',
                    player.subclass?.id === subclass.id ? 'border-primary ring-2 ring-primary/50' : 'border-border'
                  )}
                >
                  <div className="aspect-[3/4] relative">
                    <img 
                      src={getImageUrl(subclass.image)} 
                      alt={subclass.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                    <p className="text-xs text-primary/80 font-medium tracking-wider uppercase">
                      {subclass.class}
                    </p>
                    <h3 className="text-xl font-fantasy text-foreground mt-1">{subclass.name}</h3>
                    <p className="text-xs text-muted-foreground mt-2">{subclass.description}</p>

                    <div className="mt-3 p-2 bg-muted/50 rounded-lg">
                      <p className="text-xs text-primary font-medium">{subclass.subclass_ability.name}</p>
                      <div className="flex gap-2 mt-1 text-xs">
                        <span className="stat-power">+{subclass.subclass_ability.power} POW</span>
                        <span className="text-muted-foreground">Acerto: {subclass.subclass_ability.hit}+</span>
                      </div>
                      {subclass.subclass_ability.effect && (
                        <p className="text-xs text-muted-foreground mt-1">{subclass.subclass_ability.effect}</p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {player.subclass && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleStart}
                  className="px-12 py-4 bg-primary text-primary-foreground font-fantasy text-xl rounded-lg
                           hover:bg-primary/90 transition-all duration-200 hover:scale-105
                           shadow-lg shadow-primary/25"
                >
                  Iniciar Aventura
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

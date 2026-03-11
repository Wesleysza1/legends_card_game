const MODELS = {
  monsters: {
    label: 'Monstros',
    description: 'Cards de monstros com level, habilidades, troféus e indicadores de chefes.',
    load: fetchMonsters,
    render: renderMonsterPages,
  },
  heroes: {
    label: 'Heróis',
    description: 'Cards dos heróis jogáveis com stats, habilidade e classes preferidas.',
    load: fetchHeroes,
    render: renderHeroPages,
  },
}

const pagesContainer = document.getElementById('pages-container')
const statusMessage = document.getElementById('status-message')
const modelTitle = document.getElementById('model-title')
const modelDescription = document.getElementById('model-description')
const printButton = document.getElementById('print-button')
const menuButtons = Array.from(document.querySelectorAll('.menu-button'))
const deckStructureGrid = document.getElementById('deck-structure-grid')

const DECK_STRUCTURE = [
  { key: 'heroes', label: 'Heróis', quantity: 6, description: 'Personagens jogáveis com identidade narrativa distinta.', status: 'pronto' },
  { key: 'classes', label: 'Classes', quantity: 6, description: 'Bases de combate que definem o estilo inicial.', status: 'em breve' },
  { key: 'subclasses', label: 'Subclasses', quantity: 18, description: 'Três especializações por classe para variação tática.', status: 'em breve' },
  { key: 'monsters', label: 'Monstros', quantity: 24, description: 'Inimigos com níveis, habilidades e troféus.', status: 'pronto' },
  { key: 'equipments', label: 'Equipamentos', quantity: 24, description: 'Armas e armaduras que aumentam atributos.', status: 'em breve' },
  { key: 'items', label: 'Itens Utilizáveis', quantity: 12, description: 'Consumíveis com efeitos únicos.', status: 'em breve' },
  { key: 'intrigues', label: 'Cartas de Intriga', quantity: 18, description: 'Efeitos inesperados que bagunçam a partida.', status: 'em breve' },
  { key: 'events', label: 'Eventos', quantity: 12, description: 'Situações especiais que mudam o cenário.', status: 'em breve' },
  { key: 'relics', label: 'Relíquias', quantity: 12, description: 'Artefatos lendários com benefícios permanentes.', status: 'em breve' },
]

function renderDeckStructure() {
  if (!deckStructureGrid) {
    return
  }

  deckStructureGrid.innerHTML = ''

  DECK_STRUCTURE.forEach((entry) => {
    const card = document.createElement('article')
    card.className = 'deck-card'

    card.innerHTML = `
      <span class="deck-badge ${entry.status === 'pronto' ? 'ready' : ''}">${entry.status}</span>
      <h3>${entry.label}</h3>
      <p class="deck-count">${entry.quantity}</p>
      <p>${entry.description}</p>
    `

    deckStructureGrid.appendChild(card)
  })
}

function highlightButtonFor(modelKey) {
  menuButtons.forEach((button) => {
    if (button.dataset.model === modelKey) {
      button.classList.add('active')
    } else {
      button.classList.remove('active')
    }
  })
}

async function activateModel(modelKey) {
  const model = MODELS[modelKey]
  if (!model || !pagesContainer) {
    return
  }

  highlightButtonFor(modelKey)
  document.body.classList.remove('loaded')
  statusMessage.textContent = 'Carregando cards...'
  modelTitle.textContent = model.label
  modelDescription.textContent = model.description

  try {
    const payload = await model.load()
    const cardsGenerated = model.render(payload, pagesContainer)
    statusMessage.textContent = `Geradas ${cardsGenerated} cartas para ${model.label}.`
  } catch (error) {
    console.error(`Falha ao renderizar ${modelKey}:`, error)
    statusMessage.textContent = 'Erro ao carregar o modelo. Veja o console para detalhes.'
  } finally {
    document.body.classList.add('loaded')
  }
}

menuButtons.forEach((button) => {
  const modelKey = button.dataset.model
  if (!modelKey) {
    return
  }

  button.addEventListener('click', () => {
    if (button.disabled) {
      return
    }
    activateModel(modelKey)
  })
})

printButton?.addEventListener('click', () => {
  window.print()
})

renderDeckStructure()

activateModel('monsters')

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
  classes: {
    label: 'Classes',
    description: 'Classes básicas com modificadores de stat e habilidade.',
    load: fetchClasses,
    render: renderClassPages,
  },
  subclasses: {
    label: 'Subclasses',
    description: 'Subclasses com habilidades específicas e ligação ao classe base.',
    load: fetchSubclasses,
    render: renderSubclassPages,
  },
  equipments: {
    label: 'Equipamentos',
    description: 'Equipamentos com bônus de atributos, efeitos e sinergias.',
    load: fetchEquipments,
    render: renderEquipmentPages,
  },
  backs: {
    label: 'Versos',
    description: 'Impressão dos versos oficial com o logo Legends.',
    load: () => Promise.resolve(9),
    render: (totalCards, container) => renderBackPages(totalCards, container),
  },
}

const pagesContainer = document.getElementById('pages-container')
const statusMessage = document.getElementById('status-message')
const modelTitle = document.getElementById('model-title')
const modelDescription = document.getElementById('model-description')
const previewButton = document.getElementById('preview-button')
const menuButtons = Array.from(document.querySelectorAll('.menu-button'))
const setTabs = Array.from(document.querySelectorAll('.set-tab'))
const menuSections = Array.from(document.querySelectorAll('.generator-menu'))
let activeSet = 'official'

function highlightButtonFor(modelKey) {
  menuButtons.forEach((button) => {
    if (button.dataset.model === modelKey) {
      button.classList.add('active')
    } else {
      button.classList.remove('active')
    }
  })
}

function setActiveSet(setKey) {
  activeSet = setKey
  setTabs.forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.set === setKey)
  })

  menuSections.forEach((section) => {
    if (section.dataset.set === setKey) {
      section.classList.remove('hidden')
    } else {
      section.classList.add('hidden')
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
    const targetSet = button.dataset.set || 'official'
    setActiveSet(targetSet)
    activateModel(modelKey)
  })
})

setTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const setKey = tab.dataset.set || 'official'
    setActiveSet(setKey)
  })
})

previewButton?.addEventListener('click', () => {
  if (!pagesContainer?.innerHTML) {
    return
  }

  window.print()
})

const structureToggle = document.getElementById('structure-toggle')
const structureToggleButton = document.getElementById('structure-toggle-button')

structureToggleButton?.addEventListener('click', (event) => {
  event.stopPropagation()
  structureToggle?.classList.toggle('open')
})

document.addEventListener('click', (event) => {
  if (structureToggle && !structureToggle.contains(event.target)) {
    structureToggle.classList.remove('open')
  }
})

setActiveSet('official')

activateModel('monsters')


// Preload de todas as imagens em background
async function preloadAllImages() {
  try {
    const [monsters, heroes, classes, subclasses, equipments] = await Promise.all([
      fetchMonsters(),
      fetchHeroes(),
      fetchClasses(),
      fetchSubclasses(),
      fetchEquipments()
    ])

    const allImages = [
      ...monsters.map(m => m.image),
      ...heroes.map(h => h.image),
      ...classes.map(c => c.image),
      ...subclasses.map(s => s.image),
      ...equipments.map(e => e.image)
    ].filter(Boolean)

    console.log(`🔄 Precarregando ${allImages.length} imagens...`)

    allImages.forEach(imagePath => {
      const img = new Image()
      img.src = getImageUrl(imagePath)
    })

    console.log('✅ Preload iniciado')
  } catch (error) {
    console.warn('⚠️ Erro no preload:', error)
  }
}

// Inicia o preload após a página carregar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', preloadAllImages)
} else {
  preloadAllImages()
}

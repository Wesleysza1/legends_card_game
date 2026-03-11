const CARD_BACKS_PER_PAGE = 9
const CARD_BACKS_TOTAL = 9

function createCardBackElement() {
  const card = document.createElement('div')
  card.classList.add('card-back')
  card.innerHTML = `
    <div class="back-content">
      <div class="back-icon">⚔</div>
      <div class="back-title">LEGENDS</div>
      <div class="back-sub">Card Game</div>
    </div>
  `
  return card
}

function renderBackPages(totalCards = CARD_BACKS_TOTAL, container, cardsPerPage = CARD_BACKS_PER_PAGE) {
  if (!container) {
    return 0
  }

  container.innerHTML = ''

  for (let i = 0; i < totalCards; i += 1) {
    if (i % cardsPerPage === 0) {
      const page = document.createElement('div')
      page.classList.add('page')
      container.appendChild(page)
    }

    const currentPage = container.lastElementChild
    currentPage.appendChild(createCardBackElement())
  }

  return totalCards
}

function loadBacks() {
  const pagesContainer = document.getElementById('pages-container')
  if (!pagesContainer) {
    return
  }

  renderBackPages(CARD_BACKS_TOTAL, pagesContainer)
  document.body.classList.add('loaded')
}

window.renderBackPages = renderBackPages
window.loadBacks = loadBacks

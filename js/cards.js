const CARDS_PER_PAGE = 9

async function fetchMonsters() {
    const response = await fetch('db/monsters.json')
    const data = await response.json()
    return data.monsters ?? []
}

function buildMonsterCardHtml(monster) {
    const trophy = monster.reward?.trophy || '-'
    const rewardEffect = monster.reward?.effect || '-'
    const ability = monster.ability || '-'

    const headerIcon = monster.boss ? '👑 ' : ''
    const uniqueIcon = monster.unique && !monster.boss ? '⭐ ' : ''

    return `
        <div class="card-header">
            <div class="card-name">
                ${headerIcon}${uniqueIcon}${monster.name}
            </div>
            <div class="card-level">
                Lv ${monster.level}
            </div>
        </div>
        <div class="card-image">
            <img src="${monster.image}" alt="${monster.name}">
        </div>
        <div class="card-stats">
            <div>❤️ ${monster.stats?.hp ?? 0}</div>
            <div>⚔ ${monster.stats?.damage ?? 0}</div>
            <div>🏆 ${monster.stats?.glory ?? 0}</div>
        </div>
        <div class="card-text">
            <b>✨ Habilidade</b><br>
            ${ability}
        </div>
        <div class="card-trophy">
            ${monster.unique
                ? `<b>🎁 Recompensa:</b><br>${rewardEffect}`
                : `<b>🏆 Troféu:</b><br>${trophy}<br><i>${rewardEffect}</i>`
            }
        </div>
    `
}

function normalizeCopies(monster) {
    const copies = Number(monster.copies)
    if (Number.isFinite(copies) && copies >= 1) {
        return Math.floor(copies)
    }
    return 1
}

function renderMonsterPages(monsters, container, cardsPerPage = CARDS_PER_PAGE) {
    if (!container) {
        return 0
    }

    container.innerHTML = ''

    let renderedCount = 0

    monsters.forEach((monster) => {
        const copies = normalizeCopies(monster)
        for (let copyIndex = 0; copyIndex < copies; copyIndex += 1) {
            if (renderedCount % cardsPerPage === 0) {
                const page = document.createElement('div')
                page.classList.add('page')
                container.appendChild(page)
            }

            const currentPage = container.lastElementChild
            const card = document.createElement('div')
            card.classList.add('card')

            if (monster.boss) {
                card.classList.add('boss')
            }

            if (monster.unique) {
                card.classList.add('unique')
            }

            card.innerHTML = buildMonsterCardHtml(monster)
            currentPage.appendChild(card)
            renderedCount += 1
        }
    })

    return renderedCount
}

async function loadMonsters() {
    const pagesContainer = document.getElementById('pages-container')
    if (!pagesContainer) {
        return
    }

    const monsters = await fetchMonsters()
    renderMonsterPages(monsters, pagesContainer)
    document.body.classList.add('loaded')
}

async function fetchHeroes() {
    const response = await fetch('db/heroes.json')
    const data = await response.json()
    return data.heroes ?? []
}

function buildHeroCardHtml(hero) {
    const abilityName = hero.ability?.name || 'Habilidade'
    const abilityEffect = hero.ability?.effect || '-'
    const description = hero.description || '-'
    const preferredClasses = (hero.preferred_classes || []).join(', ') || '—'

    return `
        <div class="card-header">
            <div>
                <div class="card-name">${hero.name}</div>
                <div class="card-title">${hero.title || ''}</div>
            </div>
            <div class="card-level">Herói</div>
        </div>
        <div class="card-image">
            <img src="${hero.image}" alt="${hero.name}">
        </div>
        <div class="card-stats hero-stats">
            <div>❤️ ${hero.stats?.hp ?? 0}</div>
            <div>⚔ ${hero.stats?.power ?? 0}</div>
            <div>🛡 ${hero.stats?.defense ?? 0}</div>
            <div>⚡ ${hero.stats?.speed ?? 0}</div>
        </div>
        <div class="card-text">
            <b>${abilityName}</b><br>
            ${abilityEffect}<br>
            <small>${description}</small>
        </div>
        <div class="card-trophy hero-preferences">
            <b>Classes preferidas</b><br>
            ${preferredClasses}
        </div>
    `
}

function renderHeroPages(heroes, container, cardsPerPage = CARDS_PER_PAGE) {
    if (!container) {
        return 0
    }

    container.innerHTML = ''

    let renderedCount = 0

    heroes.forEach((hero) => {
        const copies = 1
        for (let copyIndex = 0; copyIndex < copies; copyIndex += 1) {
            if (renderedCount % cardsPerPage === 0) {
                const page = document.createElement('div')
                page.classList.add('page')
                container.appendChild(page)
            }

            const currentPage = container.lastElementChild
            const card = document.createElement('div')
            card.classList.add('card')

            card.innerHTML = buildHeroCardHtml(hero)
            currentPage.appendChild(card)
            renderedCount += 1
        }
    })

    return renderedCount
}

async function loadHeroes() {
    const pagesContainer = document.getElementById('pages-container')
    if (!pagesContainer) {
        return
    }

    const heroes = await fetchHeroes()
    renderHeroPages(heroes, pagesContainer)
    document.body.classList.add('loaded')
}

window.fetchMonsters = fetchMonsters
window.renderMonsterPages = renderMonsterPages
window.loadMonsters = loadMonsters
window.fetchHeroes = fetchHeroes
window.renderHeroPages = renderHeroPages
window.loadHeroes = loadHeroes
async function fetchClasses() {
    const response = await fetch('db/classes.json')
    const data = await response.json()
    return data.classes ?? []
}

function formatModifier(value) {
    if (value === undefined || value === null) {
        return '0'
    }

    return value >= 0 ? `+${value}` : `${value}`
}

function buildClassCardHtml(entry) {
    const abilityName = entry.class_ability?.name || 'Habilidade'
    const abilityEffect = entry.class_ability?.effect || '-'
    const abilityUsage = entry.class_ability?.usage ? `Uso: ${entry.class_ability.usage}` : ''
    const playstyle = entry.playstyle || '-'
    const description = entry.description || '-'

    return `
        <div class="card-header">
            <div class="card-name">${entry.name}</div>
            <div class="card-level">Classe</div>
        </div>
        <div class="card-image">
            <img src="${entry.image}" alt="${entry.name}">
        </div>
        <div class="card-stats hero-stats">
            <div>❤️ ${formatModifier(entry.stat_modifiers?.hp)}</div>
            <div>⚔ ${formatModifier(entry.stat_modifiers?.power)}</div>
            <div>🛡 ${formatModifier(entry.stat_modifiers?.defense)}</div>
            <div>⚡ ${formatModifier(entry.stat_modifiers?.speed)}</div>
        </div>
        <div class="card-text">
            <b>Descrição</b><br>
            ${description}
        </div>
        <div class="card-trophy hero-preferences">
            <b>${abilityName}</b><br>
            ${abilityEffect}
            ${abilityUsage ? `<div class="card-ability-usage">${abilityUsage}</div>` : ''}
            <small>${playstyle}</small>
        </div>
    `
}

function renderClassPages(entries, container, cardsPerPage = CARDS_PER_PAGE) {
    if (!container) {
        return 0
    }

    container.innerHTML = ''
    let renderedCount = 0

    entries.forEach((entry) => {
        if (renderedCount % cardsPerPage === 0) {
            const page = document.createElement('div')
            page.classList.add('page')
            container.appendChild(page)
        }

        const currentPage = container.lastElementChild
        const card = document.createElement('div')
        card.classList.add('card')
        card.innerHTML = buildClassCardHtml(entry)
        currentPage.appendChild(card)
        renderedCount += 1
    })

    return renderedCount
}

async function loadClasses() {
    const pagesContainer = document.getElementById('pages-container')
    if (!pagesContainer) {
        return
    }

    const entries = await fetchClasses()
    renderClassPages(entries, pagesContainer)
    document.body.classList.add('loaded')
}

window.fetchClasses = fetchClasses
window.renderClassPages = renderClassPages
window.loadClasses = loadClasses

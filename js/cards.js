const CARDS_PER_PAGE = 9
const IMAGES_BASE_URL = 'https://wesleysza1.github.io/legends_card_game/images'

function getImageUrl(path) {
    return `${IMAGES_BASE_URL}/${path}`
}

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
            <img src="${getImageUrl(monster.image)}" alt="${monster.name}">
        </div>
        <div class="card-stats">
            <div>❤️ ${monster.stats?.hp ?? 0}</div>
            <div>⚔ ${monster.stats?.damage ?? 0}</div>
            <div>⚡ ${monster.stats?.speed ?? 0}</div>
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
            <img src="${getImageUrl(hero.image)}" alt="${hero.name}">
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
            <img src="${getImageUrl(entry.image)}" alt="${entry.name}">
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

async function fetchSubclasses() {
    const response = await fetch('db/subclasses.json')
    const data = await response.json()
    return data.subclasses ?? []
}

function buildSubclassCardHtml(subclass) {
    const abilityName = subclass.subclass_ability?.name || 'Habilidade'
    const abilityEffect = subclass.subclass_ability?.effect || '-'
    const abilityUsage = subclass.subclass_ability?.usage ? `Uso: ${subclass.subclass_ability.usage}` : ''
    const description = subclass.description || '-'

    return `
        <div class="card-header">
            <div>
                <div class="card-name">${subclass.name}</div>
                <div class="card-title">${subclass.class}</div>
            </div>
            <div class="card-level">Subclasse</div>
        </div>
        <div class="card-image">
            <img src="${getImageUrl(subclass.image)}" alt="${subclass.name}">
        </div>
        <div class="card-text">
            <b>Descrição</b><br>
            ${description}
        </div>
        <div class="card-trophy hero-preferences">
            <b>${abilityName}</b><br>
            ${abilityEffect}
            ${abilityUsage ? `<div class="card-ability-usage">${abilityUsage}</div>` : ''}
        </div>
    `
}

function renderSubclassPages(subclasses, container, cardsPerPage = CARDS_PER_PAGE) {
    if (!container) {
        return 0
    }

    container.innerHTML = ''
    let renderedCount = 0

    subclasses.forEach((subclass) => {
        if (renderedCount % cardsPerPage === 0) {
            const page = document.createElement('div')
            page.classList.add('page')
            container.appendChild(page)
        }

        const currentPage = container.lastElementChild
        const card = document.createElement('div')
        card.classList.add('card')
        card.innerHTML = buildSubclassCardHtml(subclass)
        currentPage.appendChild(card)
        renderedCount += 1
    })

    return renderedCount
}

async function loadSubclasses() {
    const pagesContainer = document.getElementById('pages-container')
    if (!pagesContainer) {
        return
    }

    const data = await fetchSubclasses()
    renderSubclassPages(data, pagesContainer)
    document.body.classList.add('loaded')
}

window.fetchSubclasses = fetchSubclasses
window.renderSubclassPages = renderSubclassPages
window.loadSubclasses = loadSubclasses

const EQUIPMENT_STAT_ORDER = ['power', 'defense', 'hp', 'speed']
const EQUIPMENT_STAT_LABELS = {
    power: '⚔',
    defense: '🛡',
    speed: '⚡',
    hp: '❤️',
}
const EQUIPMENT_RARITY_LABELS = {
    common: 'Comum',
    rare: 'Raro',
    epic: 'Épico',
}

async function fetchEquipments() {
    const response = await fetch('db/equipments.json')
    const data = await response.json()
    return data.equipment ?? []
}

function buildEquipmentCardHtml(equipment) {
    const typeLabel = equipment.type
        ? equipment.type.charAt(0).toUpperCase() + equipment.type.slice(1)
        : 'Equipamento'
    const rarityKey = (equipment.rarity || 'common').toLowerCase()
    const rarityLabel = EQUIPMENT_RARITY_LABELS[rarityKey] || rarityKey
    const statBonus = equipment.stat_bonus || {}

    const statEntries = EQUIPMENT_STAT_ORDER.filter((statKey) => statKey in statBonus)
        .map((statKey) => ({
            key: statKey,
            label: EQUIPMENT_STAT_LABELS[statKey] || statKey,
            value: statBonus[statKey],
        }))

    const statHtml = statEntries.length
        ? statEntries
              .map((entry) => `<div><span class="icon">${entry.label}</span> ${formatModifier(entry.value)}</div>`)
              .join('')
        : '<div>—</div>'

    const effectText = equipment.effect || '-'
    const synergyText = (equipment.synergy || []).length ? equipment.synergy.join(', ') : '—'

    return `
        <div class="card-header">
            <div>
                <div class="card-name">${equipment.name}</div>
                <div class="card-title">${typeLabel}</div>
            </div>
            <div class="card-level equipment-rarity">${rarityLabel}</div>
        </div>
        <div class="card-image">
            <img src="${getImageUrl(equipment.image)}" alt="${equipment.name}">
        </div>
        <div class="card-stats equipment-stats">
            ${statHtml}
        </div>
        <div class="card-text">
            <b>Efeito</b><br>
            ${effectText}
        </div>
        <div class="card-trophy equipment-synergy">
            <b>Sinergia</b><br>
            ${synergyText}
        </div>
    `
}

function renderEquipmentPages(equipments, container, cardsPerPage = CARDS_PER_PAGE) {
    if (!container) {
        return 0
    }

    container.innerHTML = ''
    let renderedCount = 0

    equipments.forEach((equipment) => {
        if (renderedCount % cardsPerPage === 0) {
            const page = document.createElement('div')
            page.classList.add('page')
            container.appendChild(page)
        }

        const currentPage = container.lastElementChild
        const card = document.createElement('div')
        card.classList.add('card')
        card.innerHTML = buildEquipmentCardHtml(equipment)
        currentPage.appendChild(card)
        renderedCount += 1
    })

    return renderedCount
}

async function loadEquipments() {
    const pagesContainer = document.getElementById('pages-container')
    if (!pagesContainer) {
        return
    }

    const data = await fetchEquipments()
    renderEquipmentPages(data, pagesContainer)
    document.body.classList.add('loaded')
}

window.fetchEquipments = fetchEquipments
window.renderEquipmentPages = renderEquipmentPages
window.loadEquipments = loadEquipments

const ITEM_RARITY_LABELS = {
    common: 'Comum',
    rare: 'Raro',
    epic: 'Épico',
}

const ITEM_TIMING_LABELS = {
    anytime: 'Qualquer momento',
    combat: 'Combate',
    exploration: 'Exploração',
}

async function fetchItems() {
    const response = await fetch('db/items.json')
    const data = await response.json()
    return data.usable_items ?? []
}

function buildItemCardHtml(item) {
    const typeLabel = item.type ? item.type.charAt(0).toUpperCase() + item.type.slice(1) : 'Item'
    const rarityKey = (item.rarity || 'common').toLowerCase()
    const rarityLabel = ITEM_RARITY_LABELS[rarityKey] || rarityKey
    const timingLabel = ITEM_TIMING_LABELS[item.timing] || item.timing || '-'
    const targetLabel = item.target === 'self' ? 'Próprio' : item.target === 'enemy' ? 'Inimigo' : item.target || '-'

    return `
        <div class="card-header">
            <div>
                <div class="card-name">${item.name}</div>
                <div class="card-title">${typeLabel}</div>
            </div>
            <div class="card-level equipment-rarity">${rarityLabel}</div>
        </div>
        <div class="card-image">
            <img src="${getImageUrl(item.image)}" alt="${item.name}">
        </div>
        <div class="card-stats">
            <div>🕐 ${timingLabel}</div>
            <div>🎯 ${targetLabel}</div>
        </div>
        <div class="card-text">
            <b>Efeito</b><br>
            ${item.effect || '-'}
        </div>
        <div class="card-trophy">
            <b>Consumível</b><br>
            Descarte após o uso.
        </div>
    `
}

function renderItemPages(items, container, cardsPerPage = CARDS_PER_PAGE) {
    if (!container) {
        return 0
    }

    container.innerHTML = ''
    let renderedCount = 0

    items.forEach((item) => {
        const copies = normalizeCopies(item)
        for (let i = 0; i < copies; i++) {
            if (renderedCount % cardsPerPage === 0) {
                const page = document.createElement('div')
                page.classList.add('page')
                container.appendChild(page)
            }

            const currentPage = container.lastElementChild
            const card = document.createElement('div')
            card.classList.add('card')
            card.innerHTML = buildItemCardHtml(item)
            currentPage.appendChild(card)
            renderedCount += 1
        }
    })

    return renderedCount
}

async function loadItems() {
    const pagesContainer = document.getElementById('pages-container')
    if (!pagesContainer) {
        return
    }

    const items = await fetchItems()
    renderItemPages(items, pagesContainer)
    document.body.classList.add('loaded')
}

window.fetchItems = fetchItems
window.renderItemPages = renderItemPages
window.loadItems = loadItems

const INTRIGUE_RARITY_LABELS = {
    common: 'Comum',
    rare: 'Raro',
    epic: 'Épico',
}

const INTRIGUE_TIMING_LABELS = {
    anytime: 'Qualquer momento',
    combat: 'Combate',
    exploration: 'Exploração',
}

const INTRIGUE_TARGET_LABELS = {
    self: 'Próprio',
    player: 'Jogador',
    enemy: 'Inimigo',
    all_players: 'Todos',
}

async function fetchIntrigue() {
    const response = await fetch('db/intrigue.json')
    const data = await response.json()
    return data.intrigue_cards ?? []
}

function buildIntrigueCardHtml(card) {
    const rarityLabel = INTRIGUE_RARITY_LABELS[(card.rarity || 'common').toLowerCase()] || card.rarity
    const timingLabel = INTRIGUE_TIMING_LABELS[card.timing] || card.timing || '-'
    const targetLabel = INTRIGUE_TARGET_LABELS[card.target] || card.target || '-'

    return `
        <div class="card-header">
            <div class="card-name">${card.name}</div>
            <div class="card-level equipment-rarity">${rarityLabel}</div>
        </div>
        <div class="card-image">
            <img src="${getImageUrl(card.image)}" alt="${card.name}">
        </div>
        <div class="card-stats">
            <div>🕐 ${timingLabel}</div>
            <div>🎯 ${targetLabel}</div>
        </div>
        <div class="card-text">
            <b>Efeito</b><br>
            ${card.effect || '-'}
        </div>
        <div class="card-trophy">
            <i>${card.flavor_text || ''}</i>
        </div>
    `
}

function renderIntriguePages(cards, container, cardsPerPage = CARDS_PER_PAGE) {
    if (!container) {
        return 0
    }

    container.innerHTML = ''
    let renderedCount = 0

    cards.forEach((card) => {
        const copies = normalizeCopies(card)
        for (let i = 0; i < copies; i++) {
            if (renderedCount % cardsPerPage === 0) {
                const page = document.createElement('div')
                page.classList.add('page')
                container.appendChild(page)
            }

            const currentPage = container.lastElementChild
            const cardEl = document.createElement('div')
            cardEl.classList.add('card')
            cardEl.innerHTML = buildIntrigueCardHtml(card)
            currentPage.appendChild(cardEl)
            renderedCount += 1
        }
    })

    return renderedCount
}

async function loadIntrigue() {
    const pagesContainer = document.getElementById('pages-container')
    if (!pagesContainer) {
        return
    }

    const cards = await fetchIntrigue()
    renderIntriguePages(cards, pagesContainer)
    document.body.classList.add('loaded')
}

window.fetchIntrigue = fetchIntrigue
window.renderIntriguePages = renderIntriguePages
window.loadIntrigue = loadIntrigue

const EVENT_RARITY_LABELS = {
    common: 'Comum',
    rare: 'Raro',
    epic: 'Épico',
}

const EVENT_CATEGORY_LABELS = {
    social: '🗣 Social',
    treasure: '💰 Tesouro',
    danger: '⚠ Perigo',
    exploration: '🗺 Exploração',
    mystery: '🔮 Mistério',
    environment: '🌧 Ambiente',
}

async function fetchEvents() {
    const response = await fetch('db/events.json')
    const data = await response.json()
    return data.events ?? []
}

function buildEventCardHtml(event) {
    const rarityLabel = EVENT_RARITY_LABELS[(event.rarity || 'common').toLowerCase()] || event.rarity
    const categoryLabel = EVENT_CATEGORY_LABELS[event.category] || event.category || '-'

    return `
        <div class="card-header">
            <div class="card-name">${event.name}</div>
            <div class="card-level equipment-rarity">${rarityLabel}</div>
        </div>
        <div class="card-image">
            <img src="${getImageUrl(event.image)}" alt="${event.name}">
        </div>
        <div class="card-stats">
            <div>${categoryLabel}</div>
        </div>
        <div class="card-text">
            <b>Efeito</b><br>
            ${event.effect || '-'}
        </div>
        <div class="card-trophy">
            <i>${event.flavor_text || ''}</i>
        </div>
    `
}

function renderEventPages(events, container, cardsPerPage = CARDS_PER_PAGE) {
    if (!container) {
        return 0
    }

    container.innerHTML = ''
    let renderedCount = 0

    events.forEach((event) => {
        const copies = normalizeCopies(event)
        for (let i = 0; i < copies; i++) {
            if (renderedCount % cardsPerPage === 0) {
                const page = document.createElement('div')
                page.classList.add('page')
                container.appendChild(page)
            }

            const currentPage = container.lastElementChild
            const card = document.createElement('div')
            card.classList.add('card')
            card.innerHTML = buildEventCardHtml(event)
            currentPage.appendChild(card)
            renderedCount += 1
        }
    })

    return renderedCount
}

async function loadEvents() {
    const pagesContainer = document.getElementById('pages-container')
    if (!pagesContainer) {
        return
    }

    const events = await fetchEvents()
    renderEventPages(events, pagesContainer)
    document.body.classList.add('loaded')
}

window.fetchEvents = fetchEvents
window.renderEventPages = renderEventPages
window.loadEvents = loadEvents

const RELIC_SLOT_LABELS = {
    head: '👑 Cabeça',
    weapon: '⚔ Arma',
    shield: '🛡 Escudo',
    ring: '💍 Anel',
    artifact: '🔮 Artefato',
}

async function fetchRelics() {
    const response = await fetch('db/relics.json')
    const data = await response.json()
    return data.relics ?? []
}

function buildRelicCardHtml(relic) {
    const slotLabel = RELIC_SLOT_LABELS[relic.slot] || relic.slot || '-'

    return `
        <div class="card-header">
            <div class="card-name">${relic.name}</div>
            <div class="card-level equipment-rarity">Lendário</div>
        </div>
        <div class="card-image">
            <img src="${getImageUrl(relic.image)}" alt="${relic.name}">
        </div>
        <div class="card-stats">
            <div>${slotLabel}</div>
        </div>
        <div class="card-text">
            <b>Efeito</b><br>
            ${relic.effect || '-'}
        </div>
        <div class="card-trophy">
            <i>${relic.flavor_text || ''}</i>
        </div>
    `
}

function renderRelicPages(relics, container, cardsPerPage = CARDS_PER_PAGE) {
    if (!container) {
        return 0
    }

    container.innerHTML = ''
    let renderedCount = 0

    relics.forEach((relic) => {
        const copies = normalizeCopies(relic)
        for (let i = 0; i < copies; i++) {
            if (renderedCount % cardsPerPage === 0) {
                const page = document.createElement('div')
                page.classList.add('page')
                container.appendChild(page)
            }

            const currentPage = container.lastElementChild
            const card = document.createElement('div')
            card.classList.add('card')
            card.innerHTML = buildRelicCardHtml(relic)
            currentPage.appendChild(card)
            renderedCount += 1
        }
    })

    return renderedCount
}

async function loadRelics() {
    const pagesContainer = document.getElementById('pages-container')
    if (!pagesContainer) {
        return
    }

    const relics = await fetchRelics()
    renderRelicPages(relics, pagesContainer)
    document.body.classList.add('loaded')
}

window.fetchRelics = fetchRelics
window.renderRelicPages = renderRelicPages
window.loadRelics = loadRelics

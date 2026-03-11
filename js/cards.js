async function loadMonsters() {

    const response = await fetch('db/monsters.json')
    const data = await response.json()

    const pagesContainer = document.getElementById("pages-container")

    const cardsPerPage = 9

    data.monsters.forEach((monster, index) => {

        if (index % cardsPerPage === 0) {

            const page = document.createElement("div")
            page.classList.add("page")

            pagesContainer.appendChild(page)

        }

        const currentPage = pagesContainer.lastElementChild

        const card = document.createElement("div")
        card.classList.add("card")

        if (monster.boss) {
            card.classList.add("boss")
        }

        if (monster.unique) {
            card.classList.add("unique")
        }

        card.innerHTML = `
                
        <div class="card-header">
            <div class="card-name">
                ${monster.boss ? "👑 " : ""}
                ${monster.unique && !monster.boss ? "⭐ " : ""}
                ${monster.name}
            </div>

            <div class="card-level">
                Lv ${monster.level}
            </div>
        </div>

        <div class="card-image">
            <img src="${monster.image}">
        </div>

        <div class="card-stats">
            <div>❤️ ${monster.stats.hp}</div>
            <div>⚔ ${monster.stats.damage}</div>
            <div>🏆 ${monster.stats.glory}</div>
        </div>

        <div class="card-text">
            <b>✨ Habilidade</b><br>
            ${monster.ability || "-"}
        </div>

        <div class="card-trophy">
        ${monster.unique
                        ? `<b>🎁 Recompensa:</b><br>${monster.reward.effect}`
                        : `<b>🏆 Troféu:</b><br>${monster.reward.trophy}<br><i>${monster.reward.effect}</i>`
                    }
        </div>
        `

        currentPage.appendChild(card)

    })

    document.body.classList.add('loaded')

}

loadMonsters()

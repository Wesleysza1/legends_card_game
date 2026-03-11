function generateBacks(){

    const pagesContainer = document.getElementById("pages-container")

    const totalCards = 24
    const cardsPerPage = 9

    for(let i=0;i<totalCards;i++){

        if(i % cardsPerPage === 0){

            const page = document.createElement("div")
            page.classList.add("page")

            pagesContainer.appendChild(page)

        }

        const currentPage = pagesContainer.lastElementChild

        const card = document.createElement("div")
        card.classList.add("card-back")

        card.innerHTML = `

        <div class="back-content">

            <div class="back-icon">⚔</div>

            <div class="back-title">
                LEGENDS
            </div>

            <div class="back-sub">
                Card Game
            </div>

        </div>

        `

        currentPage.appendChild(card)

    }

}

generateBacks()
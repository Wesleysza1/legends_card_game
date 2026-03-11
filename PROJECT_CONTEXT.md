## Project Overview

**Legends Card Game** is an authorial homemade card game designed for **home printing and family play**.

The project contains tools to render printable cards using **HTML, CSS and JavaScript**, using a **JSON database** as the source of truth for game content.

The current implementation focuses on **monster cards** and **card backs**.

Cards are designed to be printed on **A4 paper**, with **9 cards per page**, optimized for home printers (low ink usage, white backgrounds).

This project is **non-commercial** and intended for personal use and experimentation.

---

# Game Design Overview

Legends is an **adventure card game** where players explore dangerous locations and fight monsters.

Players gain:

* glory
* trophies
* levels

The main goal is:

**Reach Level 10 before other players.**

Monsters are the core element of gameplay and define progression difficulty.

Monster difficulty progresses approximately like this:

| Level | Difficulty                  |
| ----- | --------------------------- |
| 2–3   | Early monsters              |
| 4–5   | Mid tier monsters           |
| 6–7   | Advanced monsters           |
| 8–9   | Legendary monsters / bosses |

Some monsters are **bosses** and grant larger rewards.

---

# Visual Style

The visual identity of the game is intentionally **cartoon fantasy**.

Inspirations include:

* light adventure fantasy
* expressive monsters
* playful tone rather than dark realism

Art characteristics:

* cartoon fantasy monsters
* central character composition
* 3:2 aspect ratio
* bright colors
* clean white backgrounds to save ink
* printable friendly

Images are stored locally in:

```
images/monsters/
```

---

# Current Project Structure

```
.
├── ABOUT.md
├── backs.html
├── css
│   ├── backs.css
│   └── cards.css
├── db
│   └── monsters.json
├── fonts
│   └── warrior.ttf
├── images
│   └── monsters
├── js
│   ├── backs.js
│   └── cards.js
├── LICENSE
├── monsters.html
├── PROJECT_CONTEXT.md
└── README.md
```

---

# Current Card Rendering System

Cards are rendered using **HTML templates + JavaScript**.

There is currently **one page per card type**.

Implemented pages:

```
monsters.html
backs.html
```

Each page loads a corresponding script.

```
cards.js
backs.js
```

These scripts read the JSON database and dynamically render the cards.

Cards are laid out for **printable A4 pages**.

---

# Fonts

The project uses a custom fantasy font:

```
fonts/warrior.ttf
```

This font is primarily used for the **game title "Legends"** and stylistic headings.

---

# Monster Database

Monsters are stored in:

```
db/monsters.json
```

The file structure follows this format:

```json
{
  "monsters": [
    {
      "id": 1,
      "name": "Goblin das Ruínas",
      "level": 2,
      "unique": false,
      "image": "images/monsters/goblin_ruinas.png",
      "stats": {
        "hp": 2,
        "damage": 1,
        "glory": 1
      },
      "ability": "Ao ser revelado, o jogador descarta 1 carta da mão.",
      "reward": {
        "trophy": "Orelhas de Goblin",
        "effect": "+1 poder em duelos"
      },
      "boss": false,
      "copies": 1
    }
  ]
}
```

---

# Monster Fields Explained

## id

Unique identifier for the monster.

## name

Monster name displayed on the card.

## level

Represents difficulty and progression stage.

## unique

If true, only one copy should exist in the deck.

## image

Local path to the monster artwork.

Images are stored in:

```
images/monsters/
```

## stats.hp

Monster health.

## stats.damage

Damage inflicted on players.

## stats.glory

Glory reward when defeated.

## ability

Special rule applied during combat.

## reward.trophy

Name of the trophy obtained after defeating the monster.

May be `null` for bosses.

## reward.effect

Gameplay bonus granted by the reward.

## boss

Boolean indicating if the monster is a **boss**.

Bosses represent end-game enemies.

## copies

Defines how many copies of this monster exist in the deck.

This is useful for balancing spawn frequency.

---

# Implemented Monster Count

Currently the game contains **24 monsters**, including bosses.

Monster art is stored locally in:

```
images/monsters/
```

---

# Card Design Goals

Cards must be:

* printable at home
* readable at small size
* low ink usage
* visually clear

Typical card structure:

* name
* monster art
* level
* stats (hp, damage, glory)
* ability text
* trophy reward
* boss indicator (if applicable)

---

# Printing Design

Cards are designed for:

**A4 printing**

Each page contains:

```
3 x 3 cards
```

Total:

```
9 cards per page
```

Cards are cut manually after printing.

Card backs can be printed separately and glued to colored paper for thicker cards.

---

# Card Back System

Card backs are generated through:

```
backs.html
backs.js
```

These produce printable card back templates using the **Legends branding**.

---

# Future Expansion Plans

The game was designed to support additional card types.

Possible future expansions include:

Items / Equipment
Player classes
Events
Traps
Spells
Exploration cards
PvP duel mechanics

The JSON-based system allows easy expansion.

---

# Technical Philosophy

The project intentionally avoids heavy frameworks.

It uses:

* plain HTML
* plain CSS
* vanilla JavaScript
* JSON databases

This keeps the system:

* simple
* portable
* easy to modify
* easy to print

---

# Important Constraints for Development

When modifying code, always respect:

1. Cards must remain **print friendly**
2. Layout must work in **A4 printing**
3. Avoid heavy ink usage
4. Images must remain **local assets**
5. JSON database is the **source of truth**

---

# License

The project is distributed under a **non-commercial license**.

Users may:

* print the game
* play it
* modify it
* create expansions

Commercial use requires **explicit permission from the author**.

---

# Summary

Legends is a **printable adventure card game** powered by a simple data-driven card rendering system.

The project aims to make it easy to:

* add monsters
* expand the game
* print cards at home
* experiment with game mechanics
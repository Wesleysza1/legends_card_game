# Project Context - Legends Card Game

## Project Overview

**Legends Card Game** is an authorial homemade card game designed for **home printing and family play**.

The project contains tools to render printable cards using **HTML, CSS and JavaScript**, using a **JSON database** as the source of truth for game content.

The current implementation includes **monster cards**, **heroes**, **classes**, **subclasses**, **equipments**, **usable items**, **intrigue cards**, **events**, **relics** and **card backs**, unified in a generator hub that orchestrates all models while staying print-friendly.

Cards are designed to be printed on **A4 paper**, with **9 cards per page**, optimized for home printers (low ink usage, white backgrounds).

This project is **non-commercial** and intended for personal use and experimentation.

---

## Game Design Overview

Legends is an **adventure card game** where players explore dangerous locations and fight monsters.

Players gain:
* Glory (currency for leveling up)
* Equipment and Relics
* Level-up bonuses (class-specific)

The main goal is:

**Be the first player to equip 3 Relics on your board.**

### Two Piles System

The game uses two separate draw piles:

**Monster Pile (24 cards):** Mandatory draw every turn. Monsters always return to the bottom after combat.

**Loot Pile:** Contains equipment, usable items, intrigue cards, events, and relics. Drawn as reward for defeating monsters (1 card normal, 2 cards vs bosses).

### Board & Hand

Each player has a **board** (themed per hero) with slots for: Hero, Class, Subclass, 5 equipment slots (Weapon, Armor, Shield, 2 Accessories), 1 Trophy, and Level Tokens.

**Hand limit: 5 cards.** Excess cards return to the bottom of the loot pile.

### Glory & Levels

Monsters grant glory when defeated. Accumulated glory triggers level-ups with class-specific stat bonuses. Levels determine which monsters can be fought (monster level ≤ player level × 2).

### Defeat

Losing to a monster: no loot, skip next turn recovering (HP fully restored). Monster returns to bottom of monster pile.

### Victory Condition

First player to equip **3 relics** on their board wins.

Monster difficulty progresses approximately like this:

| Level | Difficulty                  |
| ----- | --------------------------- |
| 2–3   | Early monsters              |
| 4–5   | Mid tier monsters           |
| 6–7   | Advanced monsters           |
| 8–9   | Legendary monsters / bosses |

Some monsters are **bosses** and grant 2 loot cards instead of 1.

---

## Visual Style

The visual identity of the game is intentionally **cartoon fantasy**.

Inspirations include:
* Light adventure fantasy
* Expressive monsters
* Playful tone rather than dark realism

Art characteristics:
* Cartoon fantasy monsters
* Central character composition
* 3:2 aspect ratio
* Bright colors
* Clean white backgrounds to save ink
* Printable friendly

Images are hosted on **GitHub Pages** via a separate `assets` branch.

---

## Architecture

### Branch Structure

The project uses a **dual-branch architecture**:

**Branch `main`:**
- Source code (HTML, CSS, JS)
- JSON databases
- Documentation
- Build scripts

**Branch `assets`:**
- All game images
- Auto-generated gallery (`images/index.html`)
- Served via GitHub Pages as CDN

### Benefits

- ✅ Main repository stays lightweight
- ✅ Independent versioning of code and assets
- ✅ Free CDN via GitHub Pages (Fastly)
- ✅ Permanent and stable URLs
- ✅ Easy to update images without polluting code history

---

## Image System

### URL Structure

Images use **relative paths** in JSON:

```json
{
  "name": "Goblin das Ruínas",
  "image": "monsters/goblin_ruinas.png"
}
```

Base URL is defined in `js/cards.js`:

```javascript
const IMAGES_BASE_URL = 'https://wesleysza1.github.io/legends_card_game/images'

function getImageUrl(path) {
    return `${IMAGES_BASE_URL}/${path}`
}
```

### Advantages

- Single point of configuration
- Easy to switch between local/remote
- No URL repetition in JSONs
- Simple migration to other CDNs

### Image Preloading

The generator includes automatic image preloading:

```javascript
async function preloadAllImages() {
  // Fetches all JSON data
  // Creates Image objects for each asset
  // Browser caches them in background
}
```

This ensures fast loading when switching between card types.

---

## Current Project Structure

```
legends_card_game/
├── db/                      # JSON databases
│   ├── monsters.json        # Monster data (24 cards)
│   ├── heroes.json          # Hero data (6 cards)
│   ├── classes.json         # Class data (6 cards)
│   ├── subclasses.json      # Subclass data (18 cards)
│   ├── equipments.json      # Equipment data (24 cards)
│   ├── items.json           # Usable items data (12 unique, 36 with copies)
│   ├── intrigue.json        # Intrigue cards data (10 unique, 20 with copies)
│   ├── events.json          # Event data (12 unique, 24 with copies)
│   ├── relics.json          # Relic data (20 cards)
│   └── progression.json     # Level progression per class
├── css/                     # Stylesheets
│   ├── cards.css            # Card layouts
│   ├── generator.css        # Generator UI
│   └── backs.css            # Card backs
├── js/                      # JavaScript
│   ├── cards.js             # Card rendering engine
│   ├── generator.js         # Generator logic + preload
│   └── backs.js             # Card back rendering
├── fonts/                   # Custom fonts
│   └── warrior.ttf          # Title font
├── index.html               # Main generator page
├── guide.html               # Printable game guide
├── board.html               # Player board (per class)
├── tokens.html              # Glory and level tokens
├── monsters.html            # Monster preview
├── heroes.html              # Hero preview
├── classes.html             # Class preview
├── subclasses.html          # Subclass preview
├── backs.html               # Card backs preview
├── build_assets_index.py    # Assets gallery generator
├── update_json_paths.py     # JSON path updater
├── ABOUT.md                 # Game documentation
├── PROJECT_CONTEXT.md       # This file
├── RULES.md                 # Development rules
└── BUILD_ASSETS.md          # Assets build docs
```

---

## Card Rendering System

### Generator Hub

`index.html` (formerly `generator.html`) orchestrates all card types:

- Loads JSON data via `js/cards.js`
- Renders cards using model-specific functions
- Manages UI state and model switching
- Handles print layout (9 cards per page)
- Preloads all images on page load

### Standalone Pages

Individual HTML files exist for focused preview/printing:
- `monsters.html`
- `heroes.html`
- `classes.html`
- `subclasses.html`
- `backs.html`

All use the same rendering engine (`js/cards.js`).

---

## Database Structure

### Monsters

```json
{
  "id": 1,
  "name": "Goblin das Ruínas",
  "level": 2,
  "unique": false,
  "image": "monsters/goblin_ruinas.png",
  "stats": {
    "hp": 2,
    "damage": 1,
    "speed": 3,
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
```

**Key fields:**
- `speed` - Determines turn order in combat
- `unique` - Only one copy in deck
- `boss` - Special boss indicator
- `copies` - Number of copies to print
- `glory` - Glory points awarded when defeated (used for leveling)

### Heroes

```json
{
  "id": 1,
  "name": "Guerreiro Errante",
  "title": "Veterano das Estradas",
  "description": "Um combatente experiente...",
  "image": "heroes/guerreiro.png",
  "stats": {
    "hp": 12,
    "power": 3,
    "defense": 2,
    "speed": 1
  },
  "ability": {
    "name": "Instinto de Batalha",
    "effect": "+1 poder em todos os combates contra monstros."
  },
  "preferred_classes": ["Guerreiro", "Paladino"]
}
```

### Equipments

```json
{
  "id": 1,
  "name": "Espada Longa",
  "type": "Arma",
  "rarity": "common",
  "image": "equipments/espada_longa.png",
  "stat_bonus": { "power": 2 },
  "effect": "Ataques causam +1 dano.",
  "synergy": ["Guerreiro", "Paladino"]
}
```

---

## Printable Components

The game requires the following printable components:

### Cards (standard size)
- Heroes, Classes, Subclasses, Monsters, Equipment, Items, Intrigue, Events, Relics

### Player Boards
- 1 board per hero, themed with the character's visual identity
- Contains visual slots for all board cards
- Includes class-specific level progression table

### Glory Tokens
- Coin-shaped printable tokens
- Represent accumulated glory

### Level Tokens
- 1 set per class (6 sets total)
- Each token shows: level, stat bonus gained, glory required
- Styled with the class theme

---

## Build Scripts

### `build_assets_index.py`

Automatically generates `images/index.html` with a visual gallery of all assets.

**Features:**
- Scans all subfolders in `images/`
- Detects `.png`, `.jpg`, `.jpeg`, `.webp` files
- Generates responsive grid gallery
- Copy-to-clipboard buttons for URLs
- Dark theme matching game aesthetic

**Usage:**
```bash
python3 build_assets_index.py
```

**Pre-commit Hook:**
Configured in `.git/hooks/pre-commit` on the `assets` branch to auto-update the gallery.

### `update_json_paths.py`

Updates all JSON files to use relative paths (removes `images/` prefix).

**Usage:**
```bash
python3 update_json_paths.py
```

---

## Development Workflow

### Adding New Images

1. Switch to `assets` branch:
   ```bash
   git checkout assets
   ```

2. Add images to appropriate folder:
   ```bash
   cp new_monster.png images/monsters/
   ```

3. Commit (pre-commit hook updates gallery):
   ```bash
   git add images/
   git commit -m "Add: new monster image"
   git push origin assets
   ```

4. Switch back to main and update JSON:
   ```bash
   git checkout main
   # Edit db/monsters.json
   git commit -m "Add: new monster data"
   git push
   ```

### Adding New Card Types

1. Add JSON file in `db/`
2. Create fetch function in `js/cards.js`
3. Create render function in `js/cards.js`
4. Add model to `MODELS` object in `js/generator.js`
5. Update preload function to include new type

---

## Technical Philosophy

The project intentionally avoids heavy frameworks.

**Stack:**
- Plain HTML
- Plain CSS
- Vanilla JavaScript
- JSON databases

**Benefits:**
- Simple
- Portable
- Easy to modify
- Easy to print
- No build process
- No dependencies

---

## Important Constraints

When modifying code, always respect:

1. Cards must remain **print friendly**
2. Layout must work in **A4 printing** (9 cards per page)
3. Avoid heavy ink usage
4. Images served from GitHub Pages
5. JSON database is the **source of truth**
6. Maintain relative paths in JSONs

---

## Recent Updates (2026-03-21)

### Turn-Based Combat System
- ✅ Combat now uses **turn-based rounds** with moves and d6 dice
- ✅ Created `db/moves.json` — 3 moves per class (18 total)
- ✅ Updated `db/subclasses.json` — added `power` and `hit` to abilities
- ✅ Updated `db/monsters.json` — added `moves` field (2 per normal, 3 per boss)
- ✅ **Speed** determines initiative (who attacks first each round)
- ✅ **d6 hit system**: roll ≥ hit value = attack lands (2+ easy to 6 critical)
- ✅ Monster moves selected by d6 roll (dice ranges on card)
- ✅ Monsters can miss attacks (roll d6 for accuracy)
- ✅ New card type: **Move cards** (1 per class = 6 cards, reference during combat)
- ✅ New card type: **Combat Reference** (rules summary, 1 per player)
- ✅ Monster cards updated with attacks section
- ✅ Updated `guide.html` with full combat rules and "How to read monster attacks"
- ✅ Total moves: 90 (18 class + 18 subclass + 36 normal monster + 18 boss monster)

### Duels & Third-Party Intervention
- ✅ Players can **duel** instead of exploring (target must have 2+ relics)
- ✅ Same turn-based combat system (moves, d6, speed initiative)
- ✅ Loser with relic: discards 1 relic to bottom of loot pile
- ✅ Loser without relic: winner chooses 1 board card to discard
- ✅ Both recover full HP after duel, no glory/loot
- ✅ Protection: each player can only be challenged 1× per full round
- ✅ Third-party intervention: any player can use items/intrigue/abilities during any combat
- ✅ Enables cooperation (help vs bosses) and sabotage (hinder rivals)

### Move Card JSON Structure

```json
{
  "id": 1,
  "class": "Guerreiro",
  "name": "Corte Rápido",
  "type": "attack",
  "power": 0,
  "hit": 2,
  "effect": null,
  "description": "Um corte direto e confiável."
}
```

### Monster Move Structure

```json
"moves": [
  { "name": "Mordida", "damage": 1, "hit": 2, "dice": "1-4" },
  { "name": "Investida Feroz", "damage": 3, "hit": 4, "dice": "5-6" }
]
```

### Previous Updates (2026-03-20)

#### Game Rules Overhaul
- ✅ Victory condition changed to **3 relics equipped**
- ✅ Two-pile system: Monster Pile + Loot Pile
- ✅ Board system with defined slots (Hero, Class, Subclass, 5 equipment, 1 trophy)
- ✅ Hand limit of 5 cards
- ✅ Glory-based leveling system with class-specific progression
- ✅ Level restriction rule (monster level ≤ player level × 2)
- ✅ Defeat rule: skip next turn, full HP recovery
- ✅ Trophy slot: 1 max, last defeated monster
- ✅ Relics can be hidden in hand until equipped
- ✅ Events activate immediately, never go to hand
- ✅ All discards return to bottom of loot pile
- ✅ Loot: 1 card per victory, 2 vs bosses
- ✅ Starting hand: 3 cards from loot pile

### Planned Printable Components
- ⬜ Player boards (1 per hero, themed)
- ⬜ Glory tokens (coin format)
- ⬜ Level tokens (1 set per class)

### Previous Updates (2026-03-13)

#### Assets Architecture
- ✅ Separated images to `assets` branch
- ✅ Configured GitHub Pages on `assets` branch
- ✅ Updated all JSONs to use relative paths
- ✅ Created `getImageUrl()` helper function
- ✅ Built automatic gallery generator with pre-commit hook

#### Game Mechanics
- ✅ Added `speed` attribute to all monsters
- ✅ Speed determines turn order in combat
- ✅ Values range from 1 (slow) to 4 (fast)

#### Equipment System
- ✅ Added `image` field to all 24 equipments
- ✅ Updated card renderer to display equipment images
- ✅ Equipment images now load from GitHub Pages

#### Performance
- ✅ Implemented image preloading in generator
- ✅ All images load in background on page load
- ✅ Instant switching between card types after preload

#### UI/UX
- ✅ Renamed `generator.html` to `index.html`
- ✅ Fixed DOCTYPE issue in generator
- ✅ Created visual assets gallery at `/images/`

#### New Card Types
- ✅ Added Usable Items (12 unique, 36 total with copies)
- ✅ Added Intrigue Cards (10 unique, 20 total with copies)
- ✅ Added Events (12 unique, 24 total with copies)
- ✅ Added Relics (20 unique, 20 total)
- ✅ Total cards: **178** (up from 78)

---

## Future Expansion Plans

The game was designed to support additional card types:

- ~~Items / Consumables~~ ✅ Implemented
- ~~Events~~ ✅ Implemented
- Traps
- ~~Relics~~ ✅ Implemented
- ~~Intrigue cards~~ ✅ Implemented
- PvP duel mechanics
- Cooperative campaigns

The JSON-based system allows easy expansion.

---

## License

The project is distributed under a **non-commercial license**.

Users may:
- Print the game
- Play it
- Modify it
- Create expansions

Commercial use requires **explicit permission from the author**.

---

## Summary

Legends is a **printable adventure card game** powered by a simple data-driven card rendering system with a modern asset delivery architecture.

The project aims to make it easy to:
- Add new cards and content
- Expand the game
- Print cards at home
- Experiment with game mechanics
- Maintain a lightweight codebase

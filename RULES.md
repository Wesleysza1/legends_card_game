## Purpose

This file defines the **rules and constraints for AI coding agents** (Codex, GPT, etc.) working on this repository.

The goal is to ensure modifications **do not break the card rendering system, printing layout, or project simplicity**.

This project intentionally uses **simple technologies** and **print-focused layout rules**.

AI agents must respect these constraints.

---

# Core Principles

When modifying the codebase, follow these principles:

1. **Preserve simplicity**
2. **Maintain print compatibility**
3. **Avoid unnecessary frameworks**
4. **Keep the project portable**
5. **Do not change the data model without clear reason**

The project intentionally avoids modern build systems.

---

# Technologies Used

This project uses only:

* HTML
* CSS
* Vanilla JavaScript
* JSON

Do NOT introduce:

* React
* Vue
* Angular
* build systems
* bundlers
* npm dependencies
* server frameworks

The project must remain **fully static and runnable locally**.

---

# Printing Requirements

Cards are designed for **home printing**.

Printing constraints:

* A4 page layout
* 3 × 3 cards per page
* 9 cards per page
* printable without scaling

AI agents must NOT modify layout in ways that break printing.

Avoid:

* dynamic resizing
* responsive layouts
* viewport-based sizing
* screen-only layouts

Printing must remain the priority.

---

# Card Layout Constraints

Cards must remain consistent and readable when printed.

Required card elements:

Monster cards must include:

* name
* monster artwork
* level
* stats
* ability text
* trophy reward
* boss indicator (if applicable)

Cards must maintain a **clear hierarchy of information**.

---

# Ink Optimization

The design intentionally minimizes ink usage.

AI agents must follow these rules:

Prefer:

* white backgrounds
* thin borders
* simple shapes

Avoid:

* large colored backgrounds
* gradients covering entire cards
* heavy textures
* dark page backgrounds

Small colored elements are acceptable.

---

# Image Handling

All images are stored locally.

Image directory:

```
images/monsters/
```

Rules:

* Do not fetch images from external sources
* Do not convert images to base64
* Do not embed images inside CSS
* Always reference local paths

Example:

```
images/monsters/goblin_ruinas.png
```

---

# JSON Database Rules

The monster database is the **source of truth**.

File location:

```
db/monsters.json
```

Do not hardcode monster data inside JavaScript.

Always read data from the JSON file.

Expected structure:

```
{
  "monsters": [
    {
      "id": number,
      "name": string,
      "level": number,
      "unique": boolean,
      "image": string,
      "stats": {
        "hp": number,
        "damage": number,
        "glory": number
      },
      "ability": string,
      "reward": {
        "trophy": string|null,
        "effect": string
      },
      "boss": boolean,
      "copies": number
    }
  ]
}
```

AI agents should preserve this schema.

---

# Boss Rules

Boss monsters must be visually identifiable.

Cards must display a **boss indicator** when:

```
boss: true
```

Boss cards should stand out visually but **without heavy ink usage**.

Example approaches:

* icon
* badge
* small symbol

---

# Font Rules

Custom font used in the project:

```
fonts/warrior.ttf
```

This font is used primarily for:

* game title
* thematic headings

Body text should remain readable and simple.

Avoid using fantasy fonts for long text blocks.

---

# Code Organization Rules

Current structure:

```
css/
js/
db/
images/
fonts/
```

Rules:

Do not restructure the project unnecessarily.

Do not introduce complex folder hierarchies.

Do not rename core directories without clear justification.

---

# HTML Page Model

Currently the project uses **one page per card type**.

Examples:

```
monsters.html
backs.html
```

These pages load their respective scripts.

Example:

```
cards.js
backs.js
```

AI agents should follow the same pattern when adding new card types.

Example future pages:

```
items.html
events.html
heroes.html
```

---

# Performance Rules

Performance is not critical because the system runs locally.

However:

* keep JavaScript simple
* avoid unnecessary loops
* avoid complex abstractions

Clarity is preferred over optimization.

---

# Code Style

Prefer code that is:

* readable
* explicit
* easy to modify

Avoid:

* overly abstract code
* meta-programming
* unnecessary cleverness

Future contributors should easily understand the code.

---

# Safe Modifications

AI agents may safely:

* improve card layout
* improve readability
* add new card types
* extend JSON structures carefully
* improve printing reliability

---

# Dangerous Modifications

AI agents must avoid:

* rewriting the entire rendering system
* introducing frameworks
* converting the project into a web application
* breaking printable layout
* replacing JSON with databases

This project must remain a **simple printable card generator**.

---

# Development Goal

The goal of this repository is to maintain a **simple, expandable system for printable card games**.

Future card types may include:

* items
* heroes
* spells
* events
* traps

The architecture should remain **data-driven via JSON**.
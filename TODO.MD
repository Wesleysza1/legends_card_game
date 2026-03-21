# TODO — Sistema de Combate por Turnos

## Visão Geral

Transformar o combate estático (comparação de stats) em um **sistema de combate por rodadas** com moves, dados (d6) e decisões táticas.

### Decisões Tomadas

- ✅ Jogador tem **3 moves de classe** + **1 move especial de subclasse** (4 total)
- ✅ Monstros normais têm **2 moves**, bosses têm **3 moves**
- ✅ Sistema de acerto baseado em **d6** (rola ≥ valor de hit = acerta)
- ✅ Move do monstro definido por **d6 aleatório** (ranges no card)
- ✅ Monstro **pode errar** (rola d6 pro acerto dele também)
- ✅ Moves de classe ficam em **card novo separado** (1 por classe = 6 cards)
- ✅ Moves de monstro ficam **no próprio card** do monstro
- ✅ Cards de classe e subclasse existentes **não mudam**
- ✅ Speed define **iniciativa** (quem ataca primeiro na rodada)

### Fluxo de Combate

```
1. Iniciativa → compara speed (maior ataca primeiro)
2. Atacante escolhe/rola move → rola d6 pra acerto
3. Defensor escolhe/rola move → rola d6 pra acerto
4. Aplica dano (power do move - defesa do alvo, mínimo 0)
5. Repete até alguém chegar a 0 HP
```

### Tabela de Acerto (d6)

| Dificuldade | Acerta com | Chance |
|---|---|---|
| Fácil | 2+ | 83% |
| Normal | 3+ | 67% |
| Moderado | 4+ | 50% |
| Difícil | 5+ | 33% |
| Crítico | 6 | 17% |

---

## FASE 1 — Dados (JSONs)

Criar e atualizar os bancos de dados com os moves.

### 1.1 — Criar `db/moves.json`

- [x] Novo arquivo com 3 moves por classe (18 total)
- [ ] Schema: `id`, `class`, `name`, `type` (attack/defense/special), `power`, `hit`, `effect`, `description`

```json
{
  "moves": [
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
  ]
}
```

### 1.2 — Atualizar `db/subclasses.json`

- [x] Adicionar `power` e `hit` ao `subclass_ability` existente

```json
"subclass_ability": {
  "name": "Golpe Heroico",
  "type": "special",
  "usage": "1 vez por combate",
  "power": 3,
  "hit": 3,
  "effect": null
}
```

### 1.3 — Atualizar `db/monsters.json`

- [x] Adicionar campo `moves` a cada monstro
- [x] Monstros normais: 2 moves
- [x] Bosses: 3 moves

```json
"moves": [
  { "name": "Mordida", "damage": 1, "hit": 2, "dice": "1-4" },
  { "name": "Investida Feroz", "damage": 3, "hit": 4, "dice": "5-6" }
]
```

---

## FASE 2 — Design dos Moves

Definir os moves concretos de cada entidade.

### 2.1 — Moves de Classe (18 moves)

- [x] Definir 3 moves por classe

| Classe | Move 1 (Básico) | Move 2 (Forte) | Move 3 (Defensivo/Utilitário) |
|---|---|---|---|
| Guerreiro | Corte Rápido (hit 2+, +0) | Golpe Pesado (hit 4+, +2) | Postura Defensiva (hit 2+, +2 def) |
| Mago | Míssil Arcano (hit 2+, +0) | Explosão Mágica (hit 4+, +2) | Barreira Mágica (hit 2+, +2 def) |
| Ladino | Punhalada (hit 2+, +0) | Golpe nas Costas (hit 4+, +2) | Esquiva (hit 2+, +2 def) |
| Caçador | Tiro Rápido (hit 2+, +0) | Tiro Perfurante (hit 4+, +2) | Recuar (hit 2+, +2 def) |
| Paladino | Golpe Sagrado (hit 2+, +0) | Martelo da Luz (hit 4+, +2) | Escudo da Fé (hit 2+, +3 def) |
| Bárbaro | Pancada Bruta (hit 2+, +0) | Fúria Selvagem (hit 4+, +3) | Grito de Guerra (hit 2+, +1 power próx rodada) |

### 2.2 — Moves de Subclasse (18 moves)

- [x] Adaptar abilities existentes com valores de `hit` e `power`

### 2.3 — Moves de Monstro (54 moves)

- [x] 2 moves por monstro normal (18 monstros = 36 moves)
- [x] 3 moves por boss (6 bosses = 18 moves)

Padrão por tier:

| Tier | Move 1 (dice 1-4) | Move 2 (dice 5-6) |
|---|---|---|
| Nível 2-3 | 1 dmg, hit 2+ | 2 dmg, hit 4+ |
| Nível 4-5 | 2 dmg, hit 2+ | 3 dmg, hit 4+ |
| Nível 6-7 | 2 dmg, hit 2+ | 4 dmg, hit 5+ |

| Boss | Move 1 (1-3) | Move 2 (4-5) | Move 3 (6) |
|---|---|---|---|
| Nível 8-9 | 3 dmg, hit 2+ | 4 dmg, hit 3+ | 6 dmg, hit 5+ |

---

## FASE 3 — Layout dos Cards

Atualizar a renderização pra exibir os moves.

### 3.1 — Card de Monstro

- [x] Adicionar seção de ataques no card (abaixo da ability)

```
┌─────────────────────────────┐
│  [Imagem do Monstro]        │
│  Nome            Nível      │
│  HP | DMG | SPD | GLR       │
│  Habilidade especial        │
│─────────────────────────────│
│  ⚔️ ATAQUES                 │
│  🎲1-4  Mordida      1⚔ 2+ │
│  🎲5-6  Investida    3⚔ 4+ │
│─────────────────────────────│
│  🏆 Troféu: ...             │
└─────────────────────────────┘
```

### 3.2 — Criar card novo de Moves (1 por classe = 6 cards)

- [x] Card separado de referência de combate por classe
- [x] Mostra os 3 moves base + lembrete dos specials (classe e subclasse)
- [x] Jogador mantém ao lado do board (não ocupa slot na mão)

```
┌─────────────────────────────┐
│  GUERREIRO — MOVES          │
│─────────────────────────────│
│  ⚔ Corte Rápido             │
│  +0 poder  |  Acerta 2+     │
│─────────────────────────────│
│  ⚔ Golpe Pesado             │
│  +2 poder  |  Acerta 4+     │
│─────────────────────────────│
│  🛡 Postura Defensiva        │
│  +2 defesa |  Acerta 2+     │
│─────────────────────────────│
│  ⭐ Golpe Poderoso (Classe)  │
│  +2 dano   |  1× por combate│
│─────────────────────────────│
│  ⭐ [Move da Subclasse]      │
│  Varia     |  1× por combate│
└─────────────────────────────┘
```

### 3.3 — Atualizar `css/cards.css`

- [x] Estilos pra seção de moves nos cards de monstro
- [x] Estilos pro novo card de moves de classe

### 3.4 — Atualizar `js/cards.js`

- [x] Função de renderização de moves nos cards de monstro
- [x] Função de renderização do novo card de moves de classe

---

## FASE 4 — Gerador e Páginas

Integrar no sistema existente.

### 4.1 — Atualizar `js/generator.js`

- [x] Adicionar "Moves" ao objeto `MODELS`
- [x] Incluir no preload

### 4.2 — Atualizar `index.html`

- [x] Adicionar opção "Moves" no seletor do gerador

### 4.3 — Atualizar `guide.html`

- [x] Seção de regras de combate por rodadas
- [x] Fluxo de combate (iniciativa → moves → acerto → dano)
- [x] Tabela de referência do d6
- [x] Como ler os moves no card do monstro
- [x] Como usar moves de classe e subclasse

---

## FASE 5 — Card de Referência de Combate

### 5.1 — Criar card imprimível de referência

- [x] Card universal (1 por jogador) com:
  - Fluxo de combate resumido
  - Tabela do d6 (2+ até 6)
  - Regra de iniciativa (speed)
  - Regra de dano (power do move - defesa)

---

## FASE 6 — Documentação

### 6.1 — Atualizar `ABOUT.md`

- [x] Seção de sistema de combate por turnos
- [x] Descrição dos moves
- [x] Regras do d6

### 6.2 — Atualizar `PROJECT_CONTEXT.md`

- [x] Novo tipo de card (moves)
- [x] Estrutura do JSON de moves
- [x] Registro das mudanças

### 6.3 — Atualizar `README.md`

- [x] Contagem de cartas atualizada
- [x] Menção ao sistema de combate

---

## Resumo de Entregas

| Fase | O que | Arquivos |
|---|---|---|
| 1 | JSONs com dados de moves | `db/moves.json`, `db/monsters.json`, `db/subclasses.json` |
| 2 | Design de todos os moves | Mesmos JSONs da fase 1 |
| 3 | Layout visual dos cards | `css/cards.css`, `js/cards.js` |
| 4 | Integração no gerador + guia | `js/generator.js`, `index.html`, `guide.html` |
| 5 | Card de referência de combate | `guide.html` ou novo HTML |
| 6 | Documentação | `ABOUT.md`, `PROJECT_CONTEXT.md`, `README.md` |


---
EXTRA: ~~Implementar lógica de duelos no guide.html, interessante adicionar na fase de explocação que o jogador pode duelar contra um adversario ou comprar um monstro. E entao ter uma seção explicando os duelos e seus reultados~~ ✅

### Decisões de Duelo
- ✅ Só pode duelar jogador com **2+ relíquias equipadas**
- ✅ Mesmo sistema de combate por turnos (moves, d6, speed)
- ✅ Perdedor com relíquia: descarta 1 relíquia à escolha
- ✅ Perdedor sem relíquia: vencedor escolhe 1 carta do board pra descartar
- ✅ Sem glória, sem espólio — benefício é estratégico
- ✅ Ambos recuperam HP total após duelo
- ✅ Proteção: 1 desafio por jogador por rodada completa
- ✅ Desafiante assume risco (pode perder relíquia também)
- ✅ Terceiros podem intervir com itens/intrigas/habilidades em qualquer combate
- ✅ Atualizado: guide.html, ABOUT.md, PROJECT_CONTEXT.md, README.md
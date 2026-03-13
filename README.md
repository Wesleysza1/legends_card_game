# LEGENDS

### A Homemade Adventure Card Game

Legends é um jogo de cartas autoral focado em **aventura, exploração de monstros e progressão de heróis**. O jogo foi projetado para ser **impresso em casa**, jogado com amigos ou família e expandido com novas cartas.

Cada jogador assume o papel de um aventureiro explorando um mundo cheio de criaturas perigosas. Ao derrotar monstros, o herói ganha **glória, troféus e níveis**, tornando-se cada vez mais poderoso.

**O primeiro jogador a alcançar o nível máximo se torna uma lenda.**

---

## 🌐 Acesso Online

**Gerador de Cartas:** https://wesleysza1.github.io/legends_card_game/

**Galeria de Assets:** https://wesleysza1.github.io/legends_card_game/images/

---

## 🎯 Visão do Jogo

Legends combina três pilares de design:

- **Exploração** - Cada carta revelada pode trazer perigo, recompensa ou surpresa
- **Progressão** - Jogadores evoluem de aventureiros iniciantes para heróis lendários
- **Interação leve** - Duelos, efeitos e habilidades criam momentos imprevisíveis

O jogo foi projetado para ser simples de aprender, rápido de jogar e profundo o suficiente para decisões táticas.

---

## 🎮 Componentes Atuais

### Heróis (6 cartas)
Personagens jogáveis com stats únicos e habilidades especiais:
- Guerreiro Errante
- Ladra das Sombras
- Maga Arcana
- Caçador da Fronteira
- Paladina da Aurora
- Bárbaro das Terras Altas

### Classes (6 cartas)
Definem o estilo base de combate:
- Guerreiro
- Mago
- Ladino
- Caçador
- Paladino
- Bárbaro

### Subclasses (18 cartas)
Especializações que expandem as classes base com habilidades únicas.

### Monstros (24 cartas)
Inimigos encontrados durante a exploração. Cada monstro possui:
- Nome, Nível, Vida, Dano, Velocidade, Glória
- Habilidade especial única
- Recompensa (troféu ou níveis diretos)

### Equipamentos (24 cartas)
Armas, armaduras, escudos e acessórios que fortalecem o herói:
- 8 Armas
- 6 Armaduras
- 3 Escudos
- 7 Acessórios

### Chefes (6 cartas)
Monstros raros e extremamente poderosos que concedem múltiplos níveis:
- Dragão das Ruínas
- Hidra Selvagem
- Titã Adormecido
- Lich Antigo
- Behemoth Abissal
- Demônio Menor

---

## 🖨️ Como Usar

### Online (Recomendado)

1. Acesse: https://wesleysza1.github.io/legends_card_game/
2. Selecione o tipo de carta desejado (Monstros, Heróis, Classes, etc)
3. Clique em "Imprimir/Exportar PDF"
4. Imprima em papel adequado (recomendado: papel fotográfico ou cartolina)
5. Recorte as cartas e divirta-se!

### Local

1. Clone o repositório
2. Abra `index.html` no navegador
3. As imagens serão carregadas automaticamente do GitHub Pages

Para regras completas e detalhes do jogo, consulte [ABOUT.md](ABOUT.md).

---

## 🎲 Progressão de Monstros

### Iniciantes (Nível 2–3)
Goblin das Ruínas • Lobo Sombrio • Esqueleto Guardião • Slime Ácido • Bandido das Estradas • Mímico Faminto

### Intermediários (Nível 4–5)
Orc Brutamontes • Gárgula de Pedra • Aranha Gigante • Cavaleiro Espectral • Ogro das Cavernas • Cultista Sombrio

### Avançados (Nível 6–7)
Troll Regenerador • Serpente das Profundezas • Quimera Jovem • Necromante Caído • Gigante de Ferro • Guardião Ancestral

### Lendários (Nível 8–9)
Demônio Menor • Dragão das Ruínas • Hidra Selvagem • Titã Adormecido • Lich Antigo • Behemoth Abissal

---

## 🎨 Identidade Visual

Legends utiliza uma identidade visual inspirada em **fantasia caricata e aventura leve**:
- Arte estilo cartoon
- Monstros expressivos
- Cores vibrantes
- Fundo simples para impressão econômica
- Proporção de imagem 3:2

O objetivo visual é transmitir **aventura divertida**, não terror ou realismo pesado.

**Nota:** As imagens foram geradas com auxílio de IA (Gemini).

---

## 🏗️ Arquitetura do Projeto

### Separação de Assets

O projeto utiliza uma arquitetura de **branches separadas** para otimizar o repositório:

- **Branch `main`** - Código-fonte (HTML, CSS, JS, JSON)
- **Branch `assets`** - Imagens das cartas (servidas via GitHub Pages)

**Vantagens:**
- ✅ Repositório principal leve e rápido
- ✅ Versionamento independente de código e assets
- ✅ CDN gratuito via GitHub Pages (Fastly)
- ✅ URLs permanentes e estáveis

### Sistema de URLs

As imagens são referenciadas nos JSONs usando **caminhos relativos**:

```json
{
  "name": "Goblin das Ruínas",
  "image": "monsters/goblin_ruinas.png"
}
```

A URL base é definida em `js/cards.js`:

```javascript
const IMAGES_BASE_URL = 'https://wesleysza1.github.io/legends_card_game/images'
```

Isso permite:
- Fácil migração para outro CDN
- Teste local alterando apenas uma linha
- Sem repetição de URLs nos JSONs

---

## 📁 Estrutura do Projeto

```
legends_card_game/
├── db/                      # Banco de dados JSON
│   ├── monsters.json        # Dados dos monstros
│   ├── heroes.json          # Dados dos heróis
│   ├── classes.json         # Dados das classes
│   ├── subclasses.json      # Dados das subclasses
│   └── equipments.json      # Dados dos equipamentos
├── css/                     # Estilos
│   ├── cards.css            # Estilos dos cards
│   ├── generator.css        # Estilos do gerador
│   └── backs.css            # Estilos dos versos
├── js/                      # Scripts
│   ├── cards.js             # Renderização de cards
│   ├── generator.js         # Lógica do gerador
│   └── backs.js             # Renderização de versos
├── fonts/                   # Fontes customizadas
│   └── warrior.ttf          # Fonte do título
├── index.html               # Página principal (gerador)
├── monsters.html            # Preview de monstros
├── heroes.html              # Preview de heróis
├── classes.html             # Preview de classes
├── subclasses.html          # Preview de subclasses
├── backs.html               # Preview de versos
├── build_assets_index.py    # Script para gerar galeria de assets
├── update_json_paths.py     # Script para atualizar paths nos JSONs
├── ABOUT.md                 # Documentação completa do jogo
├── PROJECT_CONTEXT.md       # Contexto técnico do projeto
├── RULES.md                 # Regras para desenvolvimento
└── BUILD_ASSETS.md          # Documentação do build de assets
```

---

## 🛠️ Scripts Utilitários

### `build_assets_index.py`

Gera automaticamente a galeria visual de assets (`images/index.html`).

```bash
python3 build_assets_index.py
```

**Uso automático:** Configurado como pre-commit hook na branch `assets`.

### `update_json_paths.py`

Atualiza todos os JSONs para usar caminhos relativos.

```bash
python3 update_json_paths.py
```

---

## 🚀 Desenvolvimento

### Adicionar Novas Imagens

1. Mude para a branch `assets`:
   ```bash
   git checkout assets
   ```

2. Adicione as imagens na pasta correta:
   ```bash
   cp nova_imagem.png images/monsters/
   ```

3. Commit e push (o pre-commit hook atualiza o index automaticamente):
   ```bash
   git add images/
   git commit -m "Add: nova imagem de monstro"
   git push origin assets
   ```

4. Volte para a branch principal e atualize o JSON correspondente:
   ```bash
   git checkout main
   # Edite db/monsters.json adicionando a nova entrada
   git commit -m "Add: novo monstro no JSON"
   git push
   ```

### Testar Localmente

```bash
# Inicie um servidor local (ex: Live Server no VSCode)
# As imagens serão carregadas do GitHub Pages automaticamente
```

---

## 🎯 Futuro do Jogo

Legends foi projetado para crescer. Expansões planejadas incluem:
- Itens utilizáveis
- Eventos de exploração
- Armadilhas
- Cartas de intriga
- Relíquias lendárias
- Duelos entre jogadores
- Campanhas cooperativas

O sistema modular permite adicionar novos conteúdos facilmente.

---

## 📊 Estatísticas do Projeto

- **Total de Cartas:** 78+
- **Monstros:** 24 (incluindo 6 chefes)
- **Heróis:** 6
- **Classes:** 6
- **Subclasses:** 18
- **Equipamentos:** 24
- **Imagens:** 79+ assets

---

## 📜 Licença

Este projeto está sob uma licença proprietária não comercial. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

**Resumo:**
- ✅ Uso pessoal e educacional livre
- ✅ Modificação e estudo do código
- ❌ Uso comercial requer autorização
- ❌ Venda ou monetização sem permissão

---

## 👤 Autor

Wesley Souza (wesleysza1@gmail.com)

**Repositório:** https://github.com/Wesleysza1/legends_card_game

---

## 🤝 Contribuições

Contribuições são bem-vindas para uso não comercial. Sinta-se livre para abrir issues ou pull requests.

---

## 📚 Documentação Adicional

- [ABOUT.md](ABOUT.md) - Visão completa do jogo e mecânicas
- [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) - Contexto técnico e decisões de design
- [RULES.md](RULES.md) - Regras para desenvolvimento e modificações
- [BUILD_ASSETS.md](BUILD_ASSETS.md) - Como funciona o sistema de build de assets

# Assets Index Generator

Este script gera automaticamente o `images/index.html` com uma galeria visual de todos os assets do projeto.

## Como usar

### Manualmente

Execute o script sempre que adicionar novas imagens:

```bash
python3 build_assets_index.py
```

### Automaticamente (Pre-commit Hook)

O hook já está configurado! Toda vez que você fizer um commit, o `index.html` será atualizado automaticamente.

```bash
git add images/monsters/nova_imagem.png
git commit -m "Add: nova imagem de monstro"
# O hook roda automaticamente e atualiza o index.html
```

## O que o script faz

1. Escaneia todas as subpastas dentro de `images/`
2. Lista todos os arquivos `.png`, `.jpg`, `.jpeg`, `.webp`
3. Gera um HTML com galeria visual organizada por categoria
4. Cada imagem tem um botão para copiar a URL do GitHub Pages

## Resultado

Após o commit, acesse:
```
https://wesleysza1.github.io/legends_card_game/images/
```

## Estrutura esperada

```
images/
├── classes/
├── equipments/
├── heroes/
├── monsters/
└── subclasses/
```

O script detecta automaticamente qualquer nova pasta que você criar dentro de `images/`.

# Assets Branch

Esta branch contém apenas os **assets estáticos** do projeto Legends Card Game (imagens das cartas).

## Propósito

Separar as imagens do código-fonte principal para:
- Reduzir o tamanho do repositório principal
- Facilitar versionamento independente dos assets
- Servir as imagens via GitHub Pages como CDN gratuito

## Estrutura

```
images/
├── monsters/       # Imagens dos monstros
├── heroes/         # Imagens dos heróis
├── classes/        # Imagens das classes
├── subclasses/     # Imagens das subclasses
└── equipments/     # Imagens dos equipamentos
```

## Como usar

### 1. Ativar GitHub Pages

1. Acesse: `https://github.com/Wesleysza1/legends_card_game/settings/pages`
2. Em **Source**, selecione:
   - Branch: `assets`
   - Folder: `/ (root)`
3. Clique em **Save**

Após alguns minutos, as imagens estarão disponíveis em:
```
https://wesleysza1.github.io/legends_card_game/images/monsters/goblin_ruinas.png
https://wesleysza1.github.io/legends_card_game/images/heroes/guerreiro_errante.png
...
```

### 2. Atualizar os JSONs na branch principal

Na branch `main` (ou `master`), os arquivos JSON devem apontar para as URLs do GitHub Pages:

```json
{
  "id": 1,
  "name": "Goblin das Ruínas",
  "image": "https://wesleysza1.github.io/legends_card_game/images/monsters/goblin_ruinas.png"
}
```

### 3. Adicionar novas imagens

Para adicionar novas imagens:

```bash
# Mudar para a branch assets
git checkout assets

# Adicionar as novas imagens na pasta correta
cp nova_imagem.png images/monsters/

# Commit e push
git add images/
git commit -m "Add: nova imagem de monstro"
git push origin assets
```

As imagens estarão disponíveis automaticamente via GitHub Pages em alguns segundos.

## Vantagens

- ✅ Hospedagem gratuita e ilimitada
- ✅ CDN global (Fastly)
- ✅ URLs permanentes e estáveis
- ✅ Versionamento independente
- ✅ Não polui o histórico do código principal
- ✅ Fácil de atualizar

## Notas

- Esta branch contém **apenas** a pasta `images/` e este README
- Não adicione código-fonte nesta branch
- O código principal permanece na branch `main`/`master`

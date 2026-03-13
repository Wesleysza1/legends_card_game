# Autenticação com Senha

Este projeto utiliza autenticação simples por senha para proteger o acesso ao gerador de cartas.

## Como Funciona

1. **Frontend (`js/auth.js`)**: Solicita senha ao usuário via `prompt()`
2. **Backend (`api/check-password.js`)**: Valida a senha usando variável de ambiente
3. **Sessão**: Mantém autenticação durante a sessão do navegador

## Configuração no Vercel

### 1. Adicionar Variável de Ambiente

1. Acesse o dashboard do Vercel
2. Vá em **Settings** → **Environment Variables**
3. Adicione:
   - **Key:** `SITE_PASSWORD`
   - **Value:** `sua_senha_secreta_aqui`
   - **Environments:** Production, Preview, Development

### 2. Redeploy

Após adicionar a variável de ambiente, faça um novo deploy:

```bash
git add .
git commit -m "Add: password authentication"
git push
```

Ou force redeploy no dashboard do Vercel.

## Testando Localmente

### Opção 1: Com Vercel CLI (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Adicionar variável local
vercel env pull .env.local

# Rodar localmente
vercel dev
```

### Opção 2: Com arquivo .env

1. Copie o arquivo de exemplo:
   ```bash
   cp .env.example .env
   ```

2. Edite `.env` e defina sua senha:
   ```
   SITE_PASSWORD=minha_senha_local
   ```

3. Instale o Vercel CLI e rode:
   ```bash
   npm i -g vercel
   vercel dev
   ```

**Nota:** O arquivo `.env` está no `.gitignore` e não será commitado.

## Segurança

- ✅ Senha nunca exposta no código-fonte
- ✅ Validação server-side
- ✅ Sessão mantida apenas no navegador
- ⚠️ Proteção básica (não é autenticação enterprise)

## Desabilitar Autenticação

Para desabilitar temporariamente, remova esta linha do `index.html`:

```html
<script src="js/auth.js"></script>
```

## Trocar Senha

1. Vá no Vercel Dashboard → Settings → Environment Variables
2. Edite `SITE_PASSWORD`
3. Redeploy (automático ou manual)

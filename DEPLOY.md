# 🚀 Guia de Deploy

Este guia mostra como fazer deploy do sistema de oficina de motos.

## Opção 1: Deploy no Vercel (Recomendado)

O Vercel é a maneira mais fácil e rápida de fazer deploy.

### Passo a Passo:

1. **Criar conta no Vercel**
   - Acesse: https://vercel.com
   - Faça login com sua conta GitHub

2. **Importar Projeto**
   - Clique em "Add New Project"
   - Selecione seu repositório do GitHub
   - Clique em "Import"

3. **Configurar Build**
   - Framework Preset: `Vite`
   - Build Command: `pnpm build` (ou deixe em branco para usar o padrão)
   - Output Directory: `dist`

4. **Deploy**
   - Clique em "Deploy"
   - Aguarde alguns minutos
   - Seu site estará disponível em: `seu-projeto.vercel.app`

### Deploy Automático:
- Cada push para a branch `main` fará deploy automático
- Branches de feature criam previews automáticos

---

## Opção 2: Deploy no Netlify

Outra opção popular e gratuita.

### Passo a Passo:

1. **Criar conta no Netlify**
   - Acesse: https://netlify.com
   - Faça login com GitHub

2. **Novo Site**
   - "Add new site" > "Import an existing project"
   - Conecte com GitHub
   - Selecione o repositório

3. **Configurações de Build**
   - Build command: `pnpm build`
   - Publish directory: `dist`

4. **Deploy**
   - Clique em "Deploy site"
   - Seu site estará em: `seu-projeto.netlify.app`

---

## Opção 3: GitHub Pages

Para hospedar diretamente no GitHub.

### Passo a Passo:

1. **Instalar gh-pages**
   ```bash
   pnpm add -D gh-pages
   ```

2. **Adicionar scripts no package.json**
   ```json
   {
     "scripts": {
       "predeploy": "pnpm build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Fazer Deploy**
   ```bash
   pnpm run deploy
   ```

4. **Configurar GitHub Pages**
   - Vá em Settings do repositório
   - Pages > Source: `gh-pages` branch
   - Salvar

5. **Acessar**
   - Seu site estará em: `https://seu-usuario.github.io/nome-repo`

---

## Preparando o Código para Deploy

### 1. Criar Repositório no GitHub

```bash
# Inicializar git (se ainda não fez)
git init

# Adicionar arquivos
git add .

# Commit inicial
git commit -m "Initial commit - Sistema Oficina Motos"

# Adicionar repositório remoto
git remote add origin https://github.com/seu-usuario/oficina-motos.git

# Push para GitHub
git branch -M main
git push -u origin main
```

### 2. Verificar .gitignore

Certifique-se de que o arquivo `.gitignore` contém:

```
node_modules/
dist/
.env
.DS_Store
*.log
```

---

## Configurações Importantes

### Base URL (GitHub Pages)

Se usar GitHub Pages, adicione no `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/nome-do-repositorio/',
  // ... resto da config
})
```

### Variáveis de Ambiente

Se precisar de variáveis de ambiente:

1. Crie arquivo `.env.local` (não commitado)
2. Configure no painel da plataforma (Vercel/Netlify)

---

## Domínio Personalizado

### Vercel:
1. Vá em Settings > Domains
2. Adicione seu domínio
3. Configure DNS conforme instruções

### Netlify:
1. Domain settings > Add custom domain
2. Configure DNS

### GitHub Pages:
1. Adicione arquivo `CNAME` na pasta `public/`
2. Configure DNS para apontar para GitHub

---

## Monitoramento

Após o deploy, verifique:

- ✅ Site carrega corretamente
- ✅ Dados de exemplo aparecem
- ✅ Todas as páginas funcionam
- ✅ Export/Import de dados funciona
- ✅ LocalStorage persiste dados

---

## Solução de Problemas

### Build falha:
```bash
# Limpar cache e reinstalar
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm build
```

### Rotas não funcionam:
- Configure redirects/rewrites na plataforma
- Vercel: criar `vercel.json`
- Netlify: criar `_redirects` em `public/`

### Deploy lento:
- Verifique tamanho do bundle
- Use `pnpm build` local para testar
- Otimize imagens e dependências

---

## Comandos Úteis

```bash
# Instalar dependências
pnpm install

# Desenvolvimento local
pnpm dev

# Build de produção
pnpm build

# Preview do build
pnpm preview

# Deploy (se configurado)
pnpm run deploy
```

---

## 🎉 Pronto!

Seu sistema de oficina de motos está no ar!

**URL do projeto:** Configure conforme a plataforma escolhida

**Próximos passos:**
- Compartilhe o link com sua equipe
- Configure backups regulares
- Personalize cores e textos se necessário
- Adicione funcionalidades extras conforme necessidade

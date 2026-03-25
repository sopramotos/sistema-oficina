# 📋 Configuração do GitHub

Guia passo a passo para colocar seu projeto no GitHub e permitir adição/exclusão de dados.

## 🔧 Pré-requisitos

- Ter Git instalado no computador
- Ter uma conta no GitHub (gratuita)
- Terminal/Prompt de comando

## 📝 Passo 1: Criar Repositório no GitHub

1. Acesse: https://github.com
2. Faça login na sua conta
3. Clique no botão **"+"** no canto superior direito
4. Selecione **"New repository"**

### Configurações do Repositório:
- **Repository name**: `oficina-motos-sistema` (ou o nome que preferir)
- **Description**: "Sistema completo de gerenciamento para oficina de motos"
- **Visibilidade**:
  - 🔓 **Public** - Qualquer pessoa pode ver (recomendado para portfolio)
  - 🔒 **Private** - Apenas você e colaboradores podem ver
- **NÃO** marque: "Add README" (já temos um)
- Clique em **"Create repository"**

## 💻 Passo 2: Conectar Projeto Local ao GitHub

Copie os comandos que aparecem na tela do GitHub ou use os abaixo:

### Se for a primeira vez usando Git no projeto:

```bash
# Navegar até a pasta do projeto
cd /tmp/sandbox

# Inicializar repositório Git
git init

# Adicionar todos os arquivos
git add .

# Fazer o primeiro commit
git commit -m "Initial commit: Sistema completo de oficina de motos"

# Conectar com o GitHub (substitua SEU-USUARIO e NOME-REPO)
git remote add origin https://github.com/SEU-USUARIO/NOME-REPO.git

# Renomear branch para main
git branch -M main

# Enviar para o GitHub
git push -u origin main
```

### Exemplo com valores reais:
```bash
git remote add origin https://github.com/joaosilva/oficina-motos-sistema.git
git branch -M main
git push -u origin main
```

## 🔑 Autenticação

Se pedir usuário e senha, você tem 2 opções:

### Opção A: Token de Acesso Pessoal (Recomendado)

1. No GitHub, vá em: **Settings** > **Developer settings** > **Personal access tokens** > **Tokens (classic)**
2. Clique em **"Generate new token"** > **"Generate new token (classic)"**
3. Dê um nome: "Deploy Oficina Motos"
4. Selecione escopo: **repo** (marque todas)
5. Clique em **"Generate token"**
6. **COPIE O TOKEN** (você só verá uma vez!)
7. Use o token como senha quando o Git pedir

### Opção B: SSH (Mais técnico)

1. Gerar chave SSH: `ssh-keygen -t ed25519 -C "seu-email@example.com"`
2. Adicionar no GitHub: Settings > SSH and GPG keys
3. Usar URL SSH: `git@github.com:SEU-USUARIO/NOME-REPO.git`

## 📤 Passo 3: Enviando Atualizações

Sempre que fizer alterações no código:

```bash
# Ver arquivos modificados
git status

# Adicionar arquivos modificados
git add .

# Ou adicionar arquivo específico
git add src/app/App.tsx

# Fazer commit com mensagem descritiva
git commit -m "Descrição da alteração"

# Enviar para o GitHub
git push
```

### Exemplos de mensagens de commit:
```bash
git commit -m "Adiciona funcionalidade de exportar relatório"
git commit -m "Corrige bug no cálculo de estoque"
git commit -m "Melhora visual do dashboard"
git commit -m "Atualiza dados de exemplo"
```

## 🗑️ Adição e Exclusão de Arquivos

### Adicionar novos arquivos:
```bash
# Criar novo arquivo
touch src/app/components/NovoComponente.tsx

# Adicionar ao Git
git add src/app/components/NovoComponente.tsx

# Commit
git commit -m "Adiciona novo componente"

# Push
git push
```

### Excluir arquivos:
```bash
# Remover arquivo
git rm src/app/components/ArquivoAntigo.tsx

# Commit
git commit -m "Remove componente antigo"

# Push
git push
```

### Renomear arquivos:
```bash
# Renomear
git mv arquivo-antigo.tsx arquivo-novo.tsx

# Commit
git commit -m "Renomeia arquivo"

# Push
git push
```

## 🌿 Trabalhando com Branches

Branches permitem desenvolver features sem afetar o código principal:

```bash
# Criar nova branch
git checkout -b feature/nova-funcionalidade

# Fazer alterações e commit
git add .
git commit -m "Implementa nova funcionalidade"

# Enviar branch para o GitHub
git push -u origin feature/nova-funcionalidade

# Voltar para a branch main
git checkout main

# Mesclar mudanças (após testar)
git merge feature/nova-funcionalidade

# Push da main atualizada
git push
```

## 🔄 Sincronizando com o GitHub

Se outras pessoas estiverem trabalhando no projeto:

```bash
# Baixar últimas alterações
git pull

# Se tiver conflitos, resolver e depois:
git add .
git commit -m "Resolve conflitos"
git push
```

## 📊 Visualizando Histórico

```bash
# Ver commits recentes
git log

# Ver commits de forma resumida
git log --oneline

# Ver alterações de um arquivo
git log -- src/app/App.tsx

# Ver diferenças antes de commitar
git diff
```

## 🛠️ Comandos Úteis

```bash
# Desfazer alterações não commitadas
git checkout -- arquivo.tsx

# Desfazer último commit (mantém alterações)
git reset --soft HEAD~1

# Ver branches
git branch -a

# Apagar branch local
git branch -d nome-branch

# Apagar branch remota
git push origin --delete nome-branch

# Ver repositório remoto
git remote -v

# Limpar arquivos não rastreados
git clean -fd
```

## ⚠️ Importante: Dados do Sistema

### Os dados do LocalStorage NÃO vão para o GitHub!

- Os dados (clientes, motos, ordens) ficam apenas no navegador
- Cada usuário terá seus próprios dados
- Para compartilhar dados:
  1. Exportar backup (página Dados)
  2. Enviar arquivo JSON para o outro usuário
  3. Outro usuário importa o backup

### Não commite dados sensíveis!

Nunca adicione ao Git:
- ❌ Arquivos com senhas
- ❌ Chaves de API
- ❌ Dados de clientes reais
- ❌ Informações confidenciais

Use `.gitignore` para excluir:
```
.env
.env.local
*.backup.json
dados-reais/
```

## 🎯 Fluxo de Trabalho Completo

1. **Desenvolvimento Local**: Fazer alterações no código
2. **Testar**: Verificar se tudo funciona
3. **Add**: `git add .`
4. **Commit**: `git commit -m "Mensagem"`
5. **Push**: `git push`
6. **Deploy**: Plataforma faz deploy automático (se configurado)

## 🆘 Problemas Comuns

### "Permission denied"
- Verifique se está usando o token correto
- Ou configure SSH corretamente

### "Conflict"
- Fazer `git pull` primeiro
- Resolver conflitos manualmente
- Depois `git add .` e `git commit`

### "Branch diverged"
```bash
git pull --rebase
# Resolver conflitos se houver
git push
```

## 📚 Recursos Adicionais

- **Documentação Git**: https://git-scm.com/doc
- **GitHub Guides**: https://guides.github.com
- **Git Cheat Sheet**: https://training.github.com/downloads/github-git-cheat-sheet.pdf

## ✅ Checklist Final

- [ ] Repositório criado no GitHub
- [ ] Projeto conectado com `git remote`
- [ ] Primeiro push feito com sucesso
- [ ] `.gitignore` configurado corretamente
- [ ] Token de acesso ou SSH configurado
- [ ] README.md visível no GitHub
- [ ] Pronto para fazer deploy!

---

**🎉 Parabéns! Seu projeto está no GitHub!**

Agora você pode:
- ✅ Versionar seu código
- ✅ Trabalhar de qualquer computador
- ✅ Colaborar com outras pessoas
- ✅ Fazer deploy automático
- ✅ Manter histórico de alterações

# 📖 Manual de Uso - Sistema Oficina de Motos

Guia completo para usar o sistema no dia a dia da oficina.

## 🎯 Início Rápido

1. **Abra o sistema** no navegador
2. O sistema já vem com dados de exemplo
3. Use o menu lateral para navegar entre as páginas

## 📱 Navegação

### Menu Lateral:
- 📊 **Dashboard** - Visão geral do dia
- 👥 **Clientes** - Gerenciar clientes
- 🏍️ **Motos** - Cadastro de motos
- 📝 **Ordens de Serviço** - Gerenciar serviços
- 📦 **Estoque** - Controle de peças
- 💾 **Dados** - Backup e restauração

**Dica**: Clique no ☰ para esconder/mostrar o menu

---

## 📊 Dashboard

### O que você vê:
- **Faturamento Hoje**: Soma dos serviços entregues hoje
- **Serviços Hoje**: Quantidade de ordens criadas hoje
- **Ordens em Aberto**: Serviços não entregues
- **Alertas de Estoque**: Peças com estoque baixo

### Uso:
- Acesse pela manhã para ver o que precisa fazer
- Monitore alertas de estoque
- Acompanhe o faturamento em tempo real

---

## 👥 Clientes

### Cadastrar Novo Cliente:

1. Clique em **"+ Novo Cliente"**
2. Preencha:
   - Nome do cliente
   - Telefone (com DDD)
3. Clique em **"Adicionar Cliente"**

### Buscar Cliente:
- Digite nome ou telefone na barra de busca
- A lista filtra automaticamente

### Informações do Card:
- Nome e telefone
- Quantidade de motos cadastradas
- Total de serviços realizados
- Últimos 3 serviços

### Excluir Cliente:
- Clique no ícone 🗑️ no card do cliente
- ⚠️ **Atenção**: Remove também as motos e ordens

---

## 🏍️ Motos

### Cadastrar Nova Moto:

1. Clique em **"+ Nova Moto"**
2. Preencha:
   - **Cliente**: Selecione da lista
   - **Modelo**: Ex: Honda CG 160
   - **Placa**: Ex: ABC-1234
   - **Ano**: Opcional (Ex: 2022)
3. Clique em **"Adicionar Moto"**

### Buscar Moto:
- Digite modelo ou placa na busca
- Ex: "CG" ou "ABC-1234"

### Excluir Moto:
- Clique no ícone 🗑️
- ⚠️ Remove também as ordens de serviço desta moto

---

## 📝 Ordens de Serviço (Principal)

### Criar Nova Ordem (RÁPIDO):

1. Clique em **"+ Nova Ordem"**
2. Preencha:
   - **Cliente**: Selecione da lista
   - **Moto**: Selecione uma moto do cliente
   - **Serviço**: Descreva o que foi feito
   - **Valor**: Preço em R$
   - **Data**: Selecione a data
   - **Status**:
     - 🟡 Em Andamento
     - 🔵 Pronto
     - 🟢 Entregue
3. Clique em **"Criar Ordem de Serviço"**

⏱️ **Meta**: Criar ordem em menos de 10 segundos!

### Filtrar Ordens:
Clique nos botões no topo:
- **Todas** - Mostra todas as ordens
- **Em Andamento** - Serviços sendo feitos
- **Prontas** - Aguardando retirada
- **Entregues** - Finalizadas

### Atualizar Status:

**De "Em Andamento" → "Pronto":**
- Clique em **"Marcar como Pronto"** no card
- Use quando terminar o serviço

**De "Pronto" → "Entregue":**
- Clique em **"Marcar como Entregue"**
- Use quando cliente retirar a moto

### Informações da Ordem:
Cada card mostra:
- Nome do cliente e moto
- Status atual (badge colorido)
- Descrição do serviço
- Data e valor
- Botões de ação

### Excluir Ordem:
- Clique no ícone 🗑️
- Confirme a exclusão

---

## 📦 Estoque

### Cadastrar Nova Peça:

1. Clique em **"+ Nova Peça"**
2. Preencha:
   - **Nome**: Ex: Óleo 10W40
   - **Categoria**: Ex: Lubrificantes
   - **Quantidade**: Quantidade atual
   - **Estoque Mínimo**: Alerta quando atingir
3. Clique em **"Adicionar Peça"**

### Ajustar Quantidade:
Cada card tem botões:
- **-1**: Diminui 1 unidade (quando usar)
- **+1**: Aumenta 1 unidade (quando comprar)

### Editar Peça:
- Clique no ícone ✏️
- Altere informações
- Clique em **"Atualizar Peça"**

### Alertas de Estoque:
- Cards com borda amarela = estoque baixo
- ⚠️ símbolo aparece no card
- Dashboard mostra total de alertas

### Excluir Peça:
- Clique no ícone 🗑️

---

## 💾 Gerenciamento de Dados

### Fazer Backup:

1. Vá em **Dados** no menu
2. Clique em **"Exportar Backup"**
3. Arquivo JSON será baixado
4. Guarde em local seguro

**Quando fazer backup:**
- ✅ Toda sexta-feira
- ✅ Antes de limpar dados
- ✅ Antes de importar outro backup
- ✅ Após muitas alterações

### Restaurar Backup:

1. Vá em **Dados** no menu
2. Clique em **"Importar Backup"**
3. Selecione arquivo JSON do backup
4. Confirme importação
5. Dados atuais serão substituídos

### Limpar Todos os Dados:

⚠️ **CUIDADO**: Remove tudo permanentemente!

1. Vá em **Dados** no menu
2. Clique em **"Limpar Todos os Dados"**
3. Confirme a ação
4. Sistema volta ao estado inicial

**Use quando:**
- Quiser começar do zero
- Mudar de oficina
- Dados de teste/demonstração

---

## 💡 Dicas e Truques

### Produtividade:

1. **Atalhos Mentais**:
   - Dashboard toda manhã
   - Ordens abertas ao longo do dia
   - Backup toda sexta

2. **Fluxo de Atendimento**:
   ```
   Cliente chega → Buscar/Cadastrar →
   Selecionar moto → Criar ordem →
   Fazer serviço → Marcar pronto →
   Cliente busca → Marcar entregue
   ```

3. **Organização**:
   - Use categorias consistentes no estoque
   - Atualize status das ordens imediatamente
   - Mantenha dados de clientes atualizados

### Busca Eficiente:

- **Por telefone**: Digite apenas números
- **Por placa**: Digite 3-4 letras/números
- **Por nome**: Digite parte do nome

### Estoque:

- Configure estoque mínimo realista
- Reabasteça quando aparecer alerta
- Use categorias padronizadas:
  - Lubrificantes
  - Filtros
  - Elétrica
  - Transmissão
  - Freios
  - Pneus

---

## ⚠️ Avisos Importantes

### Sobre os Dados:

- ✅ Salvos automaticamente
- ✅ Persistem no navegador
- ❌ NÃO sincronizam entre dispositivos
- ❌ Perdidos se limpar dados do navegador

### Boas Práticas:

1. **Faça backup semanal**
2. **Não use em navegador anônimo**
3. **Não limpe cache sem backup**
4. **Use sempre o mesmo navegador**
5. **Mantenha histórico organizado**

### Limitações:

- Dados apenas locais (navegador)
- Sem sincronização automática
- Um usuário por navegador
- Sem autenticação/login

---

## 🆘 Problemas Comuns

### "Meus dados sumiram!"
- Você limpou cache do navegador?
- Está usando o mesmo navegador?
- Restaure do backup se tiver

### "Não consigo criar ordem"
- Tem cliente cadastrado?
- Cliente tem moto cadastrada?
- Todos campos estão preenchidos?

### "Dashboard mostra zero"
- Verifique se há ordens de hoje
- Status "Entregue" conta no faturamento
- Pode ser início do dia

### "Estoque não alerta"
- Verifique o estoque mínimo configurado
- Quantidade está abaixo do mínimo?
- Veja na página Dashboard os alertas

---

## 📱 Usando no Celular

O sistema funciona em celulares!

### Dicas Mobile:
- Rotacione para paisagem em formulários
- Menu ☰ para economizar espaço
- Toque longo para ver opções
- Use campos de busca

---

## 🎓 Treinamento Rápido

### Dia 1: Conhecer o Sistema
- Explorar todas as páginas
- Ver dados de exemplo
- Entender fluxo

### Dia 2: Praticar
- Cadastrar cliente teste
- Cadastrar moto teste
- Criar ordem de teste

### Dia 3: Uso Real
- Limpar dados de teste
- Começar com clientes reais
- Fazer primeiro backup

### Semana 1: Dominar
- Criar ordens rapidamente
- Gerenciar estoque
- Acompanhar métricas

---

## ✅ Checklist Diário

**Manhã:**
- [ ] Abrir Dashboard
- [ ] Ver ordens em aberto
- [ ] Conferir alertas de estoque

**Durante o Dia:**
- [ ] Criar ordens conforme atendimentos
- [ ] Atualizar status das ordens
- [ ] Ajustar estoque quando usar peças

**Fim do Dia:**
- [ ] Marcar ordens entregues
- [ ] Conferir faturamento
- [ ] Planejar dia seguinte

**Sexta-feira:**
- [ ] Fazer backup semanal
- [ ] Revisar estoque
- [ ] Conferir ordens pendentes

---

## 🎉 Pronto para Usar!

Você já sabe tudo que precisa para usar o sistema!

**Lembre-se:**
- Comece devagar
- Faça backups
- Mantenha organizado
- Use no dia a dia

**Em caso de dúvidas:**
- Releia este manual
- Consulte o README.md
- Pratique com dados de teste

---

**Boa sorte e boas vendas! 🏍️💚**

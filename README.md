# 🏍️ Sistema de Gerenciamento para Oficina de Motos

Sistema completo e moderno para gerenciamento de oficinas de motos, desenvolvido com React, TypeScript e Tailwind CSS.

## 🎨 Design

- Layout moderno com sidebar lateral fixa
- Tema escuro nas cores: **preto, cinza e verde (#9ACD32)**
- Interface limpa e profissional
- Totalmente responsivo (funciona em desktop e mobile)

## ✨ Funcionalidades

### 📊 Dashboard
- Faturamento do dia
- Quantidade de serviços realizados
- Ordens em aberto
- Alertas de estoque baixo

### 👥 Clientes
- Cadastro de clientes (nome e telefone)
- Busca por nome ou telefone
- Histórico de serviços por cliente
- Visualização de motos cadastradas

### 🏍️ Motos
- Cadastro de motos vinculadas aos clientes
- Informações: modelo, placa e ano
- Busca por modelo ou placa

### 📝 Ordens de Serviço
- Criação rápida de ordens (menos de 10 segundos)
- Status: Em Andamento, Pronto, Entregue
- Filtros por status
- Edição e exclusão de ordens
- Registro de valor e data

### 📦 Estoque
- Cadastro de peças com quantidade e categoria
- Alertas automáticos de estoque baixo
- Ajuste rápido de quantidade (+1/-1)
- Categorização de peças

### 💾 Gerenciamento de Dados
- **Exportar Backup**: Salva todos os dados em arquivo JSON
- **Importar Backup**: Restaura dados de um arquivo
- **Limpar Dados**: Remove todos os dados do sistema

## 🚀 Como Usar

### Armazenamento
Os dados são salvos automaticamente no **localStorage** do navegador. Isso significa que:
- ✅ Os dados persistem entre sessões
- ✅ Não precisa de internet para funcionar
- ⚠️ Os dados são específicos do navegador usado
- ⚠️ Limpar dados do navegador apaga os dados do sistema

### Backup Recomendado
1. Acesse a página "Dados" no menu lateral
2. Clique em "Exportar Backup"
3. Salve o arquivo JSON em local seguro
4. Faça backups semanalmente

### Restaurar Dados
1. Acesse a página "Dados"
2. Clique em "Importar Backup"
3. Selecione o arquivo JSON do backup
4. Confirme a importação

## 📱 Recursos

- ⚡ Criação de ordens em menos de 10 segundos
- 🔍 Busca rápida de clientes e motos
- 📊 Dashboard com métricas em tempo real
- 🎯 Interface focada em produtividade
- 💾 Sistema de backup/restore integrado
- 📱 Responsivo para uso em celular

## 🛠️ Tecnologias

- **React 18** - Framework principal
- **TypeScript** - Tipagem estática
- **Tailwind CSS v4** - Estilização
- **Radix UI** - Componentes acessíveis
- **Lucide React** - Ícones
- **Vite** - Build tool

## 📦 Estrutura de Dados

### Cliente
```typescript
{
  id: string
  name: string
  phone: string
  createdAt: string
}
```

### Moto
```typescript
{
  id: string
  clientId: string
  model: string
  plate: string
  year?: string
}
```

### Ordem de Serviço
```typescript
{
  id: string
  clientId: string
  motorcycleId: string
  service: string
  value: number
  date: string
  status: 'in_progress' | 'ready' | 'delivered'
}
```

### Item de Estoque
```typescript
{
  id: string
  name: string
  quantity: number
  category: string
  minQuantity: number
}
```

## 🎯 Fluxo de Trabalho Recomendado

1. **Cadastrar Cliente** (se novo)
2. **Cadastrar Moto** do cliente
3. **Criar Ordem de Serviço** vinculando cliente e moto
4. Atualizar status da ordem conforme andamento
5. Marcar como "Entregue" quando concluído
6. **Fazer backup** regularmente

## ⚠️ Avisos Importantes

- Sempre faça backup antes de limpar dados
- Os dados são armazenados apenas no navegador
- Não compartilhe backups com dados sensíveis
- Use senhas fortes se implementar autenticação

## 🔮 Possíveis Melhorias Futuras

- Integração com banco de dados (Supabase)
- Sistema de autenticação
- Impressão de ordens de serviço
- Relatórios financeiros detalhados
- Gráficos de desempenho
- Notificações por SMS/WhatsApp
- Sistema de agendamento

## 📄 Licença

Projeto desenvolvido para uso em oficinas de motos.

---

**Desenvolvido com ❤️ para facilitar o dia a dia das oficinas de motos**

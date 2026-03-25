Crie um sistema completo de gerenciamento para uma oficina de motos, baseado em um sistema já existente com layout moderno, sidebar lateral escura e tema nas cores preto, cinza e verde (#9ACD32).

O sistema deve ser simples, rápido e funcional para uso diário em uma oficina real, substituindo caderno e anotações manuais.

IMPORTANTE:
O sistema deve ser totalmente funcional, com frontend + backend + banco de dados integrado.

---

🎯 OBJETIVO DO SISTEMA:
Permitir que o dono da oficina controle:
- clientes
- motos
- ordens de serviço
- estoque
- faturamento

Tudo de forma rápida, simples e confiável.

---

🎨 DESIGN:
- Layout moderno com sidebar lateral fixa
- Cores principais: preto, cinza e verde (#9ACD32)
- Interface limpa, profissional e fácil de usar
- Botões grandes e claros (pensado para uso rápido)
- Responsivo (funcionar no celular também)

---

📦 FUNCIONALIDADES PRINCIPAIS:

1) DASHBOARD
- Mostrar:
  - faturamento do dia
  - quantidade de serviços realizados
  - ordens em aberto
  - alertas de estoque baixo

---

2) CLIENTES
- Cadastro de cliente com:
  - nome
  - telefone
- Cada cliente pode ter várias motos
- Listagem de clientes
- Histórico de serviços por cliente

---

3) MOTOS
- Cada cliente pode cadastrar motos com:
  - modelo
  - placa
  - ano (opcional)

---

4) ORDENS DE SERVIÇO (FUNÇÃO PRINCIPAL DO SISTEMA)
- Criar ordem rapidamente com:
  - cliente (selecionar ou cadastrar na hora)
  - moto
  - serviço realizado
  - valor
  - data
  - status:
    - em andamento
    - pronto
    - entregue

- Permitir:
  - editar ordem
  - excluir ordem
  - marcar como concluída
  - listar todas as ordens
  - filtrar por status

---

5) ESTOQUE
- Cadastro de peças com:
  - nome
  - quantidade
  - categoria
- Atualizar quantidade
- Excluir peças
- Alerta automático quando estoque estiver baixo

---

6) INTEGRAÇÃO ENTRE SISTEMAS
- Uma ordem pode usar peças do estoque
- Ao usar uma peça, diminuir automaticamente a quantidade

---

7) BANCO DE DADOS
- Estrutura completa com tabelas:
  - clients
  - motorcycles
  - service_orders
  - inventory

- Relacionamentos:
  - cliente → motos
  - cliente → ordens
  - ordem → peças utilizadas

---

8) TECNOLOGIA
- Frontend moderno (React ou similar)
- Backend com API (Node.js, Supabase ou equivalente)
- Banco de dados relacional
- Código organizado e escalável

---

9) EXPERIÊNCIA DO USUÁRIO
- Criar ordem em menos de 10 segundos
- Navegação rápida
- Sem telas confusas
- Foco em produtividade

---

10) EXTRAS (SE POSSÍVEL)
- busca por cliente
- busca por placa
- resumo financeiro
- interface bonita e profissional

---

RESULTADO ESPERADO:
Um sistema completo, pronto para uso em uma oficina real, com aparência de software profissional pago, totalmente funcional e sem depender de ajustes manuais complexos.
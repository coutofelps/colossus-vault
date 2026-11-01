# Spec: Área Logada do Comprador

## Objetivo

Define as telas, fluxos e regras de negócio da área logada para compradores no Colossus Vault.

---

## Visão Geral

A área logada é o espaço privado do comprador. Ela centraliza seus lances em andamento, loja pessoal e dados de conta. O acesso é exclusivo para usuários com sessão ativa — qualquer rota da área redireciona para `/login` se não houver sessão.

Objetivos da área logada:

- Dar ao comprador visibilidade sobre sua participação ativa nos leilões
- Registrar o histórico de vitórias e facilitar o contato com o admin para pagamento
- Permitir gerenciamento básico de dados de conta
- Oferecer ponto de entrada para anunciar itens como vendedor

---

## Rotas e Navegação

| Rota | Página |
|---|---|
| `/dashboard` | Dashboard: lances ativos e minha loja |
| `/bids` | Meus Lances — a implementar |
| `/payments` | Meus Pagamentos |
| `/account` | Dados da Conta |

A Navbar exibe o nome do usuário logado como chip-link para `/dashboard` no desktop, com links diretos para "Área do Comprador" e "Pagamentos". No mobile, o menu expandido lista todas as rotas da área logada e a opção "Sair". Não há dropdown.

---

## Dashboard (`/dashboard`)

Página inicial da área logada. Exibe botão **Sair** (redireciona para `/`) e link **Minha Conta →** no header.

### Seção: Leilões

Lista os leilões em que o usuário já deu pelo menos um lance e que ainda estão `ATIVO`. Exibe até 6 cards. Link "Ver todos" aparece quando há 6 ou mais itens, apontando para `/bids`.

Cada card exibe: thumbnail, título, **seu lance**, **lance atual**, status (**Na liderança** / **Superado**), countdown compacto e link para a página do leilão.

- Card **Superado**: borda vermelha com glow pulsante animado.
- Card **Na liderança**: borda verde com glow pulsante animado.
- Lance proxy ativo é indicado com badge "Proxy" ao lado do status.

Estado vazio quando não há lances ativos: mensagem + link para explorar leilões.

### Seção: Minha Loja

Reservada para itens que o comprador colocou à venda como vendedor. Exibe botão **Anunciar** inline ao título, que redireciona para `/under-development` (a implementar). Estado vazio enquanto não há itens cadastrados.

---

## Meus Lances (`/bids`) — a implementar

Lista todos os lances dados pelo usuário, dividida em duas abas: **Ativos** e **Encerrados**.

### Aba Ativos

Mesmos cards do Dashboard, com link "Ver todos" apontando aqui.

### Aba Encerrados

| Campo exibido | Detalhe |
|---|---|
| Thumbnail | Imagem do lote |
| Título | Link para `/auctions/:id` |
| Seu maior lance | Valor máximo enviado |
| Resultado | **Vencedor** ou **Não venceu** |
| Data de encerramento | Formato dd/mm/aaaa |

---

## Meus Pagamentos (`/payments`)

Lista os leilões vencidos pelo usuário com o status e os detalhes do pagamento acordado com o admin. Os dados são preenchidos manualmente pelo admin após o encerramento do leilão.

Cada card exibe:

| Campo | Detalhe |
|---|---|
| Thumbnail do item | 80×80px, link para `/auctions/:id` |
| Título do leilão | Link para `/auctions/:id` |
| Vendedor | Nome do vendedor |
| Data da compra | Data de encerramento do leilão |
| Valor total | Lance vencedor |
| Meio de pagamento | Ex.: PIX, boleto, cartão — preenchido pelo admin |
| Parcelas | Número de parcelas acordado (1 = à vista) |
| Parcelas pagas | Quantidade já quitada |
| Próximo pagamento | Data da próxima parcela |
| Status geral | **Aguardando contato**, **Em andamento** ou **Concluído** |

Barra de progresso de parcelas quando `installments > 1`.

### Status Geral

- **Aguardando contato** — padrão logo após o encerramento; o admin ainda não abriu o acordo
- **Em andamento** — acordo iniciado; parcelas sendo pagas
- **Concluído** — todas as parcelas quitadas

O comprador vê os dados mas não pode alterá-los. Todos os campos são preenchidos e atualizados exclusivamente pelo admin.

Estado vazio quando não há pagamentos.

Header da página: eyebrow "Área do comprador" + link "Minha Conta →" + h1 "PAGAMENTOS".

---

## Dados da Conta (`/account`)

Permite ao usuário visualizar e editar suas informações de perfil.

Header da página: eyebrow "Área do comprador" + link "← Dashboard" + h1 "Minha Conta".

### Perfil

Exibe avatar com iniciais do nome, nome completo, badge "Verificado" (quando aplicável) e data de ingresso.

### Estatísticas

Linha com três métricas: **Leilões vencidos**, **Lances dados**, **Participando**.

### Campos

| Campo | Editável | Regra |
|---|---|---|
| Nome completo | Sim | Obrigatório; edição inline com botão Editar/Salvar/Cancelar |
| E-mail | Não | Exibido apenas para referência |
| Telefone | Não | Exibido apenas para referência |
| CPF | Não | Exibido mascarado |

### Endereço de entrega

Campos exibidos (somente leitura no MVP): CEP, logradouro + número, complemento, bairro, cidade/estado.

### Alteração de senha

Seção expansível com botão "Alterar". Quando aberta, exibe formulário com:

| Campo | Validação |
|---|---|
| Senha atual | Obrigatório |
| Nova senha | Obrigatório, mínimo 8 caracteres |
| Confirmar nova senha | Deve coincidir com nova senha |

Mensagens de erro exibidas inline. Sucesso exibe feedback positivo e fecha o formulário automaticamente após 2,5s.

### Configurações

Seletor de paleta de cores (tema padrão / tema alternativo).

---

## Autenticação

A sessão é gerenciada pelo **AuthContext** e persistida em `localStorage` (`cv_auth_user`). O estado de autenticação é lido por todos os componentes via `useAuth()`.

> **Pendente:** guarda de rota não implementada. Acessar `/dashboard`, `/payments` ou `/account` diretamente pela URL funciona mesmo sem sessão ativa. Quando o backend existir, adicionar um `<PrivateRoute>` que redireciona para `/login`.

---

## Critérios de Aceite

- [ ] Rotas da área logada redirecionam para `/login` quando não há sessão ativa *(pendente: guarda de rota)*
- [ ] Navbar exibe chip com nome do usuário, clicável, levando a `/dashboard`
- [ ] Dashboard exibe seções "Leilões" e "Minha Loja"
- [ ] Card "Superado" tem borda vermelha com glow pulsante
- [ ] Card "Na liderança" tem borda verde com glow pulsante
- [ ] Lance proxy ativo é indicado com badge "Proxy" no card
- [ ] Link "Ver todos" aparece em Leilões quando há 6 ou mais itens
- [ ] Botão "Sair" no Dashboard redireciona para `/`
- [ ] Meus Pagamentos exibe status, parcelas e dados do acordo
- [ ] Data da compra exibida em cada card de pagamento
- [ ] Dados da Conta permite alterar nome com validação inline
- [ ] Alteração de senha valida campos e exibe feedback de sucesso
- [ ] Seletor de tema funciona em Configurações

---

## Casos de Borda

| Situação | Comportamento esperado |
|---|---|
| Usuário sem lances ativos | Dashboard exibe estado vazio em "Leilões" com chamada para explorar leilões |
| Usuário sem leilões vencidos | "Meus Pagamentos" exibe estado vazio |
| Nome vazio ao salvar | Exibe erro "Nome é obrigatório." |
| Senhas não coincidem | Exibe erro "As senhas não coincidem." |
| Sessão expirada durante navegação | Redirect para `/login` |

---

## Fora do Escopo desta Spec

- Fluxo de pagamento (tratado externamente via WhatsApp com o admin)
- Área do vendedor / criação de leilão (spec separada)
- Painel do admin
- Notificações (push, e-mail ou in-app)
- Edição de endereço de entrega (MVP)
- Upload de foto de perfil (MVP)

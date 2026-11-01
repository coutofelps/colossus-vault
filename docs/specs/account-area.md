# Spec: Área Logada do Comprador

## Objetivo

Define as telas, fluxos e regras de negócio da área logada para compradores no Colossus Vault.

---

## Visão Geral

A área logada é o espaço privado do comprador dentro do Colossus Vault. Ela centraliza tudo que é pessoal ao usuário: seus lances em andamento, leilões que está acompanhando, vitórias e dados de conta. O acesso é exclusivo para usuários com sessão ativa — qualquer rota da área redireciona para `/login` se não houver sessão.

Objetivos da área logada:

- Dar ao comprador visibilidade sobre sua participação ativa nos leilões
- Registrar o histórico de vitórias e facilitar o contato com o admin para pagamento
- Permitir gerenciamento básico de dados de conta

---

## Rotas e Navegação

Todas as rotas da área logada ficam sob o prefixo `/account`.

| Rota | Página |
|---|---|
| `/account` | Dashboard: lances ativos e leilões acompanhados |
| `/account/bids` | Meus Lances |
| `/account/watchlist` | Leilões Acompanhados |
| `/account/payments` | Meus Pagamentos |
| `/account/profile` | Dados da Conta |

A navegação entre as sub-páginas usa um menu lateral no desktop e um menu em abas no mobile. A Navbar do site exibe o nome do usuário logado no lugar do botão "Entrar", com um dropdown que dá acesso à área e ao logout.

---

## Dashboard

A rota `/account` é a página inicial da área logada. Em vez de redirecionar, exibe uma visão combinada e resumida das duas listas de maior interesse imediato do usuário.

### Seção: Participando

Lista os leilões em que o usuário já deu pelo menos um lance e que ainda estão `ATIVO`. Exibe até 6 cards. Link "Ver todos" aponta para `/account/bids`.

Cada card exibe: thumbnail, título, **seu lance**, **lance atual**, status (**Na liderança** / **Superado**) e countdown compacto.

Card com status **Superado** recebe destaque visual (borda em vermelho ou badge).

### Seção: Acompanhando

Lista os leilões salvos pelo usuário em que ele ainda não deu lance. Exibe até 6 cards. Link "Ver todos" aponta para `/account/watchlist`.

Cada card exibe: thumbnail, título, lance atual, countdown compacto e botão "Dar Lance" inline.

> Se o usuário não tem lances nem leilões acompanhados, a página exibe um estado vazio com chamada para explorar leilões.

---

## Meus Lances

Lista todos os lances dados pelo usuário, dividida em duas abas: **Ativos** e **Encerrados**.

### Aba Ativos

Exibe os leilões em que o usuário tem pelo menos um lance e que ainda estão com status `ATIVO`.

| Campo exibido | Detalhe |
|---|---|
| Imagem do lote | Thumbnail do item |
| Título do leilão | Link para `/auctions/:id` |
| Seu lance | Valor do maior lance do usuário |
| Lance atual | Maior lance global do leilão |
| Status | **Na liderança** ou **Superado** |
| Tempo restante | Countdown compacto |

- Se o usuário estiver **superado**, o card é destacado visualmente (borda vermelha / label em destaque) para incentivar um novo lance.
- Lance proxy ativo é indicado com um ícone ou label próprio.

### Aba Encerrados

Exibe leilões encerrados em que o usuário participou, independentemente de ter vencido.

| Campo exibido | Detalhe |
|---|---|
| Imagem do lote | Thumbnail |
| Título | Link para `/auctions/:id` |
| Seu maior lance | Valor máximo enviado |
| Resultado | **Vencedor** ou **Não venceu** |
| Data de encerramento | Formato dd/mm/aa |

---

## Leilões Acompanhados

O usuário pode salvar leilões de interesse sem precisar dar um lance. A ação de acompanhar é acionada por um botão na página do leilão (ex.: ícone de marcação / "Acompanhar").

Esta página exibe o mesmo card compacto de leilão da listagem pública, acrescido de:

- Botão **Parar de acompanhar** em cada card
- Indicação de leilões já encerrados (opacidade reduzida + label "Encerrado")

Leilões encerrados permanecem na lista por **30 dias** e depois são removidos automaticamente.

> Acompanhar não gera notificação por padrão nesta versão. Notificações são tratadas na seção própria.

---

## Meus Pagamentos

Lista os leilões vencidos pelo usuário com o status e os detalhes do pagamento acordado com o admin. Como o pagamento ocorre fora da plataforma, os dados são preenchidos manualmente pelo admin após o encerramento do leilão.

Cada entrada na lista exibe um card expandido com:

| Campo | Detalhe |
|---|---|
| Imagens do item | Galeria das fotos do lote (as mesmas do leilão) |
| Título do leilão | Link para `/auctions/:id` |
| Vendedor | Nome do vendedor verificado |
| Valor total | Lance vencedor |
| Meio de pagamento | Ex.: PIX, boleto, cartão — preenchido pelo admin |
| Parcelas | Número de parcelas acordado (1 = à vista) |
| Parcelas pagas | Quantidade já quitada |
| Valor por parcela | Calculado sobre o total |
| Próximo pagamento | Data da próxima parcela (chip de data) |
| Status geral | **Aguardando contato**, **Em andamento** ou **Concluído** |

### Status Geral

- **Aguardando contato** — padrão logo após o encerramento; o admin ainda não abriu o acordo
- **Em andamento** — acordo iniciado; parcelas sendo pagas
- **Concluído** — todas as parcelas quitadas

O comprador vê os dados mas não pode alterá-los. Todos os campos são preenchidos e atualizados exclusivamente pelo admin.

---

## Dados da Conta

Permite ao usuário visualizar e editar suas informações básicas de perfil.

| Campo | Editável | Regra |
|---|---|---|
| Nome | Sim | Obrigatório |
| E-mail | Não | Exibido apenas para referência; alteração exige fluxo próprio |
| Senha | Sim | Fluxo separado: pede senha atual + nova senha + confirmação |
| Foto de perfil | Não (MVP) | Reservado para versão futura |

### Exclusão de conta

Não disponível via interface do usuário nesta versão. Solicitações de exclusão devem ser feitas ao admin.

---

## Notificações

Nesta versão, notificações são exibidas **apenas in-app** (sem push ou e-mail). Um ícone de sino na Navbar indica notificações não lidas com um badge numérico.

| Evento | Notificação gerada |
|---|---|
| Usuário é superado em um lance | "Você foi superado em [Título]" |
| Lance proxy esgotado | "Seu lance proxy atingiu o limite em [Título]" |
| Leilão acompanhado encerra em 1h | "[Título] encerra em 1 hora" |
| Usuário vence um leilão | "Você venceu [Título]! O admin entrará em contato." |
| Admin atualiza status de pagamento | "Pagamento de [Título] atualizado para [status]" |

Clicando em uma notificação, o usuário é redirecionado para a tela relevante. Notificações são marcadas como lidas ao clicar ou ao abrir a lista.

---

## Critérios de Aceite

- [ ] Rotas da área logada redirecionam para `/login` quando não há sessão ativa
- [ ] Navbar exibe nome do usuário logado com dropdown para área e logout
- [ ] Dashboard exibe seções "Participando" e "Acompanhando" com até 6 cards cada
- [ ] Card "Superado" no Dashboard tem destaque visual diferenciado
- [ ] Meus Lances exibe corretamente cards com status "Na liderança" e "Superado"
- [ ] Card "Superado" tem destaque visual diferenciado
- [ ] Lance proxy ativo é indicado no card
- [ ] Leilões Acompanhados permitem remover item da lista
- [ ] Leilões encerrados em Acompanhados são removidos após 30 dias
- [ ] Meus Pagamentos exibe status, parcelas e dados do acordo preenchidos pelo admin
- [ ] Próximo pagamento exibe chip de data correto
- [ ] Admin atualiza status de pagamento sem que o comprador possa alterar
- [ ] Dados da Conta permitem alterar nome e senha com validação
- [ ] Notificações não lidas exibem badge numérico no sino da Navbar
- [ ] Clicar em notificação redireciona para a tela correta e marca como lida

---

## Casos de Borda

| Situação | Comportamento esperado |
|---|---|
| Usuário sem lances | "Meus Lances" exibe estado vazio com chamada para explorar leilões |
| Usuário sem leilões acompanhados | "Acompanhando" exibe estado vazio com chamada para explorar |
| Sessão expirada durante navegação | Redirect para `/login` com mensagem "Sua sessão expirou" |
| Usuário sem leilões vencidos | "Meus Pagamentos" exibe estado vazio |
| Admin atualiza status enquanto usuário está na página | Status atualiza sem recarregar (WebSocket ou polling) |

---

## Fora do Escopo desta Spec

- Fluxo de pagamento (tratado externamente via WhatsApp com o admin)
- Área do vendedor (spec separada)
- Painel do admin
- Notificações push / e-mail

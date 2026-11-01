# Spec: Loja da Galera (`/store`)

## Objetivo

Exibir todos os itens disponíveis para venda direta cadastrados pelos usuários da plataforma. Complementa os leilões de `/auctions` — enquanto lá o preço é definido pelo mercado, aqui o vendedor define o preço fixo.

---

## Rota

| Rota | Página |
|---|---|
| `/store` | Listagem de itens à venda |
| `/store/:id` | Detalhe do item |

A Navbar já lista "Loja da Galera" como link direto para `/store`.

---

## Listagem (`/store`)

### Layout

Grid de StoreCards. Header com eyebrow "Marketplace" e h1 "LOJA DA GALERA".

Apenas itens com status **Publicado** (aprovados pelo admin) aparecem na listagem pública. Itens em revisão ou rejeitados não aparecem.

### StoreCard

| Elemento | Detalhe |
|---|---|
| Imagem | Foto principal do item |
| Marca e escala | Ex.: "Hot Toys · 1:6" |
| Título | Nome do item (negrito, uppercase) |
| Vendedor | "por [nome]" |
| Condição | Badge: Novo lacrado, Novo aberto, Usado excelente, Usado bom |
| Preço | Valor em BRL em destaque |
| Frete | Indicação resumida: "Frete incluso", "Frete a combinar" ou "PAC/SEDEX" |

Clicar no card leva para `/store/:id`.

### Filtros e Ordenação — a implementar

- Filtro por condição
- Filtro por marca / escala
- Ordenação: mais recentes, menor preço, maior preço

---

## Detalhe do Item (`/store/:id`)

### Layout

Página com Navbar e Footer. Conteúdo dividido em duas colunas no desktop (galeria de fotos à esquerda, informações à direita) e coluna única no mobile.

### Galeria de Fotos

Foto principal com miniaturas clicáveis abaixo. Mínimo 1, máximo 8 fotos.

### Informações

| Campo | Detalhe |
|---|---|
| Título | Nome do item |
| Vendedor | Nome com link para perfil público (a implementar) |
| Condição | Badge de condição |
| Marca / Linha / Série | Conforme cadastrado |
| Escala | Ex.: 1:6 |
| Descrição | Texto livre do vendedor |
| Preço | Valor em BRL em destaque |
| Frete | Modalidade e detalhes |
| Localização | Cidade e estado do item |

### Ação de Compra

Botão **Entrar em contato** — no MVP, abre um link de WhatsApp ou e-mail para o vendedor. A transação é conduzida fora da plataforma até o módulo de pagamento ser implementado.

> **Pendente:** integração com fluxo de pagamento nativo (fase posterior).

---

## Estados de Item

| Status | Visível em `/store` | Visível em `/store/:id` |
|---|---|---|
| Em revisão | Não | Não (404) |
| Publicado | Sim | Sim |
| Vendido | Não | Sim (com badge "Vendido") |
| Rejeitado | Não | Não (404) |

---

## Critérios de Aceite

- [ ] `/store` exibe grid com todos os itens publicados
- [ ] Card exibe foto, título, vendedor, condição, preço e frete
- [ ] Clicar no card navega para `/store/:id`
- [ ] Página de detalhe exibe galeria, informações completas e botão de contato
- [ ] Itens em revisão ou rejeitados retornam 404 em `/store/:id`
- [ ] Item vendido exibe badge "Vendido" e desabilita o botão de contato

---

## Casos de Borda

| Situação | Comportamento esperado |
|---|---|
| Nenhum item publicado | Estado vazio com chamada para explorar leilões |
| Imagem indisponível | Placeholder com fundo `--abyss` |
| ID inválido em `/store/:id` | Página 404 |

---

## Fora do Escopo desta Spec

- Pagamento nativo (fase posterior)
- Perfil público do vendedor
- Sistema de avaliações
- Filtros e ordenação (próximos passos)
- Painel do admin para aprovação de itens (spec separada)

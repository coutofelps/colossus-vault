# Spec: Listagem de Leilões (`/auctions`)

## Objetivo

Exibir todos os leilões disponíveis na plataforma, separados por estado (ativos e encerrados), para que o comprador encontre oportunidades de lance.

---

## Layout

Página com estrutura PageLayout (Navbar + conteúdo + Footer). Header com eyebrow "Leilões" e h1 "LEILÕES".

O conteúdo é dividido em duas seções:

### Seção: Leilões Ativos

Grid de AuctionCards para leilões com status `ATIVO`. Exibidos em primeiro lugar, ordenados por proximidade do encerramento (mais próximo primeiro — a implementar).

### Seção: Outros

Grid de AuctionCards para leilões com qualquer outro status (`ENCERRADO`, `AGUARDANDO`, etc.).

---

## AuctionCard

Cada card representa um lote em leilão.

| Elemento | Detalhe |
|---|---|
| Imagem | Thumbnail do item com badge de status sobreposta (canto superior esquerdo) |
| Badge de status | `ATIVO`, `ENCERRADO`, etc. — usa o componente Badge |
| Marca e escala | Ex.: "Marvel Legends · 1:10" |
| Título | Nome do item (negrito, uppercase) |
| Vendedor | "por [nome]" |
| Lance atual | "Lance atual" + valor em BRL |
| Contagem de lances | "N lances" |
| Countdown / encerrado | Para leilões ativos: componente Countdown compacto. Para encerrados: label "Encerrado" |
| Botão de ação | `DAR LANCE` para ativos (fundo amarelo `#FFD600`, texto escuro) / `VER DETALHES` para encerrados |

Clicar no card ou no botão leva para `/auctions/:id`.

---

## Filtros e Ordenação — a implementar

- Filtro por categoria (escala, marca, linha)
- Filtro por status
- Ordenação: encerra mais cedo, mais recentes, menor lance

---

## Critérios de Aceite

- [ ] Grid exibe todos os leilões com status `ATIVO` na seção "Leilões Ativos"
- [ ] Demais leilões aparecem em "Outros"
- [ ] Cada card exibe thumbnail, marca/escala, título, vendedor, lance atual, contagem de lances e countdown ou label de encerrado
- [ ] Botão `DAR LANCE` aparece apenas para leilões ativos
- [ ] Clicar em qualquer parte do card ou no botão leva para a página do leilão

---

## Casos de Borda

| Situação | Comportamento esperado |
|---|---|
| Nenhum leilão ativo | Seção "Leilões Ativos" exibe mensagem de estado vazio |
| Nenhum leilão encerrado | Seção "Outros" não é exibida |
| Imagem indisponível | Placeholder com fundo `--abyss` |

---

## Fora do Escopo desta Spec

- Paginação (MVP usa lista completa em memória)
- Busca por texto livre
- Filtros e ordenação (listados como próximos passos)

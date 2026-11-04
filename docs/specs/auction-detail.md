# Spec: Página do Leilão (`/auctions/:id`)

## Objetivo

Exibir todas as informações de um lote em leilão e permitir que compradores autenticados deem lances.

---

## Layout

Página com Navbar e Footer. Conteúdo em duas zonas:

1. **Zona principal** — duas colunas: galeria de fotos (esquerda) e painel de informações (direita)
2. **Zona abaixo** — largura total: descrição do lote e histórico de lances

---

## Zona Principal

### Galeria de fotos

- Foto principal com navegação por setas (← →) e auto-slide a cada 5s
- Miniaturas clicáveis abaixo da foto principal
- Contador de fotos (ex.: "1 / 32")
- Tecla `F` abre tela cheia; setas do teclado navegam entre fotos

### Painel de informações

Exibido da seguinte forma, de cima para baixo:

| Elemento | Detalhe |
|---|---|
| Badges | Badge de status (`ATIVO`, `ENCERRADO`, etc.) + badge `Anti-snipe Xmin` quando ativo |
| Linha de meta | `MARCA · ESCALA · por VENDEDOR` em uma única linha |
| Título | Nome do item — Barlow Condensed, uppercase, `--scar` |
| Bid box | Caixa com lance atual, contagem, countdown e botão DAR LANCE |

### Bid box

| Elemento | Condição |
|---|---|
| "Lance atual" + valor | Sempre |
| Contagem de lances | Sempre |
| "Lance mínimo definido" | Quando `increment > 0` e leilão ativo |
| Countdown "Encerra em" | Apenas quando status `ATIVO` |
| "Aguardando aprovação" / "Leilão encerrado" | Quando status não é `ATIVO` |
| Botão **DAR LANCE** | Ativo apenas quando leilão está `ATIVO`; abre o Modal de Lance |
| Botão **Ver resultado** | Quando leilão encerrado (desabilitado no MVP) |

O bid box não contém o toggle de Lance Proxy — este fica exclusivamente dentro do Modal de Lance.

---

## Modal de Lance

Aberto ao clicar em **DAR LANCE**. Overlay com card centralizado.

### Estrutura

| Elemento | Detalhe |
|---|---|
| Cabeçalho | Thumbnail do item (60×60px) + título + "Fechar ×" |
| Lance atual | Label "Lance atual" + valor em destaque |
| Lance mínimo | Label "Lance mínimo" + valor calculado (`currentBid + increment`) |
| Campo de valor | Input numérico em BRL; valor inicial pré-preenchido com o lance mínimo |
| Toggle Lance Proxy | Checkbox/toggle com label "Lance Proxy"; quando ativado, exibe campo "Seu valor máximo" e hint explicativo |
| Botão **Confirmar lance** | Primário — fundo `--acid`, texto `--abyss`; desabilitado se valor < mínimo |
| Botão **Cancelar** | Outline — fecha o modal sem ação |

### Validação

| Situação | Comportamento |
|---|---|
| Valor abaixo do mínimo | Botão Confirmar desabilitado; mensagem de erro inline |
| Campo vazio | Botão Confirmar desabilitado |
| Lance Proxy sem valor máximo | Botão Confirmar desabilitado |
| Lance Proxy com máximo menor que o mínimo | Mensagem de erro inline no campo de máximo |

### Comportamento

- Abre com animação de entrada (scale 0.95 → 1, opacity 0 → 1)
- Fecha ao clicar no botão "Fechar", em "Cancelar", ou no backdrop
- Fecha com tecla `Escape`
- Foco inicial no campo de valor
- No MVP, o submit simula sucesso: fecha o modal e incrementa o contador de lances localmente

### Lance Proxy no modal

Quando o toggle é ativado:
- Campo "Seu valor máximo" aparece abaixo do toggle
- Hint: "O sistema dará o menor lance necessário para mantê-lo na liderança, até este limite. O valor máximo é oculto dos outros compradores."
- O campo de valor original (lance pontual) é ocultado — o comprador define apenas o máximo

---

## Zona Abaixo

### Descrição do lote

Bloco de texto livre fornecido pelo vendedor. Título "Sobre o lote". Oculto quando não há descrição.

### Histórico de lances

Lista de todos os lances dados, do mais recente ao mais antigo.

| Campo | Detalhe |
|---|---|
| Usuário | Nome do comprador; ícone ♛ no líder atual |
| Data e hora | Formato dd/mm/aa, hh:mm |
| Valor | Lance em BRL; valor do líder em destaque (`--acid`) |

Oculto quando não há lances.

---

## Mobile

- Galeria ocupa 100% da largura
- Layout passa de 2 colunas para coluna única
- Botão DAR LANCE fixo no rodapé da viewport (sticky bar), sobre o Footer
- Modal ocupa 100% da largura, ancorado na parte inferior (bottom sheet)

---

## Critérios de Aceite

- [ ] Galeria exibe foto principal, miniaturas e contador
- [ ] Linha de meta exibe marca, escala e vendedor na mesma linha
- [ ] Bid box exibe lance atual, contagem e countdown para leilões ativos
- [ ] Botão DAR LANCE abre o Modal de Lance
- [ ] Modal exibe thumbnail, título, lance atual, lance mínimo e campo de valor
- [ ] Campo de valor é pré-preenchido com o lance mínimo
- [ ] Botão Confirmar desabilitado quando valor < mínimo
- [ ] Toggle Lance Proxy exibe campo de máximo e oculta o campo de lance pontual
- [ ] Modal fecha com Escape, clique no backdrop ou nos botões Fechar/Cancelar
- [ ] No mobile, botão DAR LANCE fica fixo no rodapé

---

## Casos de Borda

| Situação | Comportamento esperado |
|---|---|
| Leilão sem fotos | Placeholder com fundo `--abyss` na galeria |
| Leilão sem lances | Bid box exibe "—" no lugar do lance atual; histórico oculto |
| Usuário não logado clica em DAR LANCE | Redireciona para `/login` |
| Leilão encerra enquanto o modal está aberto | Modal fecha; página transita para estado `ENCERRADO` |

---

## Fora do Escopo desta Spec

- Integração com backend (MVP usa dados mockados)
- Validação de identidade do vendedor (bloqueio de auto-lance)
- Notificações em tempo real (WebSocket — Fase 2)
- Animação de encerramento (spec separada em `auction-flow.md`)

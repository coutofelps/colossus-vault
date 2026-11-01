# Spec: Home (`/`)

## Objetivo

Página de entrada da plataforma. Apresenta o Colossus Vault para novos visitantes e direciona o tráfego para os leilões ativos.

---

## Layout

Página full-height com Navbar, seção hero centralizada e Footer.

### Hero

| Elemento | Detalhe |
|---|---|
| Eyebrow | Label de categoria acima do título (ex.: "Leilões de Colecionáveis") |
| Título | "Colossus Vault" — Barlow Condensed, peso máximo, uppercase, cor `--scar` |
| Subtítulo | Tagline de uma linha descrevendo a proposta da plataforma |
| CTAs | Dois botões de ação (ver abaixo) |

### CTAs

| Botão | Destino | Estilo |
|---|---|---|
| Ver Leilões | `/auctions` | Primário — fundo `--acid`, texto `--abyss` |
| Brand Identity | `/brand-identity` | Secundário — borda `--acid`, texto `--acid` (outline) |

No mobile (≤ 600px) os botões são empilhados verticalmente com largura igual (`width: 100%`).

---

## Critérios de Aceite

- [ ] Hero exibe eyebrow, título, subtítulo e dois CTAs
- [ ] "Ver Leilões" leva para `/auctions`
- [ ] "Brand Identity" leva para `/brand-identity`
- [ ] No mobile, CTAs ficam em coluna com mesma largura

---

## Casos de Borda

| Situação | Comportamento esperado |
|---|---|
| Usuário já logado | Hero exibe normalmente — não há redirecionamento automático |

---

## Fora do Escopo desta Spec

- Seções de destaque de leilões (próximos passos)
- Depoimentos ou galeria de itens
- Chamada para cadastro de vendedor

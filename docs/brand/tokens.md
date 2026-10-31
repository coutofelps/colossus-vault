# Design Tokens — Colossus Vault

> Espelho das propriedades CSS customizadas definidas em `docs/brand/index.html`.
> Atualize os dois arquivos ao alterar qualquer token.

## Tema

**Dark-first.** Sem variante clara. A estética é premium noturna — poder, raridade, cultura colecionável.
Conceito da paleta: preto abissal, verde imortal, verde ácido, roxo cripta, cinza lápide.

---

## Cores

| Token | Valor | Uso |
|---|---|---|
| `--abyss` | `#080C08` | Fundo principal da página — quase preto com viés verde |
| `--void` | `#101610` | Fundos de card, superfícies elevadas |
| `--crypt` | `#1C0E30` | Roxo cripta — acento de sombra, overlays |
| `--hulk-green` | `#3A8C1C` | Verde médio — fundo de logo, superfícies on-green |
| `--acid` | `#8FD62F` | Verde ácido — cor de ação primária, CTAs, estados ativos |
| `--grave` | `#5A6B52` | Cinza lápide — texto secundário, labels silenciados |
| `--fog` | `#A8B89C` | Névoa — texto terciário, labels de formulário, legendas |
| `--bone` | `#D6DCCE` | Osso — texto de corpo principal sobre fundos escuros |
| `--scar` | `#FFFFE8` | Quase branco — headings, texto de display de alto contraste |
| `--purple-vein` | `#6B3FA0` | Veia roxa — acento, decorativo, base de brilho |
| `--purple-glow` | `#9D5FD6` | Brilho roxo — estados de hover, brilhos radiais |

### Bordas

| Token | Valor | Uso |
|---|---|---|
| `--border` | `rgba(143, 214, 47, 0.15)` | Borda padrão — tom verde sutil |
| `--border-mid` | `rgba(143, 214, 47, 0.35)` | Borda enfatizada — tags, elementos interativos |

---

## Tipografia

| Token | Valor | Uso |
|---|---|---|
| `--font-display` | `'Barlow Condensed', 'Arial Narrow', sans-serif` | Headings hero, stats, wordmark do logo |
| `--font-body` | `'DM Sans', system-ui, sans-serif` | Texto de corpo, labels, elementos de UI |

### Escala Tipográfica (observada no doc de marca)

| Elemento | Tamanho | Peso | Observações |
|---|---|---|---|
| Hero h1 | `clamp(64px, 12vw, 160px)` | 900 | Maiúsculas, `--font-display`, `--scar` |
| Stat hero | `36px` | 800 | `--font-display`, nums tabulares |
| Eyebrow | `11px` | 600 | Maiúsculas, `letter-spacing: 0.18em`, `--acid` |
| Corpo | `16px` | 400 | `line-height: 1.6`, `--bone` |
| Label / legenda | `11px` | 500 | Maiúsculas, `letter-spacing: 0.12em`, `--grave` |
| Pequeno / terciário | `14px` | 300 | `--fog` |

---

## Espaçamento e Layout

| Token | Valor | Uso |
|---|---|---|
| `--max-w` | `1100px` | Largura máxima do container |
| `--gutter` | `max(20px, safe-area-inset)` | Padding horizontal da página |

- Seções usam `padding-block: 80px`
- Seções separadas por `1px solid var(--border)`

---

## Efeitos e Movimento

- **Movimento reduzido:** todas as animações e transições desativadas via `prefers-reduced-motion`
- **Textura de grade no hero:** linhas `rgba(58, 140, 28, 0.04)`, grade de 48px
- **Brilho no hero:** gradiente radial no canto inferior esquerdo, `rgba(107, 63, 160, 0.25)` — roxo
- **Animação pulse:** opacidade 1→0.4, escala 1→0.7, 2s ease-in-out infinito (usado em pontos de status)

---

## Uso do Logo

| Fundo | Cor do texto |
|---|---|
| `--abyss` (on-dark) | Logo padrão |
| `--void` (on-void) | Logo padrão |
| `--hulk-green` (on-green) | Logo escuro (`--abyss`) |
| `--acid` (on-acid) | Logo escuro (`--abyss`) |

---

## Referência Rápida para IA

Ao construir componentes de UI para o Colossus Vault:

- **Fundo da página:** `--abyss`
- **Fundo de card:** `--void`
- **CTA primário:** fundo `--acid`, texto `--abyss`
- **Texto de corpo:** `--bone`
- **Headings:** `--scar`, `--font-display`, maiúsculas
- **Texto secundário:** `--grave` ou `--fog`
- **Bordas:** `--border` padrão, `--border-mid` interativo
- **Acento / hover:** `--purple-glow`
- **Nunca use fundo claro** — este é um tema exclusivamente escuro

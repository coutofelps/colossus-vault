# Spec: Em Desenvolvimento (`/under-development`)

## Objetivo

Página de placeholder para rotas e funcionalidades ainda não implementadas. Informa ao usuário que o recurso está em construção e oferece saídas para continuar navegando.

---

## Modos de Uso

O componente `UnderDevelopment` aceita duas props opcionais que alteram seu comportamento:

| Prop | Tipo | Efeito |
|---|---|---|
| `bare` | boolean | Renderiza apenas o conteúdo interno, sem Navbar nem Footer. Usado para embutir a mensagem dentro de outra página. |
| `title` | string | Substitui o título padrão "Recurso em desenvolvimento" por um texto customizado. |

---

## Layout (modo padrão)

Página com Navbar e Footer. Conteúdo centralizado:

| Elemento | Detalhe |
|---|---|
| Eyebrow | "Em construção" |
| Código WIP | Texto decorativo grande "WIP" (aria-hidden) |
| Título | "Recurso em desenvolvimento" (ou o valor de `title`) |
| Descrição | "Estamos trabalhando nessa parte da plataforma. Em breve estará disponível para você." |
| CTAs | "Ver leilões" → `/auctions` (primário) e "Voltar ao início" → `/` (outline) |

No modo `bare`, eyebrow, código WIP e descrição são exibidos sem título nem CTAs.

---

## Rotas que usam esta página

| Rota | Contexto |
|---|---|
| `/under-development` | Rota direta para funcionalidades sem página própria |
| Botão "Anunciar" no Dashboard | Redireciona para `/under-development` |
| Navbar "Loja da Galera" | Redireciona para `/under-development` |

---

## Critérios de Aceite

- [ ] `/under-development` exibe a página completa com Navbar, Footer, título e CTAs
- [ ] "Ver leilões" leva para `/auctions`
- [ ] "Voltar ao início" leva para `/`
- [ ] Prop `bare` suprime Navbar, Footer, título e CTAs
- [ ] Prop `title` substitui o título padrão

# Spec: Identidade Visual (`/brand-identity`)

## Objetivo

Expõe o documento completo de identidade visual do Colossus Vault como uma rota interna da aplicação, acessível a designers e colaboradores.

---

## Implementação

A rota renderiza um `<iframe>` full-screen que carrega `/brand-identity/index.html` — o documento de identidade visual que vive em `client/public/brand-identity/`. Sem Navbar, sem Footer: a UI da aplicação não interfere na visualização do documento.

---

## Fonte da Verdade

O conteúdo exibido vem de `client/public/brand-identity/index.html`. Alterações de identidade visual devem ser feitas nesse arquivo, não nesta rota.

---

## Critérios de Aceite

- [ ] `/brand-identity` exibe o documento de identidade visual em tela cheia
- [ ] Nenhum elemento da aplicação (Navbar, Footer) fica visível sobre o documento
- [ ] A rota é acessível sem login

---

## Fora do Escopo desta Spec

- Edição ou versionamento do documento de identidade visual
- Controle de acesso (a rota é pública no MVP)

# Spec: Login

## Objetivo

Descrever a tela de autenticação do Colossus Vault — campos, validações, comportamentos e fluxos relacionados.

---

## Visão Geral

A página de login é o ponto de entrada para a área logada. É acessível por qualquer visitante não autenticado. O registro de novos usuários não é feito aqui — contas são criadas pelo admin.

---

## Rota

| Rota | Página |
|---|---|
| `/login` | Login |

---

## Layout

Card centralizado na tela com largura máxima de 440px. Exibe, de cima para baixo:

1. Logo + wordmark "Colossus Vault" (link para `/`)
2. Título "Entrar"
3. Subtítulo descritivo
4. Formulário (e-mail, senha, linha com checkbox "Lembrar-me" + link "Esqueci minha senha", botão de submit)

O logo acompanha a troca de tema do site (ícone verde no tema principal, cinza no tema alternativo).

---

## Formulário

| Campo | Tipo | Obrigatório | Validação |
|---|---|---|---|
| E-mail | `email` | Sim | Formato de e-mail válido |
| Senha | `password` | Sim | Campo não vazio |
| Lembrar-me | `checkbox` | Não | — |

### Comportamento de validação

- A validação é executada no submit, não em tempo real.
- Erros são exibidos inline abaixo de cada campo.
- O campo com erro recebe borda vermelha.
- Ao corrigir e submeter novamente, os erros são limpos.

### Mensagens de erro

| Situação | Mensagem |
|---|---|
| E-mail vazio | "Informe seu e-mail." |
| E-mail com formato inválido | "E-mail inválido." |
| Senha vazia | "Informe sua senha." |

---

### Lembrar-me

Quando marcado, o e-mail digitado é salvo em `localStorage` ao submeter com sucesso. Na próxima visita à página, o campo e-mail é pré-preenchido com o valor salvo e o checkbox aparece marcado. O usuário pode desmarcar a qualquer momento — ao submeter com a opção desmarcada, o valor salvo é apagado.

O checkbox não afeta o tempo de sessão — apenas persiste o e-mail para conveniência.

---

## Autenticação

No MVP, a autenticação é simulada no cliente via **AuthContext**. Qualquer e-mail e senha que passem na validação de formato são aceitos. O submit chama `login(email)`, que persiste a sessão em `localStorage` (`cv_auth_user`) e deriva o nome de exibição do prefixo do e-mail. Quando a API real existir, `login()` será substituída pela chamada ao backend — o restante do fluxo permanece igual.

---

## Links e Ações

| Elemento | Destino |
|---|---|
| Logo / wordmark | `/` |
| "Esqueci minha senha" | `/forgot-password` |
| Botão "Entrar" | Submete o formulário |

Não há link para cadastro — o registro é feito pelo admin.

---

## Critérios de Aceite

- [ ] Página acessível em `/login`
- [ ] Logo troca de ícone ao alternar o tema do site
- [ ] E-mail vazio impede o submit e exibe mensagem de erro
- [ ] E-mail com formato inválido impede o submit e exibe mensagem de erro
- [ ] Senha vazia impede o submit e exibe mensagem de erro
- [ ] Erros exibidos inline abaixo de cada campo com borda vermelha no input
- [ ] Submit sem erros limpa as mensagens, chama `login(email)` no AuthContext e redireciona para `/dashboard`
- [ ] Checkbox "Lembrar-me" salva o e-mail em `localStorage` ao submeter com sucesso
- [ ] Na próxima visita, campo e-mail é pré-preenchido e checkbox aparece marcado
- [ ] Desmarcar e submeter apaga o e-mail salvo
- [ ] Link "Esqueci minha senha" navega para `/forgot-password`
- [ ] Logo navega para `/`

---

## Casos de Borda

| Situação | Comportamento esperado |
|---|---|
| Usuário já autenticado acessa `/login` | Redirect para `/dashboard` |
| Credenciais inválidas (resposta da API) | Exibir mensagem de erro geral abaixo do formulário |
| Erro de rede durante o submit | Exibir mensagem de erro genérica; botão volta ao estado normal |

---

## Fora do Escopo desta Spec

- Fluxo de "Esqueci minha senha" — rota `/forgot-password` (spec separada)
- Cadastro de usuários (feito pelo admin, fora da plataforma)
- Autenticação com redes sociais

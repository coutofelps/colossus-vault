# Spec: Recuperação de Senha

## Objetivo

Descrever o fluxo completo de recuperação de senha — da solicitação via e-mail até a definição da nova senha.

---

## Visão Geral

O fluxo é dividido em duas etapas em rotas separadas:

1. **Solicitação** — o usuário informa o e-mail cadastrado e recebe um link de redefinição.
2. **Redefinição** — o usuário acessa o link recebido por e-mail e define uma nova senha.

O link de redefinição expira após **1 hora** e é de uso único.

---

## Rotas

| Rota | Página |
|---|---|
| `/forgot-password` | Solicitar recuperação de senha |
| `/reset-password?token=<token>` | Definir nova senha |

---

## Etapa 1 — Solicitar Recuperação (`/forgot-password`)

### Layout

Mesmo padrão visual do login: card centralizado, max-width 440px. Exibe logo, título "Recuperar senha" e subtítulo explicativo.

### Formulário

| Campo | Tipo | Obrigatório | Validação |
|---|---|---|---|
| E-mail | `email` | Sim | Formato de e-mail válido |

### Comportamento

Ao submeter:

- Se o e-mail for válido, a API é chamada e a tela exibe uma **mensagem de confirmação** no lugar do formulário: "Se este e-mail estiver cadastrado, você receberá um link em instantes."
- A mensagem é exibida independentemente de o e-mail existir ou não na base — para evitar enumeração de contas.
- Um link "Voltar para o login" é exibido abaixo da mensagem de confirmação.

### Mensagens de erro

| Situação | Mensagem |
|---|---|
| E-mail vazio | "Informe seu e-mail." |
| E-mail com formato inválido | "E-mail inválido." |
| Erro de rede | "Não foi possível enviar o e-mail. Tente novamente." |

---

## Etapa 2 — Definir Nova Senha (`/reset-password`)

### Layout

Mesmo padrão visual do login: card centralizado, max-width 440px. Exibe logo, título "Nova senha" e subtítulo explicativo.

### Token

O token chega como query string (`?token=<token>`). Ao carregar a página, o sistema valida o token antes de exibir o formulário:

- **Token válido** — exibe o formulário de nova senha.
- **Token inválido ou expirado** — exibe mensagem de erro com link para solicitar um novo link.

### Formulário

| Campo | Tipo | Obrigatório | Validação |
|---|---|---|---|
| Nova senha | `password` | Sim | Mínimo 8 caracteres |
| Confirmar nova senha | `password` | Sim | Deve ser igual ao campo anterior |

### Comportamento

Ao submeter com sucesso:

- A senha é atualizada.
- O token é invalidado.
- O usuário é redirecionado para `/login` com uma mensagem de sucesso: "Senha atualizada. Faça login com sua nova senha."

### Mensagens de erro

| Situação | Mensagem |
|---|---|
| Nova senha vazia | "Informe a nova senha." |
| Nova senha com menos de 8 caracteres | "A senha deve ter pelo menos 8 caracteres." |
| Confirmação vazia | "Confirme a nova senha." |
| Senhas diferentes | "As senhas não coincidem." |
| Token inválido ou expirado | "Este link é inválido ou já expirou. Solicite um novo." |
| Erro de rede | "Não foi possível atualizar a senha. Tente novamente." |

---

## Critérios de Aceite

- [ ] `/forgot-password` acessível e com link de volta ao login
- [ ] E-mail vazio impede o submit e exibe mensagem de erro
- [ ] E-mail com formato inválido impede o submit e exibe mensagem de erro
- [ ] Submit válido exibe mensagem de confirmação sem revelar se o e-mail existe
- [ ] E-mail recebido contém link para `/reset-password?token=<token>`
- [ ] Token inválido ou expirado exibe mensagem de erro com link para novo pedido
- [ ] Nova senha com menos de 8 caracteres impede o submit
- [ ] Senhas diferentes impedem o submit
- [ ] Submit válido em `/reset-password` redireciona para `/login` com mensagem de sucesso
- [ ] Token é invalidado após uso bem-sucedido
- [ ] Token expira após 1 hora

---

## Casos de Borda

| Situação | Comportamento esperado |
|---|---|
| Usuário solicita recuperação duas vezes | Segundo link invalida o primeiro |
| Usuário acessa `/reset-password` sem query string | Redireciona para `/forgot-password` |
| Usuário já autenticado acessa `/forgot-password` | Redireciona para `/account` |

---

## Fora do Escopo desta Spec

- Envio do e-mail (responsabilidade do backend)
- Configuração de expiração do token (responsabilidade do backend)
- Recuperação via SMS ou outros canais

# Spec: Redefinição de Senha (`/reset-password`)

## Objetivo

Permite ao usuário definir uma nova senha após clicar no link enviado por e-mail no fluxo de recuperação. Faz parte do fluxo iniciado em `/forgot-password`.

---

## Fluxo de Acesso

A rota recebe um parâmetro `?token=<valor>` na URL, gerado pelo backend e enviado por e-mail. Sem esse token, a página exibe o estado de link inválido (ver abaixo).

---

## Estados da Página

### Estado: token ausente ou inválido

Exibido quando `?token` não está presente na URL.

- Título: "Link inválido"
- Mensagem: "Este link é inválido ou já expirou. Solicite um novo."
- Link: "Solicitar novo link" → `/forgot-password`

### Estado: formulário

Exibido quando `?token` está presente.

- Título: "Nova senha"
- Subtítulo: "Escolha uma senha com pelo menos 8 caracteres."
- Campos: **Nova senha** e **Confirmar nova senha** (ambos `type="password"`)
- Botão: **Salvar nova senha**
- Link de rodapé: "Voltar para o login" → `/login`

---

## Validação

| Campo | Regra | Mensagem de erro |
|---|---|---|
| Nova senha | Obrigatório | "Informe a nova senha." |
| Nova senha | Mínimo 8 caracteres | "A senha deve ter pelo menos 8 caracteres." |
| Confirmar nova senha | Obrigatório | "Confirme a nova senha." |
| Confirmar nova senha | Deve coincidir com nova senha | "As senhas não coincidem." |

Erros são exibidos inline abaixo de cada campo.

---

## Sucesso

Ao submeter com dados válidos, chama a API de redefinição com o token e redireciona para `/login` passando `state: { passwordReset: true }`. A página de login exibe um banner de confirmação quando recebe esse estado.

---

## Critérios de Aceite

- [ ] Sem `?token` na URL: exibe estado de link inválido com link para `/forgot-password`
- [ ] Com token: exibe formulário com dois campos de senha
- [ ] Validação inline nos dois campos
- [ ] Submit com senhas que não coincidem exibe erro no campo de confirmação
- [ ] Submit válido redireciona para `/login` com `state.passwordReset = true`
- [ ] Link "Voltar para o login" disponível no formulário

---

## Casos de Borda

| Situação | Comportamento esperado |
|---|---|
| Token expirado (resposta da API) | Redireciona para o estado de link inválido — a implementar quando a API existir |
| Usuário já logado | Pode acessar a rota normalmente — sem redirecionamento automático no MVP |

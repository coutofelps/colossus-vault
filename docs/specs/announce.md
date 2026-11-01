# Spec: Anunciar (`/announce`)

## Objetivo

Permitir que qualquer usuário logado anuncie um item para venda direta na Minha Loja, submetendo as informações para revisão. O item só vai ao ar após aprovação do admin (curadoria).

---

## Acesso

- Botão **Anunciar** na seção "Minha Loja" do Dashboard
- Apenas usuários com sessão ativa podem acessar — sem sessão, redireciona para `/login`

No MVP, qualquer conta logada pode anunciar. A diferenciação de papeis (comprador/vendedor) será introduzida em fase posterior.

---

## Rota

| Rota | Página |
|---|---|
| `/announce` | Formulário de criação de leilão |
| `/announce/success` | Confirmação de envio |

---

## Formulário

### Seção: Item

| Campo | Tipo | Obrigatório | Regra |
|---|---|---|---|
| Título | Texto | Sim | Máximo 80 caracteres |
| Descrição | Textarea | Sim | Mínimo 20 caracteres |
| Marca | Texto | Sim | Ex.: "Marvel Legends", "Hot Toys" |
| Linha / Série | Texto | Não | Ex.: "X-Men '97", "Infinity Saga" |
| Escala | Seleção | Sim | 1:6, 1:10, 1:12, 1:18, Outro |
| Condição | Seleção | Sim | Novo lacrado, Novo aberto, Usado excelente, Usado bom |
| Fotos | Upload múltiplo | Sim | Mínimo 1, máximo 8 imagens; formatos JPG/PNG/WEBP; até 10 MB cada |

### Seção: Venda

| Campo | Tipo | Obrigatório | Regra |
|---|---|---|---|
| Preço | Número (BRL) | Sim | Maior que zero |

### Seção: Envio

| Campo | Tipo | Obrigatório | Regra |
|---|---|---|---|
| Frete | Seleção | Sim | Incluso no lance, A combinar, PAC/SEDEX (calculado pelo comprador) |
| Localização do item | Texto | Sim | Cidade e estado |

---

## Validação

- Executada no submit; erros exibidos inline abaixo de cada campo.
- Campos obrigatórios em branco bloqueiam o envio.
- Fotos inválidas (tipo ou tamanho) exibem erro por arquivo.
- Preço zero ou negativo exibe erro.

---

## Fluxo de Submissão

1. Usuário preenche o formulário e clica em **Enviar para revisão**.
2. Frontend valida os campos.
3. Se válido, envia os dados e fotos para a API.
4. Redireciona para `/announce/success`.

### Página de Sucesso (`/announce/success`)

- Título: "Anúncio enviado para revisão"
- Mensagem: informa que o admin vai revisar e que o usuário será notificado quando o item for publicado.
- CTA primário: "Ver minha loja" → `/dashboard`
- CTA secundário: "Anunciar outro item" → `/announce`

---

## Critérios de Aceite

- [ ] Usuário não logado é redirecionado para `/login`
- [ ] Todos os campos obrigatórios bloqueiam o submit quando vazios
- [ ] Mínimo de 1 foto obrigatória; máximo de 8
- [ ] Preço zero ou negativo exibe erro
- [ ] Submit válido redireciona para `/announce/success`
- [ ] Página de sucesso exibe CTAs para dashboard e novo anúncio

---

## Casos de Borda

| Situação | Comportamento esperado |
|---|---|
| Usuário sai da página com formulário preenchido | Alerta de confirmação antes de sair (a implementar) |
| Upload de imagem acima de 10 MB | Erro inline no campo de fotos |
| Formato de imagem não suportado | Erro inline no campo de fotos |
| Sessão expira durante o preenchimento | Ao submeter, redireciona para `/login`; dados do formulário perdidos |

---

## Fora do Escopo desta Spec

- Edição de anúncios após envio
- Rascunhos salvos automaticamente
- Painel do admin para aprovação/rejeição (spec separada)
- Diferenciação de papeis comprador/vendedor (fase posterior)
- Cálculo automático de frete

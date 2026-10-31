# Spec: Fluxo do Leilão

## Objetivo

Descrever o ciclo de vida completo de um leilão no Colossus Vault — da criação ao encerramento — incluindo regras de lance, comportamentos do sistema e responsabilidades de cada ator.

---

## Atores

| Ator | Descrição |
|---|---|
| **Vendedor** | Usuário verificado que cria e configura o leilão |
| **Comprador** | Usuário cadastrado que dá lances |
| **Plataforma** | Sistema automatizado que gerencia o leilão |
| **Admin** | Dono da plataforma, responsável pelo pagamento pós-leilão |

---

## Estados do Leilão

```
RASCUNHO → EM REVISÃO → ATIVO → ENCERRADO
```

| Estado | Descrição |
|---|---|
| `RASCUNHO` | Leilão criado pelo vendedor, ainda não enviado para revisão |
| `EM REVISÃO` | Submetido à curadoria — aguardando aprovação do admin |
| `ATIVO` | Aprovado e com cronômetro rodando — aceita lances |
| `ENCERRADO` | Cronômetro zerou — vencedor definido, ordem gerada |

> Leilões **não podem ser cancelados** após ativação, independentemente de terem lances.

---

## Criação do Leilão (Vendedor)

O vendedor preenche:

| Campo | Regra |
|---|---|
| Título e descrição | Obrigatório |
| Fotos do item | Obrigatório (mínimo a definir) |
| Preço inicial | Obrigatório — valor mínimo para o primeiro lance |
| Incremento mínimo | Obrigatório — valor mínimo entre lances consecutivos (definido pelo vendedor) |
| Preço de reserva | Opcional — valor mínimo oculto que o vendedor aceita |
| Duração | Obrigatório — opções: **6h**, **12h** ou **24h** |
| Anti-snipe | Opcional — ativado pelo vendedor; extensão de **5, 10 ou 15 minutos** (vendedor escolhe) |

Após submissão, o leilão entra em `EM REVISÃO`. O cronômetro só inicia após aprovação do admin.

---

## Lances

### Regras básicas

- Apenas usuários cadastrados podem dar lances.
- O lance deve ser maior ou igual ao **lance atual + incremento mínimo**.
- O próprio vendedor não pode dar lance no seu leilão.
- Lances não podem ser retirados após confirmação.

### Lance Proxy

- O comprador pode definir um **valor máximo**.
- O sistema dá o menor lance possível para manter esse comprador na liderança.
- Se outro comprador superar o máximo, o proxy para e o comprador é notificado.
- O valor máximo é **oculto** dos outros compradores e do vendedor.

### Anti-snipe (opcional, ativado pelo vendedor)

- O vendedor escolhe a extensão ao criar o leilão: **5, 10 ou 15 minutos**.
- Se um lance for dado dentro desse tempo antes do fim, o cronômetro é estendido pelo mesmo valor.
- A extensão se repete a cada novo lance dentro da janela.

---

## Encerramento

Quando o cronômetro zera:

1. O sistema marca o leilão como `ENCERRADO`.
2. Uma **animação de encerramento** é exibida na tela do leilão para todos os usuários presentes.
3. O sistema **notifica o vencedor e o vendedor** (in-app e/ou e-mail — canal a definir).
4. Uma **ordem é gerada automaticamente** com: item, valor final, dados do vencedor e do vendedor.
5. O pagamento é tratado **fora do sistema**, diretamente entre o admin da plataforma e o comprador via WhatsApp.

### Caso sem lances

- Se o leilão encerrar sem nenhum lance, ele é marcado como `ENCERRADO SEM VENCEDOR`.
- O vendedor é notificado.
- Nenhuma ordem é gerada.

### Caso com preço de reserva não atingido

- Se o maior lance for inferior ao preço de reserva, o leilão encerra sem vencedor.
- O vendedor é notificado com o valor do maior lance recebido.

---

## Critérios de Aceite

- [ ] Vendedor consegue criar leilão com todos os campos obrigatórios
- [ ] Leilão não fica ativo sem aprovação do admin
- [ ] Sistema rejeita lance abaixo do mínimo
- [ ] Lance proxy mantém o comprador na liderança automaticamente até o limite
- [ ] Anti-snipe estende o tempo corretamente quando ativado
- [ ] Animação de encerramento é exibida ao zerar o cronômetro
- [ ] Ordem é gerada automaticamente com os dados corretos
- [ ] Nenhuma ordem é gerada quando não há lances
- [ ] Leilão ativo não pode ser cancelado

---

## Casos de Borda

| Situação | Comportamento esperado |
|---|---|
| Dois lances simultâneos pelo mesmo valor | O primeiro a chegar no servidor vence |
| Lance proxy empata com lance manual | O lance manual anterior mantém a liderança |
| Vendedor tenta dar lance no próprio leilão | Sistema bloqueia com mensagem de erro |
| Conexão cai no momento do encerramento | Sistema garante encerramento no servidor — não depende do cliente |

---

## Fora do Escopo desta Spec

- Fluxo de pagamento (tratado externamente via WhatsApp com o admin)
- Fluxo de verificação de vendedor
- Fluxo de curadoria/aprovação pelo admin
- Compre Agora (spec separada)

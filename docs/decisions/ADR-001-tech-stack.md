# ADR-001 — Stack Técnico Inicial

**Status:** Aceito  
**Data:** 2026-10-31  
**Autores:** Marcos Felipe

---

## Contexto

O Colossus Vault precisa de uma stack para construir uma plataforma de leilão em tempo real com:

- Interface reativa que reflita lances e contadores em tempo real
- Backend capaz de processar lances com garantias de consistência (sem lances duplicados, sem condições de corrida)
- Filas para eventos temporizados (anti-snipe, expiração de leilão)
- Capacidade de crescimento de um MVP rápido para um produto de escala

O projeto é desenvolvido por um time pequeno que já tem familiaridade com JavaScript/TypeScript em ambos os lados.

---

## Decisão

Adotar a seguinte stack:

### Frontend

| Camada | Tecnologia | Versão |
|---|---|---|
| UI | React | 18 |
| Build | Vite | 6 |
| Linguagem | TypeScript | 5 |
| Roteamento | React Router DOM | 6 |

### Backend *(Fase 2)*

| Camada | Tecnologia | Justificativa |
|---|---|---|
| Runtime | Node.js | Mesmo ecossistema do frontend — compartilhamento de tipos |
| Framework | Fastify | Performance superior ao Express; suporte nativo a schema/validação |
| Banco de dados | PostgreSQL | Transações ACID para lances — garante consistência sem condições de corrida |
| Tempo real | WebSocket (nativo ou via socket.io) | Atualizações de lance e contadores em tempo real |
| Filas *(Fase 2)* | Redis + BullMQ | Eventos temporizados: expiração de leilão, janela anti-snipe |

### Organização do Repositório

Monorepo com pastas separadas por domínio:

```
colossus-vault/
├── client/    # Frontend React
├── server/    # Backend Fastify (planejado)
└── shared/    # Tipos e contratos compartilhados (planejado)
```

---

## Alternativas Consideradas

### Next.js em vez de React + Vite

**Descartado.** O produto não precisa de SSR nem geração estática — é um app altamente interativo com atualizações em tempo real. A complexidade adicional do Next.js (rotas de API, hidratação, deploy) não traz benefício real nesta fase.

### Express em vez de Fastify

**Descartado.** Fastify tem melhor performance out-of-the-box e validação de schema integrada via JSON Schema, o que reduz boilerplate em endpoints de leilão onde a validação de entrada é crítica.

### MongoDB em vez de PostgreSQL

**Descartado.** Lances exigem transações ACID. Em um leilão, dois compradores podem dar o mesmo lance simultaneamente — o banco precisa serializar isso corretamente. PostgreSQL garante isso nativamente; MongoDB exigiria lógica adicional e transações multi-documento com overhead maior.

### Monorepo com Turborepo/Nx

**Adiado.** Para o MVP, a estrutura de pastas simples (`client/`, `server/`, `shared/`) é suficiente. Turborepo pode ser adotado quando o pipeline de build e os testes exigirem orquestração.

---

## Consequências

**Positivas:**
- TypeScript em toda a stack — tipos compartilhados entre frontend e backend eliminam bugs de contrato
- Fastify + PostgreSQL formam uma base sólida para as garantias de consistência que leilões exigem
- Vite oferece DX (Developer Experience) excelente para o frontend sem configuração excessiva

**Negativas / Trade-offs:**
- Node.js não é a escolha ideal para workloads CPU-intensivos — não é um problema agora, mas pode ser revisado se o backend precisar de processamento pesado de imagens ou relatórios complexos
- Redis adiciona uma dependência de infraestrutura extra que só vale para a Fase 2; enquanto isso, expiração de leilão pode ser gerenciada com polling simples no banco

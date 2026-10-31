# Roadmap

> **Status:** Ativo — atualizado conforme decisões de produto e técnicas.

---

## Fase 1 — Fundação

*MVP funcional: criar e participar de leilões reais.*

### Produto
- [ ] Cadastro e autenticação de compradores
- [ ] Cadastro e verificação manual de vendedores (processo via admin)
- [ ] Criação de leilão pelo vendedor (título, fotos, preço inicial, incremento, duração, anti-snipe)
- [ ] Fluxo de curadoria — admin aprova ou rejeita leilões em revisão
- [ ] Leilão ativo com cronômetro em tempo real
- [ ] Sistema de lances — validação de incremento mínimo, bloqueio de auto-lance
- [ ] Lance Proxy — sistema dá lances automáticos até o limite do comprador
- [ ] Anti-snipe — extensão de 5/10/15 minutos configurável pelo vendedor
- [ ] Encerramento automático — vencedor definido, ordem gerada
- [ ] Notificação de vencedor e vendedor ao encerrar
- [ ] Animação de encerramento no leilão

### Frontend
- [x] Setup React + Vite + TypeScript
- [x] Identidade visual documentada (`docs/brand-identity/`) e tokens definidos
- [x] Design system base — tokens CSS (`:root`), tipografia (Barlow Condensed + DM Sans), componentes primitivos (Button, Badge, Countdown, ImageGallery)
- [x] Layout global — Navbar responsiva com menu mobile + tema alternável, Footer, ThemeContext
- [x] Página de listagem de leilões — cards com foto, título, lance atual, cronômetro, badge de status
- [x] Página do leilão (`/auctions/:id`) — galeria com auto-slide, lightbox, cronômetro ao vivo, histórico de lances, botão DAR LANCE fixo no mobile
- [ ] Página de criação de leilão (vendedor) — formulário com todos os campos da spec

### Técnico
- [ ] Backend Fastify + PostgreSQL
- [ ] WebSocket para atualizações de lance e cronômetro em tempo real
- [ ] Pipeline de CI básico (lint + typecheck)

---

## Fase 2 — Consolidação

*Plataforma confiável com experiência polida para compradores e vendedores.*

### Produto
- [ ] Painel do vendedor — histórico de leilões, status, ordens geradas
- [ ] Histórico de lances por leilão (público)
- [ ] Perfil do comprador — lances ativos, leilões vencidos
- [ ] Compre Agora — aba de listagens de preço fixo
- [ ] Busca e filtros — por estado, faixa de preço, tempo restante, categoria
- [ ] Watchlist — comprador acompanha leilões sem dar lance
- [ ] Notificações in-app em tempo real (superado em lance, leilão encerrando em breve)

### Técnico
- [ ] Redis + BullMQ para filas de expiração e anti-snipe
- [ ] Upload de imagens com otimização automática
- [ ] E-mail transacional (vencedor, vendedor, superado em lance)
- [ ] Rate limiting em endpoints de lance
- [ ] Logs e observabilidade básica

---

## Fase 3 — Escala

*Marketplace maduro com ferramentas avançadas e maior volume.*

### Produto
- [ ] Histórico de preços por personagem/linha/fabricante
- [ ] Reputação de vendedor (avaliações pós-transação)
- [ ] Leilões em destaque e curadoria editorial
- [ ] Integração de pagamento nativa (substituindo o fluxo atual via WhatsApp)
- [ ] App mobile (iOS/Android)
- [ ] API pública para integrações e bots de acompanhamento

### Técnico
- [ ] Arquitetura de filas escalável para alto volume de lances simultâneos
- [ ] CDN para assets de imagem
- [ ] Monitoramento e alertas de produção
- [ ] Testes de carga em endpoints críticos (lance, encerramento)

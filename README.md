# 🛠️ Sistema de Chamados (Help Desk)

Sistema de gerenciamento de chamados de suporte técnico, desenvolvido como projeto de portfólio com foco em vagas Vue.js.

Permite abrir, acompanhar e gerenciar chamados de suporte, com painel administrativo, filtros avançados e busca em tempo real.

---

## ✨ Funcionalidades

- 🎫 Abertura de chamados com validação completa de formulário
- 🔍 Filtros por status, prioridade e categoria
- 🔎 Busca em tempo real por título e descrição
- 📊 Painel administrativo com estatísticas por status
- 🔄 Alteração de status do chamado (admin)
- 📄 Página de detalhe individual de cada chamado
- 💾 Persistência local via `localStorage` — arquitetura pronta para integração com API
- 📱 Layout responsivo

---

## 🚀 Tecnologias

| Tecnologia | Uso no projeto |
|---|---|
| **Vue 3** | Composition API com `<script setup>` |
| **TypeScript** | Tipagem estática em toda a aplicação |
| **Pinia** | Gerenciamento de estado centralizado |
| **Vue Router** | Navegação entre telas, incluindo rotas dinâmicas |
| **Vite** | Build tool e dev server |

---

## 📸 Preview

> _Adicione aqui um print ou GIF do sistema funcionando — recrutadores adoram ver antes de clonar o repositório._

---

## 🔧 Como rodar o projeto

```bash
# Clone o repositório
git clone https://github.com/dduddamorgatto/sistemas-de-chamados.git

# Entre na pasta
cd sistema-de-chamados

# Instale as dependências
npm install

# Rode em ambiente de desenvolvimento
npm run dev

# Build de produção
npm run build
```

O projeto estará disponível em `http://localhost:5173`

---

## 📁 Estrutura do projeto

```
src/
├── components/         # Componentes reutilizáveis
│   ├── TicketCard.vue      # Card individual de chamado
│   ├── TicketForm.vue      # Formulário de abertura com validação
│   ├── TicketList.vue      # Lista com filtros e busca
│   └── StatusBadge.vue     # Badge de status/prioridade
├── views/              # Páginas/telas
│   ├── TicketsView.vue       # Listagem principal
│   ├── NovoTicketView.vue    # Abertura de chamado
│   ├── TicketDetailView.vue  # Detalhe do chamado
│   ├── AdminPanel.vue        # Painel administrativo
│   └── NotFoundView.vue      # Página 404
├── stores/              # Pinia stores
│   └── ticketStore.ts       # Estado central de chamados
├── types/               # Tipos TypeScript
│   └── ticket.ts            # Interfaces e enums
├── router/               # Configuração de rotas
│   └── index.ts
├── App.vue
└── main.ts
```

---

## 🧠 Decisões técnicas

**Pinia com Composition API (setup stores)**
Escolhido por ser o padrão recomendado oficialmente pela documentação do Vue, com melhor inferência de tipos TypeScript em comparação com Options API stores.

**localStorage como persistência temporária**
Simula o comportamento de um backend real. A arquitetura foi pensada para que a troca futura por chamadas HTTP exija alteração apenas na store — os componentes não precisam mudar, já que só conversam com a store.

**Rotas dinâmicas com Vue Router**
A tela de detalhe (`/chamados/:id`) usa parâmetros de rota com `props: true`, mantendo os componentes desacoplados do sistema de roteamento.

**Geração de ID com timestamp**
Solução simples e suficiente para o escopo do MVP. Em produção, seria substituída por UUID gerado no backend.

---

## 🗺️ Roadmap

- [ ] Conectar com backend Node.js + Express
- [ ] Autenticação de usuários (JWT)
- [ ] Comentários e histórico de interações no chamado
- [ ] Upload de anexos
- [ ] Notificações por e-mail
- [ ] Testes unitários com Vitest
- [ ] Dark mode

---

## 👤 Autora

Desenvolvido por **Maria Eduarda**

[LinkedIn](https://www.linkedin.com/in/maria-eduarda-morgatto-machado) • [GitHub](https://github.com/dduddamorgatto)

---

## 📄 Licença

Este projeto está sob a licença MIT — sinta-se livre para usar como referência de estudo.
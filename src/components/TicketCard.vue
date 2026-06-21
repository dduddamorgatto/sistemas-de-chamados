<script setup lang="ts">
import type { Ticket } from '@/types/ticket'
import { TicketStatus } from '@/types/ticket'
import { useRouter } from 'vue-router'
import StatusBadge from './StatusBadge.vue'

const props = defineProps<{
  ticket: Ticket
  modoAdmin?: boolean
}>()

const router = useRouter()

const emit = defineEmits<{
  mudarStatus: [id: string, status: TicketStatus]
  excluir: [id: string]
}>()

function formatarData(dataIso: string): string {
  return new Date(dataIso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<template>
  <div class="ticket-card">
    <div class="ticket-card__header">
      <span class="ticket-card__id">{{ ticket.id }}</span>
      <div class="ticket-card__badges">
        <StatusBadge :prioridade="ticket.prioridade" />
        <StatusBadge :status="ticket.status" />
      </div>
    </div>

    <h3 class="ticket-card__titulo" @click="router.push(`/chamados/${ticket.id}`)">
      {{ ticket.titulo }}
    </h3>
    <p class="ticket-card__descricao">{{ ticket.descricao }}</p>

    <div class="ticket-card__meta">
      <span>👤 {{ ticket.solicitante }}</span>
      <span>📁 {{ ticket.categoria }}</span>
      <span>🕒 {{ formatarData(ticket.criadoEm) }}</span>
    </div>

    <div v-if="modoAdmin" class="ticket-card__acoes">
      <select
        :value="ticket.status"
        @change="emit('mudarStatus', ticket.id, ($event.target as HTMLSelectElement).value as TicketStatus)"
        class="ticket-card__select"
      >
        <option :value="TicketStatus.ABERTO">Aberto</option>
        <option :value="TicketStatus.EM_ANDAMENTO">Em andamento</option>
        <option :value="TicketStatus.RESOLVIDO">Resolvido</option>
        <option :value="TicketStatus.FECHADO">Fechado</option>
      </select>
      <button class="ticket-card__btn-excluir" @click="emit('excluir', ticket.id)">
        Excluir
      </button>
    </div>
  </div>
</template>

<style scoped>
.ticket-card {
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 16px 18px;
  margin-bottom: 12px;
}
.ticket-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.ticket-card__id {
  font-family: monospace;
  font-size: 12px;
  color: #888;
}
.ticket-card__badges {
  display: flex;
  gap: 6px;
}
.ticket-card__titulo {
  font-size: 15px;
  font-weight: 600;
  margin: 4px 0;
  cursor: pointer;
}
.ticket-card__titulo:hover {
  color: #534ab7;
  text-decoration: underline;
}
.ticket-card__descricao {
  font-size: 13px;
  color: #555;
  margin-bottom: 10px;
  line-height: 1.5;
}
.ticket-card__meta {
  display: flex;
  gap: 14px;
  font-size: 12px;
  color: #888;
  margin-bottom: 10px;
  flex-wrap: wrap;
}
.ticket-card__acoes {
  display: flex;
  gap: 8px;
  border-top: 1px solid #eee;
  padding-top: 10px;
}
.ticket-card__select {
  flex: 1;
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 13px;
}
.ticket-card__btn-excluir {
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid #e24b4a;
  background: none;
  color: #e24b4a;
  font-size: 13px;
  cursor: pointer;
}
.ticket-card__btn-excluir:hover {
  background: #fcebeb;
}
</style>
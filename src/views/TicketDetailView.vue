<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTicketStore } from '@/stores/ticketStore'
import StatusBadge from '@/components/StatusBadge.vue'
import { TicketStatus } from '@/types/ticket'

const props = defineProps<{
  id: string
}>()

const router = useRouter()
const ticketStore = useTicketStore()

const ticket = computed(() => ticketStore.ticketPorId(props.id))

function formatarData(dataIso: string): string {
  return new Date(dataIso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function mudarStatus(novoStatus: TicketStatus) {
  if (ticket.value) {
    ticketStore.atualizarStatus(ticket.value.id, novoStatus)
  }
}
</script>

<template>
  <div class="detail-view">
    <button class="btn-voltar" @click="router.push('/chamados')">← Voltar</button>

    <div v-if="!ticket" class="detail-view__nao-encontrado">
      Chamado não encontrado.
    </div>

    <div v-else class="detail-card">
      <div class="detail-card__header">
        <span class="detail-card__id">{{ ticket.id }}</span>
        <div class="detail-card__badges">
          <StatusBadge :prioridade="ticket.prioridade" />
          <StatusBadge :status="ticket.status" />
        </div>
      </div>

      <h1 class="detail-card__titulo">{{ ticket.titulo }}</h1>
      <p class="detail-card__descricao">{{ ticket.descricao }}</p>

      <div class="detail-card__info">
        <div><strong>Solicitante:</strong> {{ ticket.solicitante }}</div>
        <div><strong>Categoria:</strong> {{ ticket.categoria }}</div>
        <div><strong>Aberto em:</strong> {{ formatarData(ticket.criadoEm) }}</div>
        <div><strong>Última atualização:</strong> {{ formatarData(ticket.atualizadoEm) }}</div>
      </div>

      <div class="detail-card__acoes">
        <label>Alterar status:</label>
        <select :value="ticket.status" @change="mudarStatus(($event.target as HTMLSelectElement).value as TicketStatus)">
          <option :value="TicketStatus.ABERTO">Aberto</option>
          <option :value="TicketStatus.EM_ANDAMENTO">Em andamento</option>
          <option :value="TicketStatus.RESOLVIDO">Resolvido</option>
          <option :value="TicketStatus.FECHADO">Fechado</option>
        </select>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail-view {
  max-width: 700px;
  margin: 0 auto;
  padding: 24px 16px;
}
.btn-voltar {
  background: none;
  border: none;
  color: #555;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 16px;
  padding: 0;
}
.btn-voltar:hover {
  color: #222;
}
.detail-view__nao-encontrado {
  text-align: center;
  padding: 60px 20px;
  color: #999;
}
.detail-card {
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 14px;
  padding: 24px;
}
.detail-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.detail-card__id {
  font-family: monospace;
  font-size: 13px;
  color: #888;
}
.detail-card__badges {
  display: flex;
  gap: 6px;
}
.detail-card__titulo {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
}
.detail-card__descricao {
  font-size: 14px;
  color: #444;
  line-height: 1.6;
  margin-bottom: 20px;
}
.detail-card__info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  font-size: 13px;
  color: #555;
  border-top: 1px solid #eee;
  padding-top: 16px;
  margin-bottom: 20px;
}
.detail-card__acoes {
  display: flex;
  align-items: center;
  gap: 10px;
  border-top: 1px solid #eee;
  padding-top: 16px;
}
.detail-card__acoes label {
  font-size: 13px;
  font-weight: 500;
}
.detail-card__acoes select {
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 13px;
}
</style>
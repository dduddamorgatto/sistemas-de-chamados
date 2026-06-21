<script setup lang="ts">
import { useTicketStore } from '@/stores/ticketStore'
import { TicketStatus, TicketPriority, TicketCategory } from '@/types/ticket'
import TicketCard from './TicketCard.vue'

defineProps<{
  modoAdmin?: boolean
}>()

const ticketStore = useTicketStore()

function aoMudarStatus(id: string, novoStatus: TicketStatus) {
  ticketStore.atualizarStatus(id, novoStatus)
}

function aoExcluir(id: string) {
  if (confirm('Tem certeza que deseja excluir este chamado?')) {
    ticketStore.excluirTicket(id)
  }
}
</script>

<template>
  <div class="ticket-list">
    <div class="ticket-list__filtros">
      <input
        :value="ticketStore.filtros.busca"
        @input="ticketStore.atualizarFiltros({ busca: ($event.target as HTMLInputElement).value })"
        type="text"
        placeholder="Buscar por título ou descrição..."
        class="ticket-list__busca"
      />

      <select
        :value="ticketStore.filtros.status"
        @change="ticketStore.atualizarFiltros({ status: ($event.target as HTMLSelectElement).value as TicketStatus | 'todos' })"
      >
        <option value="todos">Todos os status</option>
        <option :value="TicketStatus.ABERTO">Aberto</option>
        <option :value="TicketStatus.EM_ANDAMENTO">Em andamento</option>
        <option :value="TicketStatus.RESOLVIDO">Resolvido</option>
        <option :value="TicketStatus.FECHADO">Fechado</option>
      </select>

      <select
        :value="ticketStore.filtros.prioridade"
        @change="ticketStore.atualizarFiltros({ prioridade: ($event.target as HTMLSelectElement).value as TicketPriority | 'todas' })"
      >
        <option value="todas">Todas as prioridades</option>
        <option :value="TicketPriority.BAIXA">Baixa</option>
        <option :value="TicketPriority.MEDIA">Média</option>
        <option :value="TicketPriority.ALTA">Alta</option>
        <option :value="TicketPriority.URGENTE">Urgente</option>
      </select>

      <select
        :value="ticketStore.filtros.categoria"
        @change="ticketStore.atualizarFiltros({ categoria: ($event.target as HTMLSelectElement).value as TicketCategory | 'todas' })"
      >
        <option value="todas">Todas as categorias</option>
        <option :value="TicketCategory.HARDWARE">Hardware</option>
        <option :value="TicketCategory.SOFTWARE">Software</option>
        <option :value="TicketCategory.REDE">Rede</option>
        <option :value="TicketCategory.ACESSO">Acesso</option>
        <option :value="TicketCategory.OUTRO">Outro</option>
      </select>

      <button class="ticket-list__limpar" @click="ticketStore.limparFiltros()">
        Limpar filtros
      </button>
    </div>

    <p class="ticket-list__contador">
      {{ ticketStore.ticketsFiltrados.length }} chamado(s) encontrado(s)
    </p>

    <div v-if="ticketStore.ticketsFiltrados.length === 0" class="ticket-list__vazio">
      Nenhum chamado encontrado com esses filtros.
    </div>

    <TicketCard
      v-for="ticket in ticketStore.ticketsFiltrados"
      :key="ticket.id"
      :ticket="ticket"
      :modo-admin="modoAdmin"
      @mudar-status="aoMudarStatus"
      @excluir="aoExcluir"
    />
  </div>
</template>

<style scoped>
.ticket-list__filtros {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}
.ticket-list__busca {
  flex: 1;
  min-width: 200px;
  padding: 9px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
}
.ticket-list__filtros select {
  padding: 9px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 13px;
}
.ticket-list__limpar {
  padding: 9px 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: none;
  font-size: 13px;
  cursor: pointer;
}
.ticket-list__limpar:hover {
  background: #f5f5f5;
}
.ticket-list__contador {
  font-size: 13px;
  color: #888;
  margin-bottom: 14px;
}
.ticket-list__vazio {
  text-align: center;
  padding: 40px 20px;
  color: #999;
  font-size: 14px;
}
</style>
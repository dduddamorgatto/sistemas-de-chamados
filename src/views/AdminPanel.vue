<script setup lang="ts">
import { useTicketStore } from '@/stores/ticketStore'
import TicketList from '@/components/TicketList.vue'

const ticketStore = useTicketStore()
</script>

<template>
  <div class="admin-panel">
    <h1 class="admin-panel__titulo">Painel administrativo</h1>

    <div class="admin-panel__stats">
      <div class="stat-card stat-card--azul">
        <span class="stat-card__numero">{{ ticketStore.totalPorStatus.aberto }}</span>
        <span class="stat-card__label">Abertos</span>
      </div>
      <div class="stat-card stat-card--amarelo">
        <span class="stat-card__numero">{{ ticketStore.totalPorStatus.em_andamento }}</span>
        <span class="stat-card__label">Em andamento</span>
      </div>
      <div class="stat-card stat-card--verde">
        <span class="stat-card__numero">{{ ticketStore.totalPorStatus.resolvido }}</span>
        <span class="stat-card__label">Resolvidos</span>
      </div>
      <div class="stat-card stat-card--cinza">
        <span class="stat-card__numero">{{ ticketStore.totalPorStatus.fechado }}</span>
        <span class="stat-card__label">Fechados</span>
      </div>
    </div>

    <TicketList :modo-admin="true" />
  </div>
</template>

<style scoped>
.admin-panel {
  max-width: 900px;
  margin: 0 auto;
  padding: 24px 16px;
}
.admin-panel__titulo {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
}
.admin-panel__stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 28px;
}
.stat-card {
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.stat-card__numero {
  font-size: 26px;
  font-weight: 600;
}
.stat-card__label {
  font-size: 12px;
}
.stat-card--azul { background: #E6F1FB; color: #0C447C; }
.stat-card--amarelo { background: #FAEEDA; color: #633806; }
.stat-card--verde { background: #EAF3DE; color: #27500A; }
.stat-card--cinza { background: #F1EFE8; color: #444441; }

@media (max-width: 600px) {
  .admin-panel__stats {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
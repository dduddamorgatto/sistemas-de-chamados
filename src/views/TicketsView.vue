<script setup lang="ts">
import { useRouter } from 'vue-router'
import TicketList from '@/components/TicketList.vue'

const router = useRouter()
</script>

<template>
  <div class="tickets-view">
    <div class="tickets-view__header">
      <h1>Meus chamados</h1>
      <button class="btn-novo" @click="router.push('/chamados/novo')">
        + Novo chamado
      </button>
    </div>

    <TicketList :modo-admin="false" />
  </div>
</template>

<style scoped>
.tickets-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 24px 16px;
}
.tickets-view__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.tickets-view__header h1 {
  font-size: 22px;
  font-weight: 600;
}
.btn-novo {
  padding: 10px 16px;
  background: #222;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
}
.btn-novo:hover {
  opacity: 0.9;
}
</style>
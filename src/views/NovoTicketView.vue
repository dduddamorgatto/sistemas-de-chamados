<script setup lang="ts">
import { useRouter } from 'vue-router'
import TicketForm from '@/components/TicketForm.vue'

const router = useRouter()

function aoCriar(id: string) {
  alert(`Chamado ${id} aberto com sucesso!`)
  router.push('/chamados')
}
</script>

<template>
  <div class="novo-ticket-view">
    <TicketForm @criado="aoCriar" />
  </div>
</template>

<style scoped>
.novo-ticket-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 24px 16px;
  display: flex;
  justify-content: center;
}
</style>
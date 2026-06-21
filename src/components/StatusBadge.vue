<script setup lang="ts">
import { computed } from 'vue'
import { TicketStatus, TicketPriority } from '@/types/ticket'

const props = defineProps<{
  status?: TicketStatus
  prioridade?: TicketPriority
}>()

const statusConfig: Record<TicketStatus, { label: string; cor: string }> = {
  [TicketStatus.ABERTO]: { label: 'Aberto', cor: 'azul' },
  [TicketStatus.EM_ANDAMENTO]: { label: 'Em andamento', cor: 'amarelo' },
  [TicketStatus.RESOLVIDO]: { label: 'Resolvido', cor: 'verde' },
  [TicketStatus.FECHADO]: { label: 'Fechado', cor: 'cinza' }
}

const prioridadeConfig: Record<TicketPriority, { label: string; cor: string }> = {
  [TicketPriority.BAIXA]: { label: 'Baixa', cor: 'cinza' },
  [TicketPriority.MEDIA]: { label: 'Média', cor: 'azul' },
  [TicketPriority.ALTA]: { label: 'Alta', cor: 'laranja' },
  [TicketPriority.URGENTE]: { label: 'Urgente', cor: 'vermelho' }
}

const config = computed(() => {
  if (props.status) return statusConfig[props.status]
  if (props.prioridade) return prioridadeConfig[props.prioridade]
  return { label: '', cor: 'cinza' }
})
</script>

<template>
  <span class="badge" :class="`badge--${config.cor}`">
    {{ config.label }}
  </span>
</template>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
}
.badge--azul { background: #E6F1FB; color: #0C447C; }
.badge--amarelo { background: #FAEEDA; color: #633806; }
.badge--verde { background: #EAF3DE; color: #27500A; }
.badge--cinza { background: #F1EFE8; color: #444441; }
.badge--laranja { background: #FAECE7; color: #712B13; }
.badge--vermelho { background: #FCEBEB; color: #791F1F; }
</style>
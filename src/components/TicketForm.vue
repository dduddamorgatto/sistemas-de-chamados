<script setup lang="ts">
import { reactive } from 'vue'
import { useTicketStore } from '@/stores/ticketStore'
import { TicketPriority, TicketCategory } from '@/types/ticket'
import type { NovoTicketPayload } from '@/types/ticket'

const ticketStore = useTicketStore()
const emit = defineEmits<{ criado: [id: string] }>()

const form = reactive<NovoTicketPayload>({
  titulo: '',
  descricao: '',
  prioridade: TicketPriority.MEDIA,
  categoria: TicketCategory.SOFTWARE,
  solicitante: ''
})

const erros = reactive<Record<string, string>>({})

function validar(): boolean {
  Object.keys(erros).forEach((k) => delete erros[k])

  if (!form.titulo.trim()) erros.titulo = 'O título é obrigatório'
  if (form.titulo.length > 80) erros.titulo = 'Máximo de 80 caracteres'
  if (!form.descricao.trim()) erros.descricao = 'A descrição é obrigatória'
  if (form.descricao.length < 10) erros.descricao = 'Descreva com mais detalhes (mín. 10 caracteres)'
  if (!form.solicitante.trim()) erros.solicitante = 'Informe seu nome'

  return Object.keys(erros).length === 0
}

function enviar() {
  if (!validar()) return

  const novoTicket = ticketStore.criarTicket({ ...form })

  form.titulo = ''
  form.descricao = ''
  form.prioridade = TicketPriority.MEDIA
  form.categoria = TicketCategory.SOFTWARE
  form.solicitante = ''

  emit('criado', novoTicket.id)
}
</script>

<template>
  <form class="ticket-form" @submit.prevent="enviar">
    <h2 class="ticket-form__titulo">Abrir novo chamado</h2>

    <div class="campo">
      <label>Seu nome</label>
      <input v-model="form.solicitante" type="text" placeholder="Como você se chama?" />
      <span v-if="erros.solicitante" class="erro">{{ erros.solicitante }}</span>
    </div>

    <div class="campo">
      <label>Título do chamado</label>
      <input v-model="form.titulo" type="text" placeholder="Resuma o problema em poucas palavras" />
      <span v-if="erros.titulo" class="erro">{{ erros.titulo }}</span>
    </div>

    <div class="campo-grid">
      <div class="campo">
        <label>Categoria</label>
        <select v-model="form.categoria">
          <option :value="TicketCategory.HARDWARE">Hardware</option>
          <option :value="TicketCategory.SOFTWARE">Software</option>
          <option :value="TicketCategory.REDE">Rede</option>
          <option :value="TicketCategory.ACESSO">Acesso / Login</option>
          <option :value="TicketCategory.OUTRO">Outro</option>
        </select>
      </div>

      <div class="campo">
        <label>Prioridade</label>
        <select v-model="form.prioridade">
          <option :value="TicketPriority.BAIXA">Baixa</option>
          <option :value="TicketPriority.MEDIA">Média</option>
          <option :value="TicketPriority.ALTA">Alta</option>
          <option :value="TicketPriority.URGENTE">Urgente</option>
        </select>
      </div>
    </div>

    <div class="campo">
      <label>Descreva o problema</label>
      <textarea
        v-model="form.descricao"
        rows="4"
        placeholder="Explique o que está acontecendo, quando começou e o que você já tentou fazer"
      ></textarea>
      <span v-if="erros.descricao" class="erro">{{ erros.descricao }}</span>
    </div>

    <button type="submit" class="btn-enviar">Abrir chamado</button>
  </form>
</template>

<style scoped>
.ticket-form {
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 14px;
  padding: 24px;
  max-width: 520px;
}
.ticket-form__titulo {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 18px;
}
.campo {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.campo-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}
label {
  font-size: 13px;
  font-weight: 500;
  color: #444;
}
input, select, textarea {
  padding: 9px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
}
input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: #7f77dd;
  box-shadow: 0 0 0 2px rgba(127, 119, 221, 0.15);
}
.erro {
  font-size: 12px;
  color: #e24b4a;
}
.btn-enviar {
  width: 100%;
  padding: 11px;
  background: #222;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 6px;
}
.btn-enviar:hover {
  opacity: 0.9;
}
</style>
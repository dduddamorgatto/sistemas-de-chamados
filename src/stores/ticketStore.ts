// src/stores/ticketStore.ts

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Ticket, NovoTicketPayload, TicketFiltros } from '@/types/ticket'
import { TicketStatus } from '@/types/ticket'

export const useTicketStore = defineStore('ticket', () => {
  // ---------- STATE ----------
  const tickets = ref<Ticket[]>([])
  const filtros = ref<TicketFiltros>({
    status: 'todos',
    prioridade: 'todas',
    categoria: 'todas',
    busca: ''
  })

  // ---------- GETTERS (computed) ----------

  const ticketsFiltrados = computed(() => {
    return tickets.value.filter((ticket) => {
      const statusOk =
        !filtros.value.status ||
        filtros.value.status === 'todos' ||
        ticket.status === filtros.value.status

      const prioridadeOk =
        !filtros.value.prioridade ||
        filtros.value.prioridade === 'todas' ||
        ticket.prioridade === filtros.value.prioridade

      const categoriaOk =
        !filtros.value.categoria ||
        filtros.value.categoria === 'todas' ||
        ticket.categoria === filtros.value.categoria

      const buscaOk =
        !filtros.value.busca ||
        ticket.titulo.toLowerCase().includes(filtros.value.busca.toLowerCase()) ||
        ticket.descricao.toLowerCase().includes(filtros.value.busca.toLowerCase())

      return statusOk && prioridadeOk && categoriaOk && buscaOk
    })
  })

  const totalPorStatus = computed(() => {
    return {
      aberto: tickets.value.filter((t) => t.status === TicketStatus.ABERTO).length,
      em_andamento: tickets.value.filter((t) => t.status === TicketStatus.EM_ANDAMENTO).length,
      resolvido: tickets.value.filter((t) => t.status === TicketStatus.RESOLVIDO).length,
      fechado: tickets.value.filter((t) => t.status === TicketStatus.FECHADO).length
    }
  })

  const ticketPorId = computed(() => {
    return (id: string) => tickets.value.find((t) => t.id === id)
  })

  // ---------- ACTIONS ----------

  function gerarId(): string {
    return `TCK-${Date.now().toString(36).toUpperCase()}`
  }

  function criarTicket(payload: NovoTicketPayload) {
    const novoTicket: Ticket = {
      id: gerarId(),
      titulo: payload.titulo,
      descricao: payload.descricao,
      status: TicketStatus.ABERTO,
      prioridade: payload.prioridade,
      categoria: payload.categoria,
      solicitante: payload.solicitante,
      criadoEm: new Date().toISOString(),
      atualizadoEm: new Date().toISOString()
    }
    tickets.value.unshift(novoTicket)
    salvarLocalStorage()
    return novoTicket
  }

  function atualizarStatus(id: string, novoStatus: TicketStatus) {
    const ticket = tickets.value.find((t) => t.id === id)
    if (ticket) {
      ticket.status = novoStatus
      ticket.atualizadoEm = new Date().toISOString()
      salvarLocalStorage()
    }
  }

  function atribuirResponsavel(id: string, responsavel: string) {
    const ticket = tickets.value.find((t) => t.id === id)
    if (ticket) {
      ticket.responsavel = responsavel
      ticket.atualizadoEm = new Date().toISOString()
      salvarLocalStorage()
    }
  }

  function excluirTicket(id: string) {
    tickets.value = tickets.value.filter((t) => t.id !== id)
    salvarLocalStorage()
  }

  function atualizarFiltros(novosFiltros: Partial<TicketFiltros>) {
    filtros.value = { ...filtros.value, ...novosFiltros }
  }

  function limparFiltros() {
    filtros.value = { status: 'todos', prioridade: 'todas', categoria: 'todas', busca: '' }
  }

  // ---------- PERSISTÊNCIA (localStorage por enquanto, troca por API depois) ----------

  function salvarLocalStorage() {
    localStorage.setItem('helpdesk_tickets', JSON.stringify(tickets.value))
  }

  function carregarLocalStorage() {
    const dados = localStorage.getItem('helpdesk_tickets')
    if (dados) {
      tickets.value = JSON.parse(dados)
    }
  }

  // Carrega ao iniciar a store
  carregarLocalStorage()

  return {
    tickets,
    filtros,
    ticketsFiltrados,
    totalPorStatus,
    ticketPorId,
    criarTicket,
    atualizarStatus,
    atribuirResponsavel,
    excluirTicket,
    atualizarFiltros,
    limparFiltros
  }
})
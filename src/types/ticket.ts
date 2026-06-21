// src/types/ticket.ts

export enum TicketStatus {
  ABERTO = 'aberto',
  EM_ANDAMENTO = 'em_andamento',
  RESOLVIDO = 'resolvido',
  FECHADO = 'fechado'
}

export enum TicketPriority {
  BAIXA = 'baixa',
  MEDIA = 'media',
  ALTA = 'alta',
  URGENTE = 'urgente'
}

export enum TicketCategory {
  HARDWARE = 'hardware',
  SOFTWARE = 'software',
  REDE = 'rede',
  ACESSO = 'acesso',
  OUTRO = 'outro'
}

export interface Ticket {
  id: string
  titulo: string
  descricao: string
  status: TicketStatus
  prioridade: TicketPriority
  categoria: TicketCategory
  solicitante: string
  responsavel?: string
  criadoEm: string
  atualizadoEm: string
}

export interface NovoTicketPayload {
  titulo: string
  descricao: string
  prioridade: TicketPriority
  categoria: TicketCategory
  solicitante: string
}

export interface TicketFiltros {
  status?: TicketStatus | 'todos'
  prioridade?: TicketPriority | 'todas'
  categoria?: TicketCategory | 'todas'
  busca?: string
}
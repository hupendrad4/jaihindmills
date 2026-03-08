import { defineStore } from 'pinia'

export interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  duration?: number
}

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<Toast[]>([])

  const add = (message: string, type: Toast['type'] = 'info', duration = 3000) => {
    const id = Date.now().toString()
    toasts.value.push({ id, message, type, duration })
    setTimeout(() => remove(id), duration)
    return id
  }

  const remove = (id: string) => {
    const idx = toasts.value.findIndex(t => t.id === id)
    if (idx !== -1) toasts.value.splice(idx, 1)
  }

  const success = (message: string) => add(message, 'success')
  const error = (message: string) => add(message, 'error')
  const info = (message: string) => add(message, 'info')
  const warning = (message: string) => add(message, 'warning')

  return { toasts, add, remove, success, error, info, warning }
})

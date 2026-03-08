export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.client) {
    const isAdmin = localStorage.getItem('jhm-admin-auth') === 'true'
    if (!isAdmin && to.path !== '/admin/login') {
      return navigateTo('/admin/login')
    }
  }
})

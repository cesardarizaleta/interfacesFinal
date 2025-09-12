export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.client) {
    const token = localStorage.getItem('token'); // Cambia 'authToken' por el nombre de tu token

    // Si no hay token y la ruta actual no es /login o /register
    if (!token && to.path !== '/login' && to.path !== '/register') {
      return navigateTo('/login');
    }
  }
});


// cesar estuvo
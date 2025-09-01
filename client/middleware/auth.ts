export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const token = localStorage.getItem('token'); // Cambia 'authToken' por el nombre de tu token

    // Si no hay token y la ruta actual no es /login
    if (!token && to.path !== '/login') {
      return navigateTo('/login');
    }
  }
});
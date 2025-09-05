export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const user = localStorage.getItem('user');
    if (!user) {
      return navigateTo('/login');
    }

    const userData = JSON.parse(user);
    if (userData.role !== 'admin') {
      return navigateTo('/');
    }
  }
});

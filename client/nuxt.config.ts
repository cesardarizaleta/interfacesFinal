// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devServer: { port: 5000 },
  devtools: { enabled: false },
  ssr: false,
  modules: ["@nuxtjs/tailwindcss", "@nuxt/icon", "@nuxt/image"],
  runtimeConfig: {
    public: {
      BACKEND_URL: process.env.BACKEND_URL,
    },
  },
  plugins: [
    '~/plugins/palette.client.ts'
  ],
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
        }
      ]
    }
  }
});

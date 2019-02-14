<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import api from './api';

export default {
  name: 'App',
  async mounted() {
    this.refreshToken();

    const tokenRefreshTimeInSeconds = 5000
    setInterval(this.refreshToken, tokenRefreshTimeInSeconds)
  },
  methods: {
    async refreshToken() {
      try {
        const { data } = await api.post(
          '/token-refresh',
          {},
          { headers: { 'Authorization': localStorage.getItem('token') }
        })

        localStorage.setItem('token', data)
        console.log('Token atualizado!', data)
      } catch (error) {
        if (error.response.status === 401) {
          this.$router.push('/login')
          console.log('Token inválido, redirecionando para página de login...')
        }
      }
    }
  }
}
</script>

<style>
</style>

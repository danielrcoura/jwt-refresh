<template>
  <form @submit.prevent="auth()">
    <label>email</label>
    <input type="text" placeholder="user@email.com" v-model="email">
    <label>password</label>
    <input type="password" placeholder="abcd1234" v-model="password">
    <button type="submit"> Entrar </button>
  </form>
</template>

<script>
import api from '../api';

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    } 
  },
  methods: {
    async auth () {
      const { data } = await api.post(
        '/auth',
        { email: this.email, password: this.password },
        { headers: { 'Authorization': localStorage.getItem('token') }}
      )

      localStorage.setItem('token', data)
      console.log('Autenticação realizada')
    }
  }
}
</script>

<style>
</style>

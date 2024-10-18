<template>
  <v-app>
    <!-- Exibe a AppBar somente se o usuário não estiver na rota de login -->
    <AppBar v-if="showAppBar" />

    <v-main class="background-color">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
// Importa o componente AppBar
import AppBar from './components/AppBar.vue';

export default {
  name: "App",
  components: {
    AppBar, // registra o componente AppBar
  },
  computed: {
    showAppBar() {
      // Verifica a rota atual e exibe a AppBar somente se não estiver na rota de login
      return this.$route.name !== 'Login';
    }
  }
};
</script>

<style scoped>
body {
  font-family: "Roboto", sans-serif;
  margin: 0;
}

.background-color {
  background-color: #e3f2fd; /* Cor de fundo cinza claro */
}
</style>

<template>
  <v-app>
    <!-- Exibe a AppBar somente em rotas onde for necessário -->
    <AppBar v-show="showAppBar" />

    <!-- Conteúdo principal -->
    <v-main class="background-color">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
// Importa o componente AppBar
import AppBar from "./components/Shared/AppBar.vue";

export default {
  name: "App",
  components: {
    AppBar,
  },
  computed: {
    showAppBar() {
      // Rotas sem AppBar (ex.: Login)
      const noAppBarRoutes = ["Login"];
      return !noAppBarRoutes.includes(this.$route.name);
    },
  },
};
</script>

<style scoped>
body {
  font-family: "Roboto", sans-serif;
  margin: 0;
  padding: 0;
  background-color: #e3f2fd;
}

.background-color {
  background-color: #e3f2fd; /* Cor de fundo padrão */
  max-height: 100vh; /* Garante que o fundo ocupa toda a altura */
}
</style>

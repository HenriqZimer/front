<template>
  <v-app>
    <!-- Exibe a AppBar somente se o usuário não estiver na rota de login -->
    <v-app-bar v-if="showAppBar" app color="primary" dark elevate-on-scroll>
      <v-container>
        <v-row align="center" justify="space-between">
          <v-btn text to="/" class="nav-btn">Home</v-btn>
          <v-btn text to="/usuarios" class="nav-btn">Gerenciar Usuários</v-btn>
          <v-btn text to="/carros" class="nav-btn">Gerenciar Carros</v-btn>
          <v-btn text to="/alugueis" class="nav-btn">Gerenciar Aluguéis</v-btn>
          <v-btn text to="/pagamentos" class="nav-btn">Gerenciar Pagamentos</v-btn>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  computed: {
    showAppBar() {
      // Verifica a rota atual e exibe a AppBar somente se não estiver na rota de login
      return this.$route.name !== 'Login';
    }
  }
};
</script>

<style scoped>
.nav-btn {
  margin: 0 10px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 14px;
  color: #ffffff;
}

.v-toolbar-title {
  font-size: 20px;
  font-weight: 500;
}

body {
  font-family: "Roboto", sans-serif;
  margin: 0;
}

@media (max-width: 600px) {
  .v-toolbar-title {
    font-size: 16px;
  }

  .nav-btn {
    font-size: 12px;
    margin: 0 5px;
  }
}
</style>

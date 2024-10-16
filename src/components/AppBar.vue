<!-- components/AppBar.vue -->
<template>
  <v-app-bar app color="primary" dark elevate-on-scroll>
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
</template>

<script>
export default {
  name: 'AppBar',
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
</style>

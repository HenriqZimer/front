<!-- components/AppBar.vue -->
<template>
  <v-app-bar app color="white" dark elevate-on-scroll flat>
    <v-container>
      <v-row align="center" justify="space-between">
        <!-- Coluna para o botão Home (2/12 da largura) -->
        <v-col cols="2">
          <v-btn text to="/" class="nav-btn">
            <v-icon left>mdi-home</v-icon>
            Home
          </v-btn>
        </v-col>

        <!-- Coluna para os botões de gerenciamento (10/12 da largura) -->
        <v-col cols="10">
          <v-row align="center" justify="end" class="no-gutters">
            <v-btn text to="/usuarios" class="nav-btn">
              <v-icon left>mdi-account</v-icon>
              Usuários
            </v-btn>
            <v-btn text to="/carros" class="nav-btn">
              <v-icon left>mdi-car</v-icon>
              Carros
            </v-btn>
            <v-btn text to="/alugueis" class="nav-btn">
              <v-icon left>mdi-file-document</v-icon>
              Aluguéis
            </v-btn>
            <v-btn text to="/pagamentos" class="nav-btn">
              <v-icon left>mdi-cash</v-icon>
              Pagamentos
            </v-btn>
          </v-row>
        </v-col>
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
  margin: 0 4px; /* Espaço reduzido entre os botões */
  text-transform: none;
  font-weight: 400;
  font-size: 14px;
  color: #333333;
}

.v-btn {
  padding: 0 6px; /* Reduzi o padding dos botões */
}

.v-icon {
  margin-right: 4px;
  font-size: 18px;
}

.v-app-bar {
  box-shadow: none;
  border-bottom: 1px solid #e0e0e0;
}

.v-row.no-gutters {
  margin-left: 0;
  margin-right: 0;
}

.v-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>

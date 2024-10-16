<template>
  <v-container fluid class="home-container">
    <v-row align="center" justify="center">
      <v-col cols="12" md="8" class="text-center">
        <v-card elevation="10" class="pa-5">
          <v-card-title class="headline">Bem-vindo ao Sistema de Aluguel de Carros!</v-card-title>

          <v-card-text>
            <p class="subheading">
              Gerencie usuários, carros, aluguéis e pagamentos de maneira simples e eficiente.
            </p>
          </v-card-text>

          <v-card-actions class="justify-center">
            <v-btn color="primary" @click="$router.push('/carros')" class="ma-2">
              Ver Carros Disponíveis
            </v-btn>
            <v-btn color="secondary" @click="$router.push('/alugueis')" class="ma-2">
              Meus Aluguéis
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f2f5;
}

.headline {
  font-weight: bold;
  color: #1976d2;
}

.subheading {
  font-size: 1.2rem;
  margin-top: 10px;
  color: #757575;
}

.v-card {
  background-color: #ffffff;
  padding: 30px;
  border-radius: 10px;
}

.v-btn {
  width: 200px;
  font-weight: bold;
}
</style>

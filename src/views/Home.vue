<template>
  <v-container fluid class="home-container">
    <v-row align="center" justify="center">
      <v-col cols="12" md="8" lg="6" class="text-center">
        <v-card elevation="12" class="pa-5 home-card">
          <v-card-title class="headline">
            BEM-VINDO AO <br />
            SISTEMA DE ALUGUEL DE CARROS!
          </v-card-title>

          <v-divider class="my-4"></v-divider>

          <v-card-text>
            <p class="subheading">
              Gerencie usuários, carros, aluguéis e pagamentos <br />
              de maneira simples e eficiente.
            </p>
          </v-card-text>

          <v-card-actions class="justify-center">
            <v-btn
              color="primary"
              large
              class="ma-2 home-btn"
              @click="$router.push('/carros')"
            >
              ver carros disponíveis
            </v-btn>
            <v-btn
              color="secondary"
              large
              class="ma-2 home-btn"
              @click="$router.push('/alugueis')"
            >
              meus aluguéis
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
  background: linear-gradient(135deg, #d0e8f2 0%, #f8f9fa 100%);
}

/* Título em uppercase */
.headline {
  font-weight: 700;
  color: #1565c0;
  font-size: 1.5rem;
  letter-spacing: 0.5px;
  line-height: 1.5;
  text-transform: uppercase;
}

.subheading {
  font-size: 1.1rem;
  color: #616161;
  font-weight: 400;
  line-height: 1.6;
}

.home-card {
  background-color: #ffffff;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.v-btn {
  width: 240px;
  font-weight: bold;
  font-size: 1.1rem;
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* Remover o uppercase dos botões */
.v-btn .v-btn__content {
  font-size: 1rem;
}

.home-btn {
  padding: 20px;
  font-size: 1rem;
}
</style>

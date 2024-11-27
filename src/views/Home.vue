<template>
  <v-container fluid class="home-container">
    <v-row align="center" justify="center">
      <v-col cols="12" md="8" lg="6" class="text-center">
        <v-card elevation="12" class="pa-5 home-card">
          <!-- Título com Slot -->
          <v-card-title class="headline">
            <slot name="title">BEM-VINDO AO SISTEMA DE ALUGUEL DE CARROS!</slot>
          </v-card-title>

          <v-divider class="my-4"></v-divider>

          <!-- Subtítulo com Slot -->
          <v-card-text>
            <slot name="subtitle">
              <p class="subheading">
                Gerencie usuários, carros, aluguéis e pagamentos <br />
                de maneira simples e eficiente.
              </p>
            </slot>
          </v-card-text>

          <!-- Botões de Navegação -->
          <v-card-actions class="justify-center">
            <v-btn
              color="primary"
              large
              class="ma-2 home-btn"
              @click="$router.push('/carros')"
              aria-label="Ver carros disponíveis"
            >
              ver carros disponíveis
            </v-btn>
            <v-btn
              color="secondary"
              large
              class="ma-2 home-btn"
              @click="$router.push('/alugueis')"
              aria-label="Meus aluguéis"
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
/* Layout da Home */
.home-container {
  min-height: 93vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #d0e8f2 0%, #f8f9fa 100%);
}

/* Estilo do título */
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

/* Card principal */
.home-card {
  background-color: #ffffff;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

/* Botões */
.v-btn {
  width: 240px;
  font-weight: bold;
  font-size: 1.1rem;
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.v-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.home-btn {
  padding: 20px;
  font-size: 1rem;
}
</style>

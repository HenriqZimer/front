<template>
  <v-container class="fill-height d-flex align-center justify-center background-color">
    <v-row justify="center" class="mb-4">
      <v-col cols="12" md="8" lg="6">
        <v-card class="pa-4 carro-card" outlined>
          <v-card-title class="text-h4">
            Gerenciamento de Carros
            <!-- Botão circular com ícone de "+" -->
            <v-btn
              icon
              color="primary"
              class="add-carro-btn"
              @click="navigateToCreate"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-card-title>

          <v-card-text>
            <!-- Lista de Carros -->
            <CarroList />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CarroList from "../components/Carro/CarroList.vue";

export default {
  components: {
    CarroList,
  },
  methods: {
    navigateToCreate() {
      this.$router.push("/carros/novo");
    },
  },
};
</script>

<style scoped>
.pa-4 {
  padding: 16px;
}

.mb-4 {
  margin-bottom: 16px;
}

.v-card-title {
  font-weight: 500;
  color: #424242;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
}

.add-carro-btn {
  background-color: #1976d2;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.add-carro-btn:hover {
  background-color: #1565c0;
}

.v-icon {
  color: #ffffff;
}

.carro-card {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
}

.fill-height {
  min-height: 90vh; /* Ocupa 90% da altura da viewport */
}

.background-color {
  background-color: #e3f2fd; /* Cor de fundo cinza claro */
}
</style>

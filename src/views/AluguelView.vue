<template>
  <v-container class="fill-height d-flex align-center justify-center background-color">
    <v-row justify="center" class="mb-4">
      <v-col cols="12" md="8" lg="6">
        <v-card class="pa-4 aluguel-card" outlined>
          <!-- Título com Slot para Flexibilidade -->
          <v-card-title class="card-title">
            <span>Gerenciamento de Aluguéis</span>
            <CreateButton @click="navigateToCreate" />
          </v-card-title>

          <v-card-text>
            <!-- Lista de Aluguéis -->
            <AluguelList />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AluguelList from "../components/Aluguel/AluguelList.vue";
import CreateButton from "../components/Shared/CreateButton.vue";

export default {
  components: {
    AluguelList,
    CreateButton,
  },
  methods: {
    navigateToCreate() {
      this.$router.push("/alugueis/novo");
    },
  },
};
</script>

<style scoped>
.mb-4 {
  margin-bottom: 16px;
}

.card-title {
  font-weight: 500;
  color: #424242;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
}

.aluguel-card {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
}

.fill-height {
  min-height: 90vh; /* Ocupa 90% da altura da viewport */
}

.background-color {
  background-color: #e3f2fd; /* Cor de fundo */
}
</style>

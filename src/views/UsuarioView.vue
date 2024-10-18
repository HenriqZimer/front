<template>
  <v-container
    class="fill-height d-flex align-center justify-center background-color"
  >
    <v-row justify="center" class="mb-4">
      <v-col cols="12" md="8" lg="6">
        <v-card class="pa-4 user-card" outlined>
          <v-card-title class="text-h4">
            Gerenciamento de Usuários
            <!-- Botão circular com ícone de "+" -->
            <v-btn
              icon
              color="primary"
              class="add-user-btn"
              @click="navigateToCreate"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-card-title>

          <v-card-text>
            <!-- Lista de Usuários -->
            <UsuarioList />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UsuarioList from "../components/Usuario/UsuarioList.vue";

export default {
  components: {
    UsuarioList,
  },
  methods: {
    navigateToCreate() {
      this.$router.push("/usuarios/novo");
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

.add-user-btn {
  background-color: #1976d2;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.add-user-btn:hover {
  background-color: #1565c0;
}

.v-icon {
  color: #ffffff;
}

.user-card {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
}

.fill-height {
  min-height: 20vh; /* Ocupa 90% da altura da viewport */
}
</style>

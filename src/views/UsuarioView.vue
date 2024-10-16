<template>
  <v-container>
    <v-row justify="center" class="mb-4">
      <v-col cols="12" md="8">
        <v-card class="pa-4" outlined>
          <v-card-title class="text-h4">Gerenciamento de Usuários</v-card-title>
          <v-card-actions>
            <v-btn color="primary" class="ma-2" @click="navigateToCreate"
              >Novo Usuário</v-btn
            >
          </v-card-actions>
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
</style>

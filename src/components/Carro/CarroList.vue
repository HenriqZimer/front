<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <!-- Verifica se há carros na lista -->
        <v-card v-if="carros.length > 0" elevation="3">
          <v-card-title class="text-h5">Lista de Carros</v-card-title>

          <v-divider></v-divider>

          <v-card-text>
            <v-list>
              <v-list-item
                v-for="carro in carros"
                :key="carro._id"
                class="carro-list-item"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    <router-link
                      :to="`/carros/${carro._id}`"
                      class="carro-link"
                    >
                      {{ carro.marca }} - {{ carro.modelo }} ({{ carro.ano }}) | Placa: {{ carro.placa }} | Status: {{ carro.status }} | R$ {{ carro.precoPorDia }}/dia
                    </router-link>
                  </v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn
                    icon
                    color="primary"
                    @click="$router.push(`/carros/${carro._id}/editar`)"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon color="red darken-2" @click="deleteCarro(carro._id)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>

        <!-- Mensagem de "nenhum carro encontrado" caso a lista esteja vazia -->
        <v-card v-else elevation="3">
          <v-card-title class="text-h5">Nenhum Carro Encontrado</v-card-title>
          <v-card-text>
            Não há carros cadastrados no momento.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      carros: [],
    };
  },
  created() {
    this.fetchCarros();
  },
  methods: {
    async fetchCarros() {
      try {
        const response = await axios.get("http://localhost:3000/carros");
        this.carros = response.data;
      } catch (error) {
        console.error("Erro ao buscar carros:", error);
      }
    },
    async deleteCarro(id) {
      try {
        await axios.delete(`http://localhost:3000/carros/${id}`);
        this.fetchCarros(); // Atualiza a lista após exclusão
      } catch (error) {
        console.error("Erro ao excluir carro:", error);
      }
    },
  },
};
</script>

<style scoped>
.carro-link {
  text-decoration: none;
  color: #1976d2;
  font-weight: bold;
}

.carro-link:hover {
  text-decoration: underline;
}

.carro-list-item {
  transition: background-color 0.3s ease;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 10px;
  background-color: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
}

.carro-list-item:hover {
  background-color: #f5f5f5;
}

.v-btn {
  min-width: 36px;
  min-height: 36px;
  transition: transform 0.2s ease-in-out;
}

.v-btn:hover {
  transform: scale(1.1);
}

.v-card-title {
  font-weight: bold;
  color: #3f51b5;
}

.v-card {
  border-radius: 10px;
}
</style>

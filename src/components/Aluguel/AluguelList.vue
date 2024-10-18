<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <!-- Verifica se há aluguéis na lista -->
        <v-card v-if="alugueis.length > 0" elevation="1" class="aluguel-card">
          <v-card-title class="text-h6">Lista de Aluguéis</v-card-title>

          <v-divider></v-divider>

          <v-card-text>
            <v-list dense>
              <v-list-item
                v-for="aluguel in alugueis"
                :key="aluguel._id"
                class="aluguel-list-item"
              >
                <v-row align="center" justify="space-between" class="pa-4">
                  <!-- Informações do aluguel à esquerda -->
                  <v-col cols="9">
                    <v-list-item-content>
                      <v-list-item-title>
                        Data: {{ aluguel.dataInicio }} até
                        {{ aluguel.dataFim }} | Valor: R$
                        {{ aluguel.valorTotal }} | Status: {{ aluguel.status }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-col>

                  <!-- Botões de editar e excluir à direita -->
                  <v-col cols="3" class="d-flex justify-end">
                    <v-list-item-action>
                      <v-btn
                        icon
                        small
                        color="primary"
                        class="mr-2"
                        @click="$router.push(`/alugueis/${aluguel._id}/editar`)"
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn
                        icon
                        small
                        color="red"
                        @click="deleteAluguel(aluguel._id)"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-col>
                </v-row>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>

        <!-- Mensagem de "nenhum aluguel encontrado" caso a lista esteja vazia -->
        <v-card v-else elevation="1" class="aluguel-card">
          <v-card-title class="text-h6">Nenhum Aluguel Encontrado</v-card-title>
          <v-card-text>Não há aluguéis cadastrados no momento.</v-card-text>
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
      alugueis: [],
    };
  },
  created() {
    this.fetchAlugueis();
  },
  methods: {
    async fetchAlugueis() {
      try {
        const response = await axios.get("http://localhost:3000/alugueis");
        this.alugueis = response.data;
      } catch (error) {
        console.error("Erro ao buscar aluguéis:", error);
      }
    },
    async deleteAluguel(id) {
      try {
        await axios.delete(`http://localhost:3000/alugueis/${id}`);
        this.fetchAlugueis(); // Atualiza a lista após exclusão
      } catch (error) {
        console.error("Erro ao excluir aluguel:", error);
      }
    },
  },
};
</script>

<style scoped>
.aluguel-link {
  text-decoration: none;
  color: #1e88e5;
  font-weight: 500;
  font-size: 16px;
}

.aluguel-list-item {
  padding: 10px 16px;
  border-radius: 8px;
  margin-bottom: 8px;
  background-color: #fafafa;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.aluguel-list-item:hover {
  background-color: #e3f2fd;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08);
}

.v-btn {
  min-width: 32px;
  min-height: 32px;
  transition: transform 0.2s ease-in-out, background-color 0.2s;
}

.v-btn:hover {
  transform: scale(1.05);
}

.v-card-title {
  font-weight: 500;
  color: #424242;
}

.v-card {
  border-radius: 12px;
  background-color: #ffffff;
}

.v-card-text {
  padding-top: 0;
}

.aluguel-card {
  margin-bottom: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.v-divider {
  margin: 8px 0;
}

.mr-2 {
  margin-right: 8px;
}

.background-color {
  background-color: #e3f2fd; /* Cor de fundo cinza claro */
}
</style>

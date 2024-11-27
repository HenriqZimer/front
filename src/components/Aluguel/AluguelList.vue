<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <!-- Card de Aluguéis -->
        <v-card
          v-if="alugueis.length > 0"
          elevation="1"
          class="aluguel-card"
        >
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
                  <!-- Informações do aluguel -->
                  <v-col cols="9">
                    <v-list-item-content>
                      <v-list-item-title>
                        Data: {{ aluguel.dataInicio }} até {{ aluguel.dataFim }}
                        | Valor: R$ {{ aluguel.valorTotal }} | Status:
                        {{ aluguel.status }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-col>

                  <!-- Botões de ação -->
                  <v-col cols="3" class="d-flex justify-end">
                    <v-list-item-action>
                      <template v-for="action in actions" :key="action.name">
                        <v-btn
                          :icon="true"
                          :small="true"
                          :color="action.color"
                          :class="action.class"
                          @click="action.handler(aluguel._id)"
                        >
                          <v-icon>{{ action.icon }}</v-icon>
                        </v-btn>
                      </template>
                    </v-list-item-action>
                  </v-col>
                </v-row>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>

        <!-- Mensagem de lista vazia -->
        <v-card v-else elevation="1" class="aluguel-card">
          <v-card-title class="text-h6">Nenhum Aluguel Encontrado</v-card-title>
          <v-card-text>{{ emptyMessage }}</v-card-text>
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
      actions: [
        {
          name: "edit",
          icon: "mdi-pencil",
          color: "primary",
          class: "mr-2",
          handler: (id) => this.editAluguel(id),
        },
        {
          name: "delete",
          icon: "mdi-delete",
          color: "red",
          handler: (id) => this.deleteAluguel(id),
        },
      ],
      emptyMessage: "Não há aluguéis cadastrados no momento.",
    };
  },
  created() {
    this.fetchAlugueis();
  },
  methods: {
    async handleApiRequest(method, url, onSuccess, errorMessage) {
      try {
        const response = await axios[method](url);
        if (onSuccess) onSuccess(response.data);
      } catch (error) {
        console.error(errorMessage, error);
      }
    },
    fetchAlugueis() {
      this.handleApiRequest(
        "get",
        "http://localhost:3000/alugueis",
        (data) => (this.alugueis = data),
        "Erro ao buscar aluguéis"
      );
    },
    deleteAluguel(id) {
      this.handleApiRequest(
        "delete",
        `http://localhost:3000/alugueis/${id}`,
        () => this.fetchAlugueis(),
        "Erro ao excluir aluguel"
      );
    },
    editAluguel(id) {
      this.$router.push(`/alugueis/${id}/editar`);
    },
  },
};
</script>

<style scoped>
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

.aluguel-card {
  margin-bottom: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <!-- Verifica se há pagamentos na lista -->
        <v-card v-if="pagamentos.length > 0" elevation="3">
          <v-card-title class="text-h5">Lista de Pagamentos</v-card-title>

          <v-divider></v-divider>

          <v-card-text>
            <v-list>
              <v-list-item
                v-for="pagamento in pagamentos"
                :key="pagamento._id"
                class="pagamento-list-item"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    <router-link
                      :to="`/pagamentos/${pagamento._id}`"
                      class="pagamento-link"
                    >
                      Cliente: {{ pagamento.idCliente }} | Carro: {{ pagamento.idCarro }} | Valor: R$ {{ pagamento.valor }} | Data: {{ pagamento.dataPagamento }} | Forma: {{ pagamento.formaPagamento }}
                    </router-link>
                  </v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn
                    icon
                    color="primary"
                    @click="$router.push(`/pagamentos/${pagamento._id}/editar`)"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon color="red darken-2" @click="deletePagamento(pagamento._id)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>

        <!-- Mensagem de "nenhum pagamento encontrado" caso a lista esteja vazia -->
        <v-card v-else elevation="3">
          <v-card-title class="text-h5">Nenhum Pagamento Encontrado</v-card-title>
          <v-card-text>
            Não há pagamentos cadastrados no momento.
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
      pagamentos: [],
    };
  },
  created() {
    this.fetchPagamentos();
  },
  methods: {
    async fetchPagamentos() {
      try {
        const response = await axios.get("http://localhost:3000/pagamentos");
        this.pagamentos = response.data;
      } catch (error) {
        console.error("Erro ao buscar pagamentos:", error);
      }
    },
    async deletePagamento(id) {
      try {
        await axios.delete(`http://localhost:3000/pagamentos/${id}`);
        this.fetchPagamentos(); // Atualiza a lista após exclusão
      } catch (error) {
        console.error("Erro ao excluir pagamento:", error);
      }
    },
  },
};
</script>

<style scoped>
.pagamento-link {
  text-decoration: none;
  color: #1976d2;
  font-weight: bold;
}

.pagamento-link:hover {
  text-decoration: underline;
}

.pagamento-list-item {
  transition: background-color 0.3s ease;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 10px;
  background-color: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
}

.pagamento-list-item:hover {
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

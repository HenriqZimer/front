<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <!-- Verifica se há pagamentos na lista -->
        <v-card v-if="pagamentos.length > 0" elevation="1" class="pagamento-card">
          <v-card-title class="text-h6">Lista de Pagamentos</v-card-title>

          <v-divider></v-divider>

          <v-card-text>
            <v-list dense>
              <v-list-item
                v-for="pagamento in pagamentos"
                :key="pagamento._id"
                class="pagamento-list-item"
              >
                <v-row align="center" justify="space-between" class="pa-4">
                  <!-- Informações do pagamento à esquerda -->
                  <v-col cols="9">
                    <v-list-item-content>
                      <v-list-item-title>
                        Cliente: {{ pagamento.idCliente }} | Carro: {{ pagamento.idCarro }} | Valor: R$ {{ pagamento.valor }} | Data: {{ pagamento.dataPagamento }} | Forma: {{ pagamento.formaPagamento }}
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
                        @click="$router.push(`/pagamentos/${pagamento._id}/editar`)"
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn
                        icon
                        small
                        color="red"
                        @click="deletePagamento(pagamento._id)"
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

        <!-- Mensagem de "nenhum pagamento encontrado" caso a lista esteja vazia -->
        <v-card v-else elevation="1" class="pagamento-card">
          <v-card-title class="text-h6">Nenhum Pagamento Encontrado</v-card-title>
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
  color: #1e88e5;
  font-weight: 500;
  font-size: 16px;
}

.pagamento-list-item {
  padding: 10px 16px;
  border-radius: 8px;
  margin-bottom: 8px;
  background-color: #fafafa;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.pagamento-list-item:hover {
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

.pagamento-card {
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
</style>

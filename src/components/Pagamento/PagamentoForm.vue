<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card v-if="pagamento || !isEditing" elevation="3">
          <v-card-title class="text-h5">
            {{ isEditing ? "Editar Pagamento" : "Novo Pagamento" }}
          </v-card-title>

          <v-divider></v-divider>

          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <!-- Geração dinâmica dos campos -->
              <template v-for="field in fields" :key="field.model">
                <component
                  :is="field.component"
                  v-model="pagamento[field.model]"
                  :label="field.label"
                  :type="field.type || 'text'"
                  :items="field.items || []"
                  :prepend-icon="field.icon"
                  :rules="field.rules"
                  required
                  class="mb-4"
                ></component>
              </template>
            </v-form>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions class="d-flex justify-space-between">
            <v-btn color="primary" :disabled="!valid" @click="handleSubmit">
              {{ isEditing ? "Atualizar" : "Salvar" }}
            </v-btn>
            <v-btn color="grey darken-1" @click="handleCancel">Cancelar</v-btn>
          </v-card-actions>
        </v-card>

        <!-- Mensagem se não houver pagamento encontrado -->
        <v-card v-else elevation="3">
          <v-card-title class="text-h5">Nenhum Pagamento Encontrado</v-card-title>
          <v-card-text>{{ emptyMessage }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

const API_URL = "http://localhost:3000/pagamentos";

export default {
  props: ["id"],
  data() {
    return {
      pagamento: {
        idCliente: "",
        idCarro: "",
        dataPagamento: "",
        valor: "",
        formaPagamento: "",
      },
      valid: false,
      isEditing: false,
      fields: [
        {
          model: "idCliente",
          label: "ID do Cliente",
          icon: "mdi-account",
          component: "v-text-field",
          rules: [(v) => !!v || "ID do Cliente é obrigatório"],
        },
        {
          model: "idCarro",
          label: "ID do Carro",
          icon: "mdi-car",
          component: "v-text-field",
          rules: [(v) => !!v || "ID do Carro é obrigatório"],
        },
        {
          model: "dataPagamento",
          label: "Data do Pagamento",
          type: "date",
          icon: "mdi-calendar",
          component: "v-text-field",
          rules: [(v) => !!v || "Data do Pagamento é obrigatória"],
        },
        {
          model: "valor",
          label: "Valor",
          type: "number",
          icon: "mdi-currency-usd",
          component: "v-text-field",
          rules: [(v) => !!v || "Valor é obrigatório"],
        },
        {
          model: "formaPagamento",
          label: "Forma de Pagamento",
          icon: "mdi-credit-card-outline",
          component: "v-select",
          items: ["Cartão", "Boleto", "Transferência"],
          rules: [(v) => !!v || "Forma de Pagamento é obrigatória"],
        },
      ],
      emptyMessage: "Não há pagamentos cadastrados no momento.",
    };
  },
  created() {
    if (this.id) {
      this.isEditing = true;
      this.handleApiRequest("get", `${API_URL}/${this.id}`, (data) => {
        this.pagamento = data;
      }, "Erro ao buscar pagamento.");
    }
  },
  methods: {
    async handleApiRequest(method, url, onSuccess, errorMessage) {
      try {
        const response = await axios[method](url, this.pagamento);
        if (onSuccess) onSuccess(response.data);
      } catch (error) {
        console.error(errorMessage, error);
      }
    },
    handleSubmit() {
      const method = this.isEditing ? "put" : "post";
      const url = this.isEditing ? `${API_URL}/${this.id}` : API_URL;
      const successMessage = this.isEditing
        ? "Pagamento atualizado com sucesso!"
        : "Pagamento criado com sucesso!";

      this.handleApiRequest(
        method,
        url,
        () => {
          console.log(successMessage);
          this.$router.push("/pagamentos");
        },
        "Erro ao salvar pagamento."
      );
    },
    handleCancel() {
      this.$router.push("/pagamentos");
    },
  },
};
</script>

<style scoped>
.v-card {
  margin-top: 20px;
  border-radius: 10px;
  background-color: #f9f9f9;
}

.v-card-title {
  font-weight: bold;
  color: #3f51b5;
}

.v-btn {
  min-width: 150px;
}

.v-text-field {
  margin-bottom: 20px;
}
</style>

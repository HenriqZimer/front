<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card elevation="3">
          <v-card-title class="text-h5">{{
            isEditing ? "Editar Aluguel" : "Novo Aluguel"
          }}</v-card-title>

          <v-divider></v-divider>

          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <!-- Geração dinâmica dos campos do formulário -->
              <template v-for="field in fields" :key="field.model">
                <component
                  :is="field.component"
                  v-model="aluguel[field.model]"
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  props: ["id"],
  data() {
    return {
      aluguel: {
        idCarro: "",
        idUsuario: "",
        dataInicio: "",
        dataFim: "",
        valorTotal: 0,
        status: "em andamento",
      },
      valid: false,
      isEditing: false,
      fields: [
        {
          model: "idCarro",
          label: "ID do Carro",
          icon: "mdi-car",
          component: "v-text-field",
          rules: [(v) => !!v || "ID do Carro é obrigatório"],
        },
        {
          model: "idUsuario",
          label: "ID do Usuário",
          icon: "mdi-account",
          component: "v-text-field",
          rules: [(v) => !!v || "ID do Usuário é obrigatório"],
        },
        {
          model: "dataInicio",
          label: "Data de Início",
          icon: "mdi-calendar-start",
          type: "date",
          component: "v-text-field",
          rules: [(v) => !!v || "Data de Início é obrigatória"],
        },
        {
          model: "dataFim",
          label: "Data de Fim",
          icon: "mdi-calendar-end",
          type: "date",
          component: "v-text-field",
          rules: [(v) => !!v || "Data de Fim é obrigatória"],
        },
        {
          model: "valorTotal",
          label: "Valor Total",
          icon: "mdi-currency-usd",
          type: "number",
          component: "v-text-field",
          rules: [
            (v) => !!v || "Valor Total é obrigatório",
            (v) => v > 0 || "Valor deve ser maior que zero",
          ],
        },
        {
          model: "status",
          label: "Status",
          icon: "mdi-progress-check",
          component: "v-select",
          items: ["em andamento", "finalizado"],
          rules: [(v) => !!v || "Status é obrigatório"],
        },
      ],
    };
  },
  created() {
    if (this.id) {
      this.isEditing = true;
      this.handleApiRequest(
        "get",
        `http://localhost:3000/alugueis/${this.id}`,
        (data) => (this.aluguel = data),
        "Erro ao buscar aluguel."
      );
    }
  },
  methods: {
    async handleApiRequest(method, url, onSuccess, errorMessage) {
      try {
        const response = await axios[method](url, this.aluguel);
        if (onSuccess) onSuccess(response.data);
      } catch (error) {
        alert(errorMessage);
        console.error(error);
      }
    },
    async handleSubmit() {
      const form = this.$refs.form;
      const userId = localStorage.getItem("userId");

      if (!form.validate()) {
        alert("Formulário inválido. Preencha todos os campos corretamente.");
        return;
      }

      this.aluguel.idCliente = userId;
      const url = `http://localhost:3000/alugueis/${this.id || ""}`;
      const method = this.isEditing ? "put" : "post";
      const successMessage = this.isEditing
        ? "Aluguel atualizado com sucesso!"
        : "Aluguel criado com sucesso!";

      this.handleApiRequest(
        method,
        url,
        () => {
          alert(successMessage);
          this.$router.push("/alugueis");
        },
        "Erro ao salvar aluguel."
      );
    },
    handleCancel() {
      this.$router.push("/alugueis");
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
</style>

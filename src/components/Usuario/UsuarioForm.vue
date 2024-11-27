<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card elevation="3" class="pa-4 form-card">
          <v-card-title class="text-h5">{{
            isEditing ? "Editar Usuário" : "Novo Usuário"
          }}</v-card-title>

          <v-divider></v-divider>

          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <!-- Campos Dinâmicos -->
              <template v-for="field in fields" :key="field.model">
                <v-text-field
                  v-model="usuario[field.model]"
                  :label="field.label"
                  :type="field.type || 'text'"
                  :prepend-icon="field.icon"
                  :rules="field.rules"
                  required
                  class="mb-4"
                ></v-text-field>
              </template>
            </v-form>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions class="d-flex justify-space-between">
            <v-btn color="primary" :disabled="!valid" @click="handleSubmit">
              {{ isEditing ? "Atualizar" : "Salvar" }}
            </v-btn>
            <v-btn outlined color="grey" @click="handleCancel">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

const API_URL = "http://localhost:3000";
const AUTH_URL = `${API_URL}/auth/registrar`;

export default {
  props: ["id"],
  data() {
    return {
      usuario: {
        nome: "",
        cpf: "",
        cnh: "",
        endereco: "",
        telefone: "",
        email: "",
        senha: "",
      },
      valid: false,
      isEditing: false,
      fields: [
        {
          model: "nome",
          label: "Nome",
          icon: "mdi-account",
          rules: [(v) => !!v || "O campo é obrigatório"],
        },
        {
          model: "cpf",
          label: "CPF",
          icon: "mdi-card-account-details",
          rules: [(v) => !!v || "O campo é obrigatório"],
        },
        {
          model: "cnh",
          label: "CNH",
          icon: "mdi-car",
          rules: [(v) => !!v || "O campo é obrigatório"],
        },
        {
          model: "endereco",
          label: "Endereço",
          icon: "mdi-home",
          rules: [(v) => !!v || "O campo é obrigatório"],
        },
        {
          model: "telefone",
          label: "Telefone",
          icon: "mdi-phone",
          rules: [(v) => !!v || "O campo é obrigatório"],
        },
        {
          model: "email",
          label: "Email",
          type: "email",
          icon: "mdi-email",
          rules: [
            (v) => !!v || "O campo é obrigatório",
            (v) => /.+@.+\..+/.test(v) || "E-mail inválido",
          ],
        },
        {
          model: "senha",
          label: "Senha",
          type: "password",
          icon: "mdi-lock",
          rules: [(v) => !!v || "O campo é obrigatório"],
        },
      ],
    };
  },
  created() {
    if (this.id) {
      this.isEditing = true;
      this.handleApiRequest(
        "get",
        `${API_URL}/usuarios/${this.id}`,
        (data) => {
          this.usuario = data;
        },
        "Erro ao buscar usuário."
      );
    }
  },
  methods: {
    async handleApiRequest(method, url, onSuccess, errorMessage) {
      try {
        const response = await axios[method](url, this.usuario);
        if (onSuccess) onSuccess(response.data);
      } catch (error) {
        console.error(errorMessage, error);
      }
    },
    handleSubmit() {
      const url = this.isEditing
        ? `${API_URL}/usuarios/${this.id}`
        : AUTH_URL;
      const method = this.isEditing ? "put" : "post";
      const successMessage = this.isEditing
        ? "Usuário atualizado com sucesso!"
        : "Usuário criado com sucesso!";

      this.handleApiRequest(
        method,
        url,
        () => {
          console.log(successMessage);
          this.$router.push("/usuarios");
        },
        "Erro ao salvar usuário."
      );
    },
    handleCancel() {
      this.$router.push("/usuarios");
    },
  },
};
</script>

<style scoped>
.fill-height {
  min-height: 90vh; /* Ocupa 90% da altura da viewport */
}

.form-card {
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.v-card-title {
  font-weight: bold;
  color: #3f51b5;
}

.v-text-field {
  margin-bottom: 16px;
}

.v-btn {
  min-width: 120px;
}

.v-btn.outlined {
  border: 1px solid #bdbdbd;
}
</style>

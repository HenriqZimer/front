<template>
  <v-container fluid fill-height>
    <v-row align="center" justify="center" class="fill-height">
      <v-col cols="12" md="4">
        <v-card class="elevation-12" outlined>
          <v-card-title class="text-center text-h5">Login</v-card-title>

          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="email"
                label="E-mail"
                type="email"
                required
                :rules="validationRules.email"
              ></v-text-field>

              <v-text-field
                v-model="senha"
                label="Senha"
                type="password"
                required
                :rules="validationRules.senha"
              ></v-text-field>

              <!-- Mensagem de erro -->
              <v-alert v-if="loginError" type="error" dense outlined>
                {{ loginErrorMessage }}
              </v-alert>
            </v-form>
          </v-card-text>

          <v-card-actions class="justify-center">
            <v-btn color="primary" :disabled="!valid" @click="handleSubmit">
              Entrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

const API_URL = "http://localhost:3000/auth/login"; // URL centralizada para o endpoint

export default {
  data() {
    return {
      email: "",
      senha: "",
      valid: false,
      loginError: false,
      loginErrorMessage: "",
      validationRules: {
        email: [
          (v) => !!v || "E-mail é obrigatório",
          (v) => /.+@.+\..+/.test(v) || "E-mail inválido",
        ],
        senha: [(v) => !!v || "Senha é obrigatória"],
      },
    };
  },
  methods: {
    async handleSubmit() {
      if (!this.valid) return;

      try {
        this.loginError = false;
        const response = await axios.post(API_URL, {
          email: this.email,
          senha: this.senha,
        });
        this.handleSuccess(response.data);
      } catch (error) {
        this.handleError(error);
      }
    },
    handleSuccess(data) {
      localStorage.setItem("token", data.access_token);
      this.$router.push("/"); // Redireciona após login
    },
    handleError(error) {
      this.loginError = true;
      this.loginErrorMessage = "Credenciais inválidas. Tente novamente.";
      console.error("Erro ao realizar login:", error);
    },
  },
};
</script>

<style scoped>
.v-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
}

.v-card {
  padding: 20px;
}

.v-btn {
  width: 100%;
}

.v-card-title {
  font-weight: bold;
  margin-bottom: 20px;
}

.v-alert {
  margin-top: 10px;
}
</style>

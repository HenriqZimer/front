<template>
  <v-container fluid fill-height>
    <v-row
      align="center"
      justify="center"
      class="fill-height"
    >
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
                :rules="[emailRules]"
              ></v-text-field>

              <v-text-field
                v-model="senha"
                label="Senha"
                type="password"
                required
                :rules="[(v) => !!v || 'Senha é obrigatória']"
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

export default {
  data() {
    return {
      email: "",
      senha: "",
      valid: false,
      loginError: false, // Controle de exibição de erro
      loginErrorMessage: "",
      emailRules: [
        (v) => !!v || "E-mail é obrigatório",
        (v) => /.+@.+\..+/.test(v) || "E-mail inválido",
      ],
    };
  },
  methods: {
    async handleSubmit() {
      try {
        this.loginError = false;
        const response = await axios.post("http://localhost:3000/auth/login", {
          email: this.email,
          senha: this.senha,
        });
        localStorage.setItem("token", response.data.access_token); // Salva o token
        this.$router.push("/"); // Redireciona após o login
      } catch (error) {
        this.loginError = true;
        this.loginErrorMessage = "Credenciais inválidas. Tente novamente.";
        console.error("Erro ao realizar login:", error);
      }
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

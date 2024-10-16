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
              <!-- ID do Carro -->
              <v-text-field
                v-model="aluguel.idCarro"
                label="ID do Carro"
                required
                prepend-icon="mdi-car"
                :rules="[(v) => !!v || 'ID do Carro é obrigatório']"
              ></v-text-field>

              <!-- ID do Usuário -->
              <v-text-field
                v-model="aluguel.idUsuario"
                label="ID do Usuário"
                required
                prepend-icon="mdi-account"
                :rules="[(v) => !!v || 'ID do Usuário é obrigatório']"
              ></v-text-field>

              <!-- Data de Início -->
              <v-text-field
                v-model="aluguel.dataInicio"
                label="Data de Início"
                type="date"
                required
                prepend-icon="mdi-calendar-start"
                :rules="[(v) => !!v || 'Data de Início é obrigatória']"
              ></v-text-field>

              <!-- Data de Fim -->
              <v-text-field
                v-model="aluguel.dataFim"
                label="Data de Fim"
                type="date"
                required
                prepend-icon="mdi-calendar-end"
                :rules="[(v) => !!v || 'Data de Fim é obrigatória']"
              ></v-text-field>

              <!-- Valor Total -->
              <v-text-field
                v-model="aluguel.valorTotal"
                label="Valor Total"
                type="number"
                required
                prepend-icon="mdi-currency-usd"
                :rules="[
                  (v) =>
                    v > 0 ||
                    'Valor Total é obrigatório e deve ser maior que zero',
                ]"
              ></v-text-field>

              <!-- Status -->
              <v-select
                v-model="aluguel.status"
                :items="['em andamento', 'finalizado']"
                label="Status"
                required
                prepend-icon="mdi-progress-check"
                :rules="[(v) => !!v || 'Status é obrigatório']"
              ></v-select>
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
        idCarro: "", // Novo campo para ID do Carro
        idUsuario: "", // Campo para o ID do usuário
        dataInicio: "",
        dataFim: "",
        valorTotal: 0,
        status: "em andamento",
      },
      valid: false, // Validação do formulário
      isEditing: false, // Define se é um formulário de edição ou criação
    };
  },
  created() {
    if (this.id) {
      this.isEditing = true;
      this.fetchAluguel();
    }
  },
  methods: {
    async fetchAluguel() {
      try {
        const response = await axios.get(
          `http://localhost:3000/alugueis/${this.id}`
        );
        this.aluguel = response.data;
      } catch (error) {
        console.error("Erro ao buscar aluguel:", error);
      }
    },
    async handleSubmit() {
      const form = this.$refs.form;

      if (form.validate()) {
        try {
          // Atualize com o ID real do usuário logado
          this.aluguel.idCliente = localStorage.getItem("userId"); // Exemplo de recuperação do ID do usuário logado

          if (this.isEditing) {
            await axios.put(
              `http://localhost:3000/alugueis/${this.id}`,
              this.aluguel
            );
            console.log("Aluguel atualizado com sucesso!");
          } else {
            await axios.post("http://localhost:3000/alugueis", this.aluguel);
            console.log("Aluguel criado com sucesso!");
          }
          this.$router.push("/alugueis");
        } catch (error) {
          console.error("Erro ao salvar aluguel:", error);
        }
      } else {
        console.log("Formulário inválido");
      }
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

.v-text-field {
  margin-bottom: 20px;
}
</style>

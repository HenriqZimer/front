<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card elevation="3">
          <v-card-title class="text-h5">{{ isEditing ? 'Editar Carro' : 'Novo Carro' }}</v-card-title>

          <v-divider></v-divider>

          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <!-- Geração dinâmica dos campos do formulário -->
              <template v-for="field in fields" :key="field.model">
                <v-text-field
                  v-model="carro[field.model]"
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
              {{ isEditing ? 'Atualizar' : 'Salvar' }}
            </v-btn>
            <v-btn color="grey darken-1" @click="handleCancel">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  props: ['id'],
  data() {
    return {
      carro: {
        modelo: '',
        marca: '',
        ano: '',
        placa: '',
        cor: '',
        status: 'disponivel',
        precoPorDia: ''
      },
      valid: false,
      isEditing: false,
      fields: [
        {
          model: 'modelo',
          label: 'Modelo',
          icon: 'mdi-car-info',
          rules: [(v) => !!v || 'Modelo é obrigatório']
        },
        {
          model: 'marca',
          label: 'Marca',
          icon: 'mdi-factory',
          rules: [(v) => !!v || 'Marca é obrigatória']
        },
        {
          model: 'ano',
          label: 'Ano',
          type: 'number',
          icon: 'mdi-calendar',
          rules: [
            (v) => !!v || 'Ano é obrigatório',
            (v) => v > 0 || 'Ano deve ser maior que zero'
          ]
        },
        {
          model: 'placa',
          label: 'Placa',
          icon: 'mdi-license',
          rules: [(v) => !!v || 'Placa é obrigatória']
        },
        {
          model: 'cor',
          label: 'Cor',
          icon: 'mdi-palette',
          rules: [(v) => !!v || 'Cor é obrigatória']
        },
        {
          model: 'precoPorDia',
          label: 'Preço por Dia',
          type: 'number',
          icon: 'mdi-currency-usd',
          rules: [
            (v) => !!v || 'Preço por Dia é obrigatório',
            (v) => v > 0 || 'Preço por Dia deve ser maior que zero'
          ]
        }
      ]
    };
  },
  created() {
    if (this.id) {
      this.isEditing = true;
      this.handleApiRequest(
        'get',
        `http://localhost:3000/carros/${this.id}`,
        (data) => (this.carro = data),
        'Erro ao buscar carro'
      );
    }
  },
  methods: {
    async handleApiRequest(method, url, onSuccess, errorMessage) {
      try {
        const response = await axios[method](url, this.carro);
        if (onSuccess) onSuccess(response.data);
      } catch (error) {
        console.error(errorMessage, error);
      }
    },
    async handleSubmit() {
      const form = this.$refs.form;

      if (!form.validate()) {
        console.log('Formulário inválido');
        return;
      }

      const url = this.isEditing
        ? `http://localhost:3000/carros/${this.id}`
        : 'http://localhost:3000/carros';
      const method = this.isEditing ? 'put' : 'post';
      const successMessage = this.isEditing
        ? 'Carro atualizado com sucesso!'
        : 'Carro criado com sucesso!';

      this.handleApiRequest(
        method,
        url,
        () => {
          console.log(successMessage);
          this.$router.push('/carros');
        },
        'Erro ao salvar carro'
      );
    },
    handleCancel() {
      this.$router.push('/carros');
    }
  }
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

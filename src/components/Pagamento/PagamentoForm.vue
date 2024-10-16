<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card v-if="pagamento || !isEditing" elevation="3">
          <v-card-title class="text-h5">{{ isEditing ? 'Editar Pagamento' : 'Novo Pagamento' }}</v-card-title>

          <v-divider></v-divider>

          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <!-- ID do Cliente -->
              <v-text-field
                v-model="pagamento.idCliente"
                label="ID do Cliente"
                required
                prepend-icon="mdi-account"
                :rules="[v => !!v || 'ID do Cliente é obrigatório']"
              ></v-text-field>

              <!-- ID do Carro -->
              <v-text-field
                v-model="pagamento.idCarro"
                label="ID do Carro"
                required
                prepend-icon="mdi-car"
                :rules="[v => !!v || 'ID do Carro é obrigatório']"
              ></v-text-field>

              <!-- Data do Pagamento -->
              <v-text-field
                v-model="pagamento.dataPagamento"
                label="Data do Pagamento"
                type="date"
                required
                prepend-icon="mdi-calendar"
                :rules="[v => !!v || 'Data do Pagamento é obrigatória']"
              ></v-text-field>

              <!-- Valor -->
              <v-text-field
                v-model="pagamento.valor"
                label="Valor"
                type="number"
                required
                prepend-icon="mdi-currency-usd"
                :rules="[v => !!v || 'Valor é obrigatório']"
              ></v-text-field>

              <!-- Forma de Pagamento -->
              <v-select
                v-model="pagamento.formaPagamento"
                :items="['Cartão', 'Boleto', 'Transferência']"
                label="Forma de Pagamento"
                required
                prepend-icon="mdi-credit-card-outline"
                :rules="[v => !!v || 'Forma de Pagamento é obrigatória']"
              ></v-select>
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

        <!-- Mensagem se não houver pagamento encontrado ou se for um novo pagamento -->
        <v-card v-else elevation="3">
          <v-card-title class="text-h5">Nenhum Pagamento Encontrado</v-card-title>
          <v-card-text>Não há pagamentos cadastrados no momento.</v-card-text>
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
      pagamento: {
        idCliente: '',
        idCarro: '',
        dataPagamento: '',
        valor: '',
        formaPagamento: ''
      },
      valid: false,
      isEditing: false
    };
  },
  created() {
    if (this.id) {
      this.isEditing = true;
      this.fetchPagamento();
    }
  },
  methods: {
    async fetchPagamento() {
      try {
        const response = await axios.get(`http://localhost:3000/pagamentos/${this.id}`);
        this.pagamento = response.data;
      } catch (error) {
        console.error('Erro ao buscar pagamento:', error);
      }
    },
    async handleSubmit() {
      try {
        if (this.isEditing) {
          await axios.put(`http://localhost:3000/pagamentos/${this.id}`, this.pagamento);
        } else {
          await axios.post('http://localhost:3000/pagamentos', this.pagamento);
        }
        this.$router.push('/pagamentos');
      } catch (error) {
        console.error('Erro ao salvar pagamento:', error);
      }
    },
    handleCancel() {
      this.$router.push('/pagamentos');
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

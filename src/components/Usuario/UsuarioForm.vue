<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card elevation="3">
          <v-card-title class="text-h5">{{ isEditing ? 'Editar Usuário' : 'Novo Usuário' }}</v-card-title>

          <v-divider></v-divider>

          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field 
                v-model="usuario.nome" 
                label="Nome" 
                required 
                prepend-icon="mdi-account"
                :rules="[v => !!v || 'O campo é obrigatório']"
              ></v-text-field>

              <v-text-field 
                v-model="usuario.cpf" 
                label="CPF" 
                required 
                prepend-icon="mdi-card-account-details"
                :rules="[v => !!v || 'O campo é obrigatório']"
              ></v-text-field>

              <v-text-field 
                v-model="usuario.cnh" 
                label="CNH" 
                required 
                prepend-icon="mdi-car"
                :rules="[v => !!v || 'O campo é obrigatório']"
              ></v-text-field>

              <v-text-field 
                v-model="usuario.endereco" 
                label="Endereço" 
                required 
                prepend-icon="mdi-home"
                :rules="[v => !!v || 'O campo é obrigatório']"
              ></v-text-field>

              <v-text-field 
                v-model="usuario.telefone" 
                label="Telefone" 
                required 
                prepend-icon="mdi-phone"
                :rules="[v => !!v || 'O campo é obrigatório']"
              ></v-text-field>

              <v-text-field 
                v-model="usuario.email" 
                label="Email" 
                required 
                prepend-icon="mdi-email"
                type="email"
                :rules="[v => !!v || 'O campo é obrigatório', v => /.+@.+\..+/.test(v) || 'E-mail inválido']"
              ></v-text-field>

              <v-text-field 
                v-model="usuario.senha" 
                label="Senha" 
                required 
                prepend-icon="mdi-lock"
                type="password"
                :rules="[v => !!v || 'O campo é obrigatório']"
              ></v-text-field>
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
      usuario: {
        nome: '',
        cpf: '',
        cnh: '',
        endereco: '',
        telefone: '',
        email: '',
        senha: ''
      },
      valid: false,
      isEditing: false
    };
  },
  created() {
    if (this.id) {
      this.isEditing = true;
      this.fetchUsuario();
    }
  },
  methods: {
    async fetchUsuario() {
      try {
        const response = await axios.get(`http://localhost:3000/usuarios/${this.id}`);
        this.usuario = response.data;
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
      }
    },
    async handleSubmit() {
      try {
        if (this.isEditing) {
          await axios.put(`http://localhost:3000/usuarios/${this.id}`, this.usuario);
          console.log('Usuário atualizado com sucesso!');
        } else {
          await axios.post('http://localhost:3000/auth/registrar', this.usuario);
          console.log('Usuário criado com sucesso!');
        }
        this.$router.push('/usuarios');
      } catch (error) {
        console.error('Erro ao cadastrar o usuário:', error);
      }
    },
    handleCancel() {
      this.$router.push('/usuarios');
    }
  }
};
</script>

<style scoped>
.v-card {
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

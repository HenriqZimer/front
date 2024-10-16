<template>
  <div>
    <h2>Detalhes do Usuário</h2>
    <p><strong>Nome:</strong> {{ usuario.nome }}</p>
    <p><strong>CPF:</strong> {{ usuario.cpf }}</p>
    <p><strong>CNH:</strong> {{ usuario.cnh }}</p>
    <p><strong>Endereço:</strong> {{ usuario.endereco }}</p>
    <p><strong>Telefone:</strong> {{ usuario.telefone }}</p>
    <p><strong>Email:</strong> {{ usuario.email }}</p>
    <button @click="$router.push(`/usuarios/${usuario._id}/editar`)">Editar</button>
    <button @click="deleteUsuario()">Excluir</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['id'], // Certifica-se de que o 'id' do usuário é recebido como prop
  data() {
    return {
      usuario: {}
    };
  },
  created() {
    this.fetchUsuario();
  },
  methods: {
    async fetchUsuario() {
      try {
        const response = await axios.get(`http://localhost:3000/usuarios/${this.id}`); // Use a rota correta
        this.usuario = response.data;
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
      }
    },
    async deleteUsuario() {
      try {
        await axios.delete(`http://localhost:3000/usuarios/${this.id}`);
        this.$router.push('/usuarios');
      } catch (error) {
        console.error('Erro ao excluir usuário:', error);
      }
    }
  }
};
</script>

<template>
  <div>
    <h2>Detalhes do Aluguel</h2>
    <p><strong>Data de Início:</strong> {{ aluguel.dataInicio }}</p>
    <p><strong>Data de Fim:</strong> {{ aluguel.dataFim }}</p>
    <p><strong>Valor Total:</strong> R$ {{ aluguel.valorTotal }}</p>
    <p><strong>Status:</strong> {{ aluguel.status }}</p>
    <button @click="$router.push(`/alugueis/${aluguel._id}/editar`)">Editar</button>
    <button @click="deleteAluguel()">Excluir</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['id'],
  data() {
    return {
      aluguel: {}
    };
  },
  created() {
    this.fetchAluguel();
  },
  methods: {
    async fetchAluguel() {
      try {
        const response = await axios.get(`http://localhost:3000/alugueis/${this.id}`);
        this.aluguel = response.data;
      } catch (error) {
        console.error('Erro ao buscar aluguel:', error);
      }
    },
    async deleteAluguel() {
      try {
        await axios.delete(`http://localhost:3000/alugueis/${this.id}`);
        this.$router.push('/alugueis');
      } catch (error) {
        console.error('Erro ao excluir aluguel:', error);
      }
    }
  }
};
</script>

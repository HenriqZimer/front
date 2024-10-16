<template>
  <div>
    <h2>Detalhes do Carro</h2>
    <p><strong>Modelo:</strong> {{ carro.modelo }}</p>
    <p><strong>Marca:</strong> {{ carro.marca }}</p>
    <p><strong>Ano:</strong> {{ carro.ano }}</p>
    <p><strong>Placa:</strong> {{ carro.placa }}</p>
    <p><strong>Cor:</strong> {{ carro.cor }}</p>
    <p><strong>Status:</strong> {{ carro.status }}</p>
    <p><strong>Preço por Dia:</strong> R$ {{ carro.precoPorDia }}</p>
    <button @click="$router.push(`/carros/${carro._id}/editar`)">Editar</button>
    <button @click="deleteCarro()">Excluir</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['id'],
  data() {
    return {
      carro: {}
    };
  },
  created() {
    this.fetchCarro();
  },
  methods: {
    async fetchCarro() {
      try {
        const response = await axios.get(`http://localhost:3000/carros/${this.id}`);
        this.carro = response.data;
      } catch (error) {
        console.error('Erro ao buscar carro:', error);
      }
    },
    async deleteCarro() {
      try {
        await axios.delete(`http://localhost:3000/carros/${this.id}`);
        this.$router.push('/carros');
      } catch (error) {
        console.error('Erro ao excluir carro:', error);
      }
    }
  }
};
</script>

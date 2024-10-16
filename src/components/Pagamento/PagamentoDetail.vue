<template>
  <div>
    <h2>Detalhes do Pagamento</h2>
    <p><strong>ID Cliente:</strong> {{ pagamento.idCliente }}</p>
    <p><strong>ID Carro:</strong> {{ pagamento.idCarro }}</p>
    <p><strong>Data de Pagamento:</strong> {{ pagamento.dataPagamento }}</p>
    <p><strong>Valor:</strong> R$ {{ pagamento.valor }}</p>
    <p><strong>Forma de Pagamento:</strong> {{ pagamento.formaPagamento }}</p>
    <button @click="$router.push(`/pagamentos/${pagamento._id}/editar`)">Editar</button>
    <button @click="deletePagamento()">Excluir</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['id'],
  data() {
    return {
      pagamento: {}
    };
  },
  created() {
    this.fetchPagamento();
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
    async deletePagamento() {
      try {
        await axios.delete(`http://localhost:3000/pagamentos/${this.id}`);
        this.$router.push('/pagamentos');
      } catch (error) {
        console.error('Erro ao excluir pagamento:', error);
      }
    }
  }
};
</script>

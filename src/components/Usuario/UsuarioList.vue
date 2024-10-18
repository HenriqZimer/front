<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <!-- Verifica se há usuários na lista -->
        <v-card v-if="usuarios.length > 0" elevation="1" class="user-card">
          <v-card-title class="text-h6">Lista de Usuários</v-card-title>

          <v-divider></v-divider>

          <v-card-text>
            <v-list dense>
              <v-list-item
                v-for="usuario in usuarios"
                :key="usuario._id"
                class="user-list-item"
              >
                <v-row align="center" justify="space-between" class="pa-4">
                  <!-- Nome e email do usuário à esquerda -->
                  <v-col cols="9">
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ usuario.nome }}
                      </v-list-item-title>
                      <v-list-item-subtitle class="email-subtitle">
                        {{ usuario.email }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-col>

                  <!-- Botões de editar e excluir à direita -->
                  <v-col cols="3" class="d-flex justify-end">
                    <v-list-item-action>
                      <v-btn
                        icon
                        small
                        color="primary"
                        class="mr-2"
                        @click="$router.push(`/usuarios/${usuario._id}/editar`)"
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn
                        icon
                        small
                        color="red"
                        @click="deleteUsuario(usuario._id)"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-col>
                </v-row>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>

        <!-- Mensagem de "nenhum usuário encontrado" caso a lista esteja vazia -->
        <v-card v-else elevation="1" class="user-card">
          <v-card-title class="text-h6">Nenhum Usuário Encontrado</v-card-title>
          <v-card-text>Não há usuários cadastrados no momento.</v-card-text>
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
      usuarios: [],
    };
  },
  created() {
    this.fetchUsuarios();
  },
  methods: {
    async fetchUsuarios() {
      try {
        const response = await axios.get("http://localhost:3000/usuarios");
        this.usuarios = response.data;
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    },
    async deleteUsuario(id) {
      try {
        await axios.delete(`http://localhost:3000/usuarios/${id}`);
        this.fetchUsuarios(); // Atualiza a lista após exclusão
      } catch (error) {
        console.error("Erro ao excluir usuário:", error);
      }
    },
  },
};
</script>

<style scoped>
.user-link {
  text-decoration: none;
  color: #1e88e5;
  font-weight: 500;
  font-size: 16px;
}

/* Removendo o hover azul */
.user-link:hover {
  color: #1e88e5; /* Mantém a mesma cor, sem efeito de hover */
}

.email-subtitle {
  color: #9e9e9e;
  font-size: 14px;
  margin-top: 4px;
}

.user-list-item {
  padding: 10px 16px;
  border-radius: 8px;
  margin-bottom: 8px;
  background-color: #fafafa;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.user-list-item:hover {
  background-color: #e3f2fd;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08);
}

.v-btn {
  min-width: 32px;
  min-height: 32px;
  transition: transform 0.2s ease-in-out, background-color 0.2s;
}

.v-btn:hover {
  transform: scale(1.05);
}

.v-icon {
  color: #ffffff;
}

.v-card-title {
  font-weight: 500;
  color: #424242;
}

.v-card {
  border-radius: 12px;
  background-color: #ffffff;
}

.v-card-text {
  padding-top: 0;
}

.user-card {
  margin-bottom: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.v-divider {
  margin: 8px 0;
}

.mr-2 {
  margin-right: 8px;
}
</style>

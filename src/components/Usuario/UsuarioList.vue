<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <!-- Card de Usuários -->
        <v-card
          v-if="usuarios.length > 0"
          elevation="1"
          class="user-card"
        >
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
                  <!-- Informações do usuário -->
                  <v-col cols="9">
                    <v-list-item-content>
                      <v-list-item-title>{{ usuario.nome }}</v-list-item-title>
                      <v-list-item-subtitle class="email-subtitle">
                        {{ usuario.email }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-col>

                  <!-- Botões de ação -->
                  <v-col cols="3" class="d-flex justify-end">
                    <v-list-item-action>
                      <template v-for="action in actions" :key="action.name">
                        <v-btn
                          :icon="true"
                          :small="true"
                          :color="action.color"
                          :aria-label="action.name"
                          @click="action.handler(usuario._id)"
                        >
                          <v-icon>{{ action.icon }}</v-icon>
                        </v-btn>
                      </template>
                    </v-list-item-action>
                  </v-col>
                </v-row>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>

        <!-- Mensagem se não houver usuários -->
        <v-card v-else elevation="1" class="user-card">
          <v-card-title class="text-h6">Nenhum Usuário Encontrado</v-card-title>
          <v-card-text>{{ emptyMessage }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

const API_URL = "http://localhost:3000/usuarios";

export default {
  data() {
    return {
      usuarios: [],
      actions: [
        {
          name: "edit",
          icon: "mdi-pencil",
          color: "primary",
          handler: (id) => this.editUsuario(id),
        },
        {
          name: "delete",
          icon: "mdi-delete",
          color: "red",
          handler: (id) => this.deleteUsuario(id),
        },
      ],
      emptyMessage: "Não há usuários cadastrados no momento.",
    };
  },
  created() {
    this.fetchUsuarios();
  },
  methods: {
    async handleApiRequest(method, url, onSuccess, errorMessage) {
      try {
        const response = await axios[method](url);
        if (onSuccess) onSuccess(response.data);
      } catch (error) {
        console.error(errorMessage, error);
      }
    },
    fetchUsuarios() {
      this.handleApiRequest(
        "get",
        API_URL,
        (data) => (this.usuarios = data),
        "Erro ao buscar usuários"
      );
    },
    deleteUsuario(id) {
      this.handleApiRequest(
        "delete",
        `${API_URL}/${id}`,
        () => this.fetchUsuarios(),
        "Erro ao excluir usuário"
      );
    },
    editUsuario(id) {
      this.$router.push(`/usuarios/${id}/editar`);
    },
  },
};
</script>

<style scoped>
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

.email-subtitle {
  color: #9e9e9e;
  font-size: 14px;
  margin-top: 4px;
}

.v-btn {
  min-width: 32px;
  min-height: 32px;
  transition: transform 0.2s ease-in-out, background-color 0.2s;
}

.v-btn:hover {
  transform: scale(1.05);
}

.v-card-title {
  font-weight: 500;
  color: #424242;
}

.v-card {
  border-radius: 12px;
  background-color: #ffffff;
}

.user-card {
  margin-bottom: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>

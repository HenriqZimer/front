<template>
  <v-app-bar app :color="themeColor" :dark="isDark" elevate-on-scroll flat>
    <v-container>
      <v-row align="center" justify="space-between">
        <!-- Botão Home -->
        <v-col cols="2">
          <v-btn text to="/" class="nav-btn">
            <v-icon left>mdi-home</v-icon>
            Home
          </v-btn>
        </v-col>

        <!-- Botões de navegação dinâmicos -->
        <v-col cols="10">
          <v-row align="center" justify="end" class="no-gutters">
            <template v-for="link in links" :key="link.text">
              <v-btn :to="link.to" text class="nav-btn">
                <v-icon left>{{ link.icon }}</v-icon>
                {{ link.text }}
              </v-btn>
            </template>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppBar",
  data() {
    return {
      isDark: false, // Controle do tema
      themeColor: "white", // Cor do AppBar
      links: [
        { to: "/usuarios", text: "Usuários", icon: "mdi-account" },
        { to: "/carros", text: "Carros", icon: "mdi-car" },
        { to: "/alugueis", text: "Aluguéis", icon: "mdi-file-document" },
        { to: "/pagamentos", text: "Pagamentos", icon: "mdi-cash" },
      ],
    };
  },
};
</script>

<style scoped>
.nav-btn {
  margin: 0 4px;
  text-transform: none;
  font-weight: 400;
  font-size: 14px;
  color: #333333;
}

.v-btn {
  padding: 0 6px;
}

.v-icon {
  margin-right: 4px;
  font-size: 18px;
}

.v-app-bar {
  box-shadow: none;
  border-bottom: 1px solid #e0e0e0;
}

.v-row.no-gutters {
  margin-left: 0;
  margin-right: 0;
}

.v-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>

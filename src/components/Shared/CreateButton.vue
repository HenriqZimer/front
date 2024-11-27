<template>
  <v-btn
    icon
    color="primary"
    class="add-btn"
    @click="$emit('click')"
  >
    <v-icon>mdi-plus</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "CreateButton",
};
</script>

<style scoped>
.add-btn {
  background-color: #1976d2;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.add-btn:hover {
  background-color: #1565c0;
}

.v-icon {
  color: #ffffff;
}
</style>

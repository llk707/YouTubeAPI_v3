<template>
  <div class="error-message">
    {{ message }}
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    message: string;
  }>();
</script>

<style scoped lang="scss">
  .error-message {
    padding: 15px;
    background: #ffebee;
    color: #b71c1c;
    border-radius: 4px;
    margin: 20px 0;
  }
</style>

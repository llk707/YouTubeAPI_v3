<template>
  <header>
    <nav>
      <RouterLink to="/">Главная</RouterLink>
      <RouterLink to="/favorites"> Избранное ({{ store.favorites.length }}) </RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router';
  import { useVideoStore } from '@/store/videoStore';
  import { onMounted } from 'vue';

  const store = useVideoStore();

  onMounted(() => {
    store.loadFavorites();
  });
</script>

<style scoped lang="scss">
  header {
    padding: 20px;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 1000;

    nav {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      gap: 20px;
    }
  }

  a {
    text-decoration: none;
    color: #2c3e50;
    padding: 8px 16px;
    border-radius: 4px;
    transition: all 0.3s;

    &:hover {
      background: #f0f0f0;
    }

    &.router-link-active {
      background: #ee2213;
      color: white;
    }
  }
</style>


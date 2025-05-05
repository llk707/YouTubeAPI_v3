<template>
  <div class="container">
    <h1>Избранное</h1>

    <div
      v-if="store.favorites.length"
      class="video-grid"
    >
      <VideoCard
        v-for="video in store.favorites"
        :key="video.id"
        :video="video"
      />
    </div>

    <div
      v-else
      class="empty"
    >
      В избранном пока ничего нет
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useVideoStore } from '@/store/videoStore';
  import VideoCard from '@/components/VideoCard.vue';

  const store = useVideoStore();
</script>

<style scoped lang="scss">
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  h1 {
    text-align: center;
    margin-bottom: 2rem;
    color: #2c3e50;
  }

  .video-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin: 20px 0;
  }

  .empty {
    text-align: center;
    padding: 40px;
    color: #666;
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    .video-grid {
      grid-template-columns: 1fr;
      gap: 15px;
    }

    .empty {
      padding: 20px;
      font-size: 1rem;
    }
  }
</style>

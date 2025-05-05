<template>
  <div class="container">
    <SearchBar />

    <div
      v-if="store.error"
      class="error-message"
    >
      {{ store.error }}
    </div>

    <div v-else>
      <div class="video-grid">
        <VideoCard
          v-for="video in store.videos"
          :key="video.id"
          :video="video"
        />
      </div>

      <div
        v-if="!store.videos.length && !store.loading"
        class="empty"
      >
        Видео не найдены
      </div>

      <button
        v-if="store.nextPageToken"
        @click="store.searchVideos(true)"
        class="load-more"
        :disabled="store.loading"
      >
        {{ store.loading ? 'Загрузка...' : 'Показать еще' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useVideoStore } from '@/store/videoStore';
  import SearchBar from '@/components/SearchBar.vue';
  import VideoCard from '@/components/VideoCard.vue';

  const store = useVideoStore();
</script>

<style scoped lang="scss">
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  .error-message {
    padding: 16px;
    background: #ffebee;
    color: #b71c1c;
    border-radius: 8px;
    margin: 20px 0;
    text-align: center;
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
  }

  .load-more {
    display: block;
    margin: 20px auto;
    padding: 12px 24px;
    background: #ee2213;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s;

    &:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    &:hover:not(:disabled) {
      background: #ee2213;
    }
  }
</style>


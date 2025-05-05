<template>
  <div class="search-container">
    <input
      v-model="store.searchQuery"
      @keyup.enter="store.searchVideos()"
      placeholder="Поиск видео..."
    />

    <div class="filters">
      <select v-model="store.filter.order">
        <option value="relevance">Релевантность</option>
        <option value="date">Дата</option>
        <option value="viewCount">Просмотры</option>
      </select>

      <select v-model="store.filter.duration">
        <option value="any">Любая длительность</option>
        <option value="short">Короткие</option>
        <option value="medium">Средние</option>
        <option value="long">Длинные</option>
      </select>
    </div>

    <button
      @click="store.searchVideos()"
      :disabled="store.loading"
    >
      {{ store.loading ? 'Поиск...' : 'Найти' }}
    </button>
  </div>
</template>

<script setup lang="ts">
  import { useVideoStore } from '@/store/videoStore';
  const store = useVideoStore();
</script>

<style scoped lang="scss">
  .search-container {
    display: flex;
    gap: 10px;
    margin-bottom: 2rem;
    flex-wrap: wrap;

    input {
      flex: 1;
      padding: 12px;
      border: 2px solid #ee2213;
      border-radius: 8px;
      font-size: 16px;
    }

    .filters {
      display: flex;
      gap: 10px;

      select {
        padding: 12px;
        border: 2px solid #ee2213;
        border-radius: 8px;
        background: white;
      }
    }

    button {
      padding: 12px 24px;
      background: #ee2213;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.3s;

      &:disabled {
        background: #cccccc;
        cursor: not-allowed;
      }

      &:hover:not(:disabled) {
        background: #ee2213;
      }
    }
  }

  @media (max-width: 768px) {
    .search-container {
      flex-direction: column;

      .filters {
        flex-direction: column;
      }
    }
  }
</style>


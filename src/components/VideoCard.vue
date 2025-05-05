<template>
  <article class="video-card">
    <div class="thumbnail-container">
      <img
        :src="video.thumbnail"
        :alt="video.title"
        class="thumbnail"
      />
      <span class="duration">{{ formatDuration(video.duration) }}</span>
    </div>

    <div class="content">
      <h3 class="title">{{ video.title }}</h3>
      <p class="channel">{{ video.channel }}</p>

      <div class="meta">
        <span class="views">{{ formatViews(video.views) }} просмотров</span>
        <button
          class="favorite-btn"
          @click="store.toggleFavorite(video)"
          :class="{ favorited: store.isFavorite(video) }"
        >
          {{ store.isFavorite(video) ? '❤️' : '🤍' }}
        </button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
  import { useVideoStore } from '@/store/videoStore';
  import { computed } from 'vue';

  const props = defineProps<{
    video: Video;
  }>();

  const store = useVideoStore();

  const formatViews = (views: string) => parseInt(views).toLocaleString('ru-RU');

  const formatDuration = (duration: string) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return '';

    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseInt(match[3]) || 0;

    return (
      [hours ? `${hours}ч` : '', minutes ? `${minutes}м` : '', seconds ? `${seconds}с` : '']
        .filter(Boolean)
        .join(' ') || '0м'
    );
  };
</script>

<style scoped lang="scss">
  .video-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.2s;

    &:hover {
      transform: translateY(-5px);
    }
  }

  .thumbnail-container {
    position: relative;
    aspect-ratio: 16/9;

    .thumbnail {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .duration {
      position: absolute;
      bottom: 8px;
      right: 8px;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.9rem;
    }
  }

  .content {
    padding: 16px;

    .title {
      font-size: 1.1rem;
      margin: 0 0 8px;
      line-height: 1.4;
    }

    .channel {
      color: #666;
      margin: 0 0 12px;
      font-size: 0.9rem;
    }

    .meta {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .views {
        color: #666;
        font-size: 0.9rem;
      }

      .favorite-btn {
        background: none;
        border: none;
        font-size: 1.4rem;
        cursor: pointer;
        padding: 4px;
        transition: transform 0.2s;

        &:hover {
          transform: scale(1.1);
        }

        &.favorited {
          color: #ff4081;
        }
      }
    }
  }

  @media (max-width: 480px) {
    .video-card {
      border-radius: 8px;
    }

    .content {
      padding: 12px;

      .title {
        font-size: 1rem;
      }
    }
  }
</style>

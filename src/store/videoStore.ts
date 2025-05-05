import { defineStore } from 'pinia';
import { youtubeApi, YouTubeError } from '@/services/youtubeApiV3';
import type { VideoDetails, VideoSearchParams } from '@/services/youtubeApiV3';

interface VideoState {
  searchQuery: string;
  videos: VideoDetails[];
  favorites: VideoDetails[];
  error: string;
  loading: boolean;
  nextPageToken: string;
  filter: {
    order: string;
    duration: string;
  };
}

export const useVideoStore = defineStore('video', {
  state: (): VideoState => ({
    searchQuery: '',
    videos: [],
    favorites: [],
    error: '',
    loading: false,
    nextPageToken: '',
    filter: {
      order: 'relevance',
      duration: 'any',
    },
  }),

  actions: {
    async searchVideos(loadMore = false) {
      try {
        this.loading = true;
        this.error = '';

        const params: VideoSearchParams = {
          q: this.searchQuery,
          maxResults: 9,
          order: this.filter.order,
          videoDuration: this.filter.duration !== 'any' ? this.filter.duration : undefined,
          pageToken: loadMore ? this.nextPageToken : undefined,
        };

        const searchData = await youtubeApi.searchVideos(params);
        const videoIds = searchData.items.map((item: any) => item.id.videoId);
        const videos = await youtubeApi.getVideoDetails(videoIds);

        this.videos = loadMore ? [...this.videos, ...videos] : videos;
        this.nextPageToken = searchData.nextPageToken || '';
      } catch (error) {
        this.handleError(error);
      } finally {
        this.loading = false;
      }
    },

    handleError(error: unknown) {
      if (error instanceof YouTubeError) {
        this.error = this.getErrorMessage(error);
      } else {
        this.error = 'error';
      }
    },

    getErrorMessage(error: YouTubeError) {
      const messages: Record<string, string> = {
        API_KEY_INVALID: 'Invalid YouTube API Key',
        quotaExceeded: 'API quota exceeded',
        dailyLimitExceeded: 'Daily limit exceeded',
      };

      return messages[error.reason || ''] || error.message;
    },

    toggleFavorite(video: VideoDetails) {
      try {
        const index = this.favorites.findIndex((f) => f.id === video.id);
        if (index === -1) {
          this.favorites.push(video);
        } else {
          this.favorites.splice(index, 1);
        }
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
      } catch (error) {
        this.error = 'Ошибка при сохранении в избранное';
      }
    },

    loadFavorites() {
      try {
        const saved = localStorage.getItem('favorites');
        if (saved) {
          this.favorites = JSON.parse(saved);
        }
      } catch (error) {
        this.error = 'Ошибка загрузки избранного';
        this.favorites = [];
        localStorage.removeItem('favorites');
      }
    },
  },

  getters: {
    isFavorite: (state) => (video: VideoDetails) => state.favorites.some((f) => f.id === video.id),
  },
});


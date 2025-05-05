import axios from 'axios';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export interface VideoSearchParams {
  q: string;
  maxResults: number;
  order: string;
  pageToken?: string;
  videoDuration?: string;
}

export interface VideoDetails {
  id: string;
  title: string;
  channel: string;
  thumbnail: string;
  views: string;
  duration: string;
}

export class YouTubeError extends Error {
  constructor(
    public code: number,
    message: string,
    public reason?: string
  ) {
    super(message);
    this.name = 'YouTubeError';
  }
}

export const youtubeApi = {
  async searchVideos(params: VideoSearchParams) {
    try {
      const response = await axios.get(`${BASE_URL}/search`, {
        params: {
          ...params,
          part: 'snippet',
          type: 'video',
          key: API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },

  async getVideoDetails(ids: string[]) {
    try {
      const response = await axios.get(`${BASE_URL}/videos`, {
        params: {
          part: 'snippet,statistics,contentDetails',
          id: ids.join(','),
          key: API_KEY,
        },
      });
      return response.data.items.map((item: any) => ({
        id: item.id,
        title: item.snippet.title,
        channel: item.snippet.channelTitle,
        thumbnail: item.snippet.thumbnails.medium.url,
        views: item.statistics.viewCount,
        duration: item.contentDetails.duration,
      }));
    } catch (error) {
      this.handleError(error);
    }
  },

  handleError(error: any) {
    if (error.response) {
      const { status, data } = error.response;
      throw new YouTubeError(status, data.error?.message, data.error?.errors?.[0]?.reason);
    }
    throw new YouTubeError(500, 'error');
  },
};

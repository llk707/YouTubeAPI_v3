/// <reference types='vite/client' />

interface ImportMetaEnv {
    readonly VITE_YOUTUBE_API_KEY: string
    readonly VITE_API_URL: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
  
  // Для поддержки импорта .vue-файлов
  declare module '*.vue' {
    import { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
  }
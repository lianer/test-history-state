declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_API_SERVER: string;
      REACT_APP_IMAGE_SERVER: string;
    }
  }
}

export type FetchResult<T> = Awaited<ReturnType<T>>;

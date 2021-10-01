import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { APP_ID_HEADER_NAME, AUTH_HEADER_NAME } from '../headers'
import { baseApiURL } from '../urls'

export interface AxiosClientConfig extends AxiosRequestConfig {
  readonly appId?: string
  readonly accessToken?: string
  readonly onUploadProgress?: (progress: number) => any
  readonly onDownloadProgress?: (progress: number) => any
}

export function axiosClient({
  appId,
  accessToken,
  onDownloadProgress,
  onUploadProgress,
  ...dataConfig
}: AxiosClientConfig): AxiosInstance {
  const api = axios.create({
    baseURL: baseApiURL,
    headers: {
      'Content-Type': 'application/json'
    },
    ...(dataConfig || {})
  })

  api.interceptors.request.use((config) => {
    if (onDownloadProgress) {
      config.onDownloadProgress = (progressEvent) => {
        progressEvent?.srcElement?.getResponseHeader('content-length')
        const total = parseFloat(progressEvent.total)
        const current = parseFloat(progressEvent.loaded)
        let percentCompleted = Math.floor((current / total) * 100)
        onDownloadProgress(percentCompleted)
      }
    }
    if (onUploadProgress) {
      config.onUploadProgress = (progressEvent) => {
        const total = parseFloat(progressEvent.total)
        const current = parseFloat(progressEvent.loaded)
        let percentCompleted = Math.floor((current / total) * 100)
        onUploadProgress(percentCompleted)
      }
    }
    return config
  })

  if (accessToken) {
    api.defaults.headers[AUTH_HEADER_NAME] = `Bearer ${accessToken}`
  }
  if (appId) {
    api.defaults.headers[APP_ID_HEADER_NAME] = appId
  }

  return api
}

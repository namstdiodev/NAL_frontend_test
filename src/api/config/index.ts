// -----------------------------------------------------------------------------
// This file contains an instance of axios with a custom config (axiosClient)
// and an axiosFetch singleton to make http requests (axiosFetch)
// -----------------------------------------------------------------------------

import axios, { AxiosRequestConfig } from 'axios'
import { stringify } from 'qs'
// import Router from 'next/router'
// import StorageUtil, { STORAGE_KEY } from 'utils/storage'
import IServerResponse from './type'

/**
 * Create a new instance of axios with a custom config
 * use need to set(STORAGE.JWT)
 */
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
})

// axiosClient.interceptors.request.use(
//   function (config) {
//     const token = StorageUtil.get(STORAGE_KEY.JWT)
//     if (
//       typeof token !== 'undefined' &&
//       token &&
//       !config.url?.includes('X-Amz-Algorithm') // S3 one only one auth mechanism allowed; only the X-Amz-Algorithm
//     ) {
//       if (config.headers)
//         config.headers['Authorization'] = 'Bearer ' + encodeURIComponent(token)
//     }
//     return config
//   },
//   function (error) {
//     return Promise.reject(error)
//   }
// )
// axiosClient.interceptors.response.use(
//   function (response) {
//     return response
//   },
//   function (error) {
//     if (!error.config.headers['Authorization']) {
//       localStorage.clear()
//       Router.push('/login')
//     }
//     return Promise.reject(error)
//   }
// )

/**
 * Create a singleton for our base api
 */

class AxiosFetch {
  get<T>(uri: string, params = {}) {
    const queryString = stringify(params)
    const uriWithQuery = `${queryString ? uri + '?' : uri}${queryString}`
    return axiosClient.get<IServerResponse<T>>(uriWithQuery)
  }
  post(uri: string, body?: any) {
    return axiosClient.post(uri, body)
  }
  put(uri: string, body?: any, config?: AxiosRequestConfig) {
    return axiosClient.put(uri, body, config)
  }
  delete(uri: string, body?: any) {
    return axiosClient.delete(uri, body)
  }
  patch(uri: string, body?: any) {
    return axiosClient.patch(uri, body)
  }
}

const appAxios = new AxiosFetch()

export default appAxios

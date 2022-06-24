import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export default abstract class HttpService {
  protected http: AxiosInstance;

  constructor(protected baseURL: string, options: AxiosRequestConfig = {}) {
    this.http = axios.create({ baseURL, ...options });
  }
}

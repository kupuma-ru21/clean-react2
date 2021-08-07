import axios, { AxiosResponse } from 'axios';
import { HttpResponse, HttpClient, HttpRequest } from '@/data/procotols/http';

export class AxiosHttpClient implements HttpClient {
  async request(data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;
    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers,
      });
      return { statusCode: axiosResponse.status, body: axiosResponse.data };
    } catch (error) {
      axiosResponse = error.response;
    }
    return { statusCode: axiosResponse.status, body: axiosResponse.data };
  }
}

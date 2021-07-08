import axios, { AxiosResponse } from 'axios';
import {
  HttpGetParams,
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
} from '@/data/procotols/http';

export class AxiosHttpClient implements HttpPostClient {
  async post(params: HttpPostParams): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;
    try {
      axiosResponse = await axios.post(params.url, params.body);
      return { statusCode: axiosResponse.status, body: axiosResponse.data };
    } catch (error) {
      return { statusCode: error.response.status, body: error.response.data };
    }
  }

  async get(params: HttpGetParams): Promise<void> {
    await axios.get(params.url);
  }
}

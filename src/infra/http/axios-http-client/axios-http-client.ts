import axios, { AxiosResponse } from 'axios';
import {
  HttpGetClient,
  HttpGetParams,
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
} from '@/data/procotols/http';

export class AxiosHttpClient implements HttpPostClient, HttpGetClient {
  async post(params: HttpPostParams): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;
    try {
      axiosResponse = await axios.post(params.url, params.body);
      return { statusCode: axiosResponse.status, body: axiosResponse.data };
    } catch (error) {
      return { statusCode: error.response.status, body: error.response.data };
    }
  }

  async get(params: HttpGetParams): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;
    try {
      axiosResponse = await axios.get(params.url);
      return { statusCode: axiosResponse.status, body: axiosResponse.data };
    } catch (error) {
      axiosResponse = error.response;
    }
    return { statusCode: axiosResponse.status, body: axiosResponse.data };
  }
}

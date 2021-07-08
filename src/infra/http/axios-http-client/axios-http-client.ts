import axios, { AxiosResponse } from 'axios';
import {
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
} from '@/data/procotols/http';

export class AxiosHttpClient implements HttpPostClient {
  async post(params: HttpPostParams): Promise<HttpResponse> {
    let httpResponse: AxiosResponse;
    try {
      httpResponse = await axios.post(params.url, params.body);
      return { statusCode: httpResponse.status, body: httpResponse.data };
    } catch (error) {
      return { statusCode: error.response.status, body: error.response.data };
    }
  }
}

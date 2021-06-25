import axios, { AxiosResponse } from 'axios';
import {
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
} from '@/data/procotols/http';

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post(params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    let httpResponse: AxiosResponse<any>;
    try {
      httpResponse = await axios.post(params.url, params.body);
      return { statusCode: httpResponse.status, body: httpResponse.data };
    } catch (error) {
      return { statusCode: error.response.status, body: error.response.data };
    }
  }
}

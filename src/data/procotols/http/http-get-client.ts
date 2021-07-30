import { HttpResponse } from './http-reponse';

export type HttpGetParams = { url: string; headers?: any };

export interface HttpGetClient<R = any> {
  get: (params: HttpGetParams) => Promise<HttpResponse<R>>;
}

import { GetStorage } from '@/data/procotols/cache';
import {
  HttpGetClient,
  HttpGetParams,
  HttpResponse,
} from '@/data/procotols/http';

export class AuthorizeHttpGetClientDecorator implements HttpGetClient {
  constructor(private readonly getStorage: GetStorage) {}
  async get(params: HttpGetParams): Promise<HttpResponse> {
    this.getStorage.get('account');
    return null;
  }
}

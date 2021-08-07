import { GetStorage } from '@/data/procotols/cache';
import { HttpClient, HttpRequest, HttpResponse } from '@/data/procotols/http';

export class AuthorizeHttpClientDecorator implements HttpClient {
  constructor(
    private readonly getStorage: GetStorage,
    private readonly httpClient: HttpClient
  ) {}

  async request(data: HttpRequest): Promise<HttpResponse> {
    const account = this.getStorage.get('account');
    if (account?.accessToken) {
      Object.assign(data, {
        headers: Object.assign(data.headers || {}, {
          'x-access-token': account.accessToken,
        }),
      });
    }

    const httpResponse = await this.httpClient.request(data);
    return httpResponse;
  }
}

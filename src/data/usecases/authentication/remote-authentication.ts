import { AuthenticationParams } from '@/domain/usecases/authentication';
import { HttpPostClient } from '@/data/procotols/http/http-post-client';

export class RemoteAuthentication {
  constructor(readonly url: string, readonly httpPostClient: HttpPostClient) {}
  async auth(params: AuthenticationParams): Promise<void> {
    await this.httpPostClient.post({ url: this.url, body: params });
  }
}

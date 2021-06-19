import { HttpPostClient } from '../../http/http-post-client';

export class RemoteAuthentication {
  constructor(readonly url: string, readonly httpPostClient: HttpPostClient) {}
  async auth(): Promise<void> {
    await this.httpPostClient.post(this.url);
  }
}

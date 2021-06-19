import { AuthenticationParams } from '@/domain/usecases/authentication';
import { InvaildCredentialsError } from '@/domain/errors/invalid-credentionals-error';
import { HttpPostClient } from '@/data/procotols/http/http-post-client';
import { HttpStatusCode } from '@/data/procotols/http/http-reponse';
import { UnexpectedError } from '@/domain/errors/unexpected-error';

export class RemoteAuthentication {
  constructor(readonly url: string, readonly httpPostClient: HttpPostClient) {}
  async auth(params: AuthenticationParams): Promise<void> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        break;
      case HttpStatusCode.unauthorized:
        throw new InvaildCredentialsError();
      default:
        throw new UnexpectedError();
    }
  }
}

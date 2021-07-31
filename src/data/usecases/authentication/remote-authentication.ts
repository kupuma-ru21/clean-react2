import { Authentication } from '@/domain/usecases';
import { InvaildCredentialsError, UnexpectedError } from '@/domain/errors';
import { HttpPostClient, HttpStatusCode } from '@/data/procotols/http';

export class RemoteAuthentication implements Authentication {
  constructor(
    readonly url: string,
    readonly httpPostClient: HttpPostClient<RemoteAuthentication.Model>
  ) {}

  async auth(
    params: Authentication.Params
  ): Promise<RemoteAuthentication.Model> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body;
      case HttpStatusCode.unauthorized:
        throw new InvaildCredentialsError();
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteAuthentication {
  export type Model = Authentication.Model;
}

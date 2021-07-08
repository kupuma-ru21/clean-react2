import { Authentication, AuthenticationParams } from '@/domain/usecases';
import { AccountModel } from '@/domain/models/';
import { InvaildCredentialsError, UnexpectedError } from '@/domain/errors';
import { HttpPostClient, HttpStatusCode } from '@/data/procotols/http';

export class RemoteAuthentication implements Authentication {
  constructor(
    readonly url: string,
    readonly httpPostClient: HttpPostClient<AccountModel>
  ) {}

  async auth(params: AuthenticationParams): Promise<AccountModel> {
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

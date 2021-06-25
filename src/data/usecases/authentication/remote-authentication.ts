import {
  Authentication,
  AuthenticationParams,
} from '@/domain/usecases/authentication';
import { AccountModel } from '@/domain/models/account-model';
import { InvaildCredentialsError, UnexpectedError } from '@/domain/errors';
import { HttpPostClient, HttpStatusCode } from '@/data/procotols/http';

export class RemoteAuthentication implements Authentication {
  constructor(
    readonly url: string,
    readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>
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

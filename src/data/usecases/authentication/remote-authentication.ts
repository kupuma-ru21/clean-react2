import {
  Authentication,
  AuthenticationParams,
} from '@/domain/usecases/authentication';
import { UnexpectedError } from '@/domain/errors/unexpected-error';
import { AccountModel } from '@/domain/models/account-model';
import { InvaildCredentialsError } from '@/domain/errors/invalid-credentionals-error';
import { HttpPostClient } from '@/data/procotols/http/http-post-client';
import { HttpStatusCode } from '@/data/procotols/http/http-reponse';

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

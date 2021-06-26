import { AddAccount, AddAccountParams } from '@/domain/usecases';
import { AccountModel } from '@/domain/models';
import { EmainInUseError, UnexpectedError } from '@/domain/errors';
import { HttpPostClient, HttpStatusCode } from '@/data/procotols/http';

export class RemoteAddAccount implements AddAccount {
  constructor(
    readonly url: string,
    readonly httpPostClient: HttpPostClient<AddAccountParams, AccountModel>
  ) {}

  async add(params: AddAccountParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return null;
      case HttpStatusCode.forbidden:
        throw new EmainInUseError();
      case HttpStatusCode.badRequest:
        throw new UnexpectedError();
    }
  }
}

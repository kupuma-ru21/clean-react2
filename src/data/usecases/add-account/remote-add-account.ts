import { AddAccount, AddAccountParams } from '@/domain/usecases';
import { AccountModel } from '@/domain/models';
import { HttpPostClient } from '@/data/procotols/http';

export class RemoteAddAccount implements AddAccount {
  constructor(
    readonly url: string,
    readonly httpPostClient: HttpPostClient<AddAccountParams, AccountModel>
  ) {}

  async add(params: AddAccountParams): Promise<AccountModel> {
    await this.httpPostClient.post({
      url: this.url,
      body: params,
    });
    return null;
  }
}

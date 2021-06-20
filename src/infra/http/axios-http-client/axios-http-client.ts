import { HttpPostParams } from '@/data/procotols/http';
import axios from 'axios';

export class AxiosHttpClient {
  async post(params: HttpPostParams<any>): Promise<void> {
    await axios(params.url);
  }
}

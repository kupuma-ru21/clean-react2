import { AccessDeniedError, UnexpectedError } from '@/domain/errors';
import { HttpClient, HttpStatusCode } from '@/data/procotols/http';
import { LoadSurveyList } from '@/domain/usecases/load-survey-list';

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteLoadSurveyList.Model[]>
  ) {}

  async loadAll(): Promise<LoadSurveyList.Model[]> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get',
    });
    const remoteSurveys = httpResponse.body || [];
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return remoteSurveys.map((remoteSurvey) => {
          return Object.assign(remoteSurvey, {
            date: new Date(remoteSurvey.date),
          });
        });

      case HttpStatusCode.forbidden:
        throw new AccessDeniedError();

      case HttpStatusCode.noContent:
        return [];

      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteLoadSurveyList {
  export type Model = {
    id: string;
    question: string;
    date: string;
    didAnswer: boolean;
  };
}

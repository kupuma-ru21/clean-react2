import { LoadSurveyList } from '@/domain/usecases';
import { RemoteLoadSurveyList } from '@/data/usecases/load-survey-lisit/remote-load-survey-list';
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory';
import { makeApiUrl } from '@/main/factories/http/api-url-factory';

export const makeRemoteLoadSurveyList = (): LoadSurveyList => {
  return new RemoteLoadSurveyList(
    makeApiUrl('/surveys'),
    makeAxiosHttpClient()
  );
};
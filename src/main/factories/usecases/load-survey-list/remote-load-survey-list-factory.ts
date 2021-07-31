import { LoadSurveyList } from '@/domain/usecases';
import { RemoteLoadSurveyList } from '@/data/usecases/load-survey-lisit/remote-load-survey-list';
import { makeApiUrl } from '@/main/factories/http';
import { makeAuthorizeHttpGetClientDecorator } from '@/main/factories/decorators';

export const makeRemoteLoadSurveyList = (): LoadSurveyList => {
  return new RemoteLoadSurveyList(
    makeApiUrl('/surveys'),
    makeAuthorizeHttpGetClientDecorator()
  );
};

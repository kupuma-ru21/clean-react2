import faker from 'faker';
import { HttpPostParams } from '@/data/procotols/http';

export const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
});

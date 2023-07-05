import { Configuration, OpenAIApi } from 'openai';
import CONFIG from '@lib/api/config';

const configuration = new Configuration({
  apiKey: CONFIG.OPENAI_API_KEY,
});

export const openai = new OpenAIApi(configuration);
export default openai;

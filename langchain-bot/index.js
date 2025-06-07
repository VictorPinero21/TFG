import 'dotenv/config';
import { ChatOpenAI } from '@langchain/openai';

const chatModel = new ChatOpenAI({
  temperature: 0.7,
  modelName: 'gpt-3.5-turbo', 
  maxTokens: 1000,
});

export async function askBot(prompt) {
  try {
    const response = await chatModel.call([
      { role: 'user', content: prompt }
    ]);
    return response.content;
  } catch (error) {
    console.error('Error en askBot:', error);
    throw error;
  }
}

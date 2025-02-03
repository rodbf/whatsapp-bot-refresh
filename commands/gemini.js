import { Command } from '../message-command.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

class Gemini extends Command {
  static description = 'GenAI da Google. Gera texto a partir de um prompt.';
  static help = 'Uso: !gemini <prompt>\nExemplo: !gemini "Escreva uma história sobre um dragão."';
  static model = 'gemini-1.5-flash-8b';

  async execute(messageContainer) {
    this.messageContainer = await super.execute(messageContainer);
    if (this.messageContainer === null) {
      return null;
    }

    const prompt = this.messageContainer.options.join(' ');
    if (!prompt) {
      this.reply('Por favor, forneça um prompt.');
      return null;
    }

    try {
      const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = ai.getGenerativeModel({model: Gemini.model});
      const result = await model.generateContent([prompt]);

      const response = result.response.text();
      if (!response) {
        throw new Error('Erro na API: resposta inválida');
      }
      this.reply(response);

    } catch (error) {
      console.error('Erro ao chamar a API do Gemini:', error);
      this.reply('Ocorreu um erro ao gerar o texto.');
    }
    return null;
  }
}

export default new Gemini();

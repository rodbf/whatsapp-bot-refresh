import { MessageMiddleware } from './message-middleware.js';

export class Command extends MessageMiddleware{
  static description = 'No description text provided.';
  static help = 'No help text provided.'; 

  async execute(messageContainer) {
    this.messageContainer = messageContainer;
    this.messageContainer.options = Command.getOptions(this.messageContainer.message.body);
    if(['help', 'ajuda'].includes(messageContainer.options?.[0]?.toLowerCase())){
      this.reply(this.getHelp());
      return null;
    }
    if(Math.random() < 0.05){
      this.reply('Você não manda em mim. Eu fiz porque me deu vontade.');
    }
    return this.messageContainer;
  }

  getDescription(){
    return this.constructor.description;
  }

  getHelp(){
    return this.constructor.help;
  }

  static getOptions(message) {
    return message
      .replace(/[“”]/g, '"')
      .match(/(?:[^\s"]+|"[^"]*")+/g)
      ?.slice(1)
      .map(option => option.replace(/"/g, '')) || [];
  }
}

import { Command } from '../message-command.js';

class GitHub extends Command {
  static description = "Retorna o repositório do projeto.";
  repoUrl = 'https://github.com/rodbf/whatsapp-bot-refresh';

  async execute(messageContainer) {
    this.messageContainer = await super.execute(messageContainer);
    if (this.messageContainer === null) {
      return null;
    }
    this.reply(this.repoUrl);
    return null;
  }
}

export default new GitHub();

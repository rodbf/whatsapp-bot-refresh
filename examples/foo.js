import { Command } from '../message-command.js';

class Foo extends Command {
  static accessLevel = 0;
  static description = "Foo!!";
  static help = "Foo? Foo!";

  async execute(messageContainer) {
    this.messageContainer = await super.execute(messageContainer);
    if (this.messageContainer === null) {
      return null;
    }
    this.reply('bar');
    return null;
  }
}

export default new Foo();

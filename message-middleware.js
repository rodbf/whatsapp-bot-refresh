export class MessageMiddleware {
  static accessLevel = 0;

  async execute(messageContainer) {
    this.messageContainer = messageContainer;
    return this.messageContainer;
  }

  reply(...args) {
    this.messageContainer.message.reply(...args);
  }

  react(reaction) {
    this.messageContainer.message.react(reaction);
  }

  getAccessLevel(){
    return this.constructor.accessLevel
  }
}

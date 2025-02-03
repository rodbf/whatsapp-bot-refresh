import { MessageMiddleware } from '../message-middleware.js';

class ExampleMiddleware extends MessageMiddleware {
  static accessLevel = 0;
  
  async execute(messageContainer) {
    this.messageContainer = messageContainer;
    if (messageContainer.message.body === '!foo') {
      this.reply('middleware');
    }
    return this.messageContainer;
  }
}

export default new ExampleMiddleware();

import { MessageMiddleware } from '../message-middleware.js';
import { normalize } from '../utils.js';

class AttitudeAdjustment extends MessageMiddleware {
  matches = [
    {
      find: ["nao consigo", "nao da", "nem consigo"],
      reply: ["Não com essa atitude.","Você consegue! Eu acredito em você!"]
    },
    {
      find: ["e impossivel", "nao e possivel"],
      reply: ["Com a atitude certa tudo é possível.","Não fala assim que você me deixa triste."]
    }
  ];

  async execute(messageContainer) {
    this.messageContainer = messageContainer;
    let message = normalize(messageContainer.message.body.toLowerCase());
    this.matches.forEach(match => {
      match.find.forEach(find => {
        if(message.includes(find)){
          this.reply(match.reply[Math.floor(Math.random() * match.reply.length)]);
        }
      });
    });
    return this.messageContainer;
  }
}

export default new AttitudeAdjustment();

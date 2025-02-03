import { MessageMiddleware } from '../message-middleware.js';
import { normalize } from '../utils.js';

class Reactions extends MessageMiddleware {
  reactions = [
    {match: 'good bot',         react: '❤️'},
    {match: 'bad bot',          react: '🖕'},
    {match: 'ro bot',           react: '🤖'},
    {match: 'naughty bot',      react: '😈'},
    {match: 'cool bot',         react: '😎'},
    {match: 'touche',           react: '😎'},
    {match: 'bom bot',          react: '❤️'},
    {match: 'bot ruim',         react: '🖕'},
    {match: 'asshole bot',      react: '🖕'},
    {match: 'covid',            react: '😷'},
    {match: 'covidei',          react: '😷'},
    {match: 'covidou',          react: '😷'},
    {match: ':d',               react: '😃'},
    {match: 'porra',            react: '🤬'},
    {match: 'sim senhor',       react: '🫡'},
    {match: 'sim senhora',      react: '🫡'},
    {match: 'confia',           react: '🤡'},
    {match: 'bora',             react: '👊'},
    {match: 'nunca faria isso', react: '👀'},
]

  async execute(messageContainer) {
    this.messageContainer = messageContainer;
    let message = normalize(messageContainer.message.body.toLowerCase());
    this.reactions.forEach(reaction => {
      if(message.includes(reaction.match)){
        this.react(reaction.react);
      }
    });
    return this.messageContainer;
  }
}

export default new Reactions();

import { MessageMiddleware } from './message-middleware.js';
import Database from 'better-sqlite3';

class AccessEvaluator extends MessageMiddleware {
  async execute(messageContainer) {
    if (!this.constructor.db) {
      this.constructor.initializeDatabase();
    }
    this.messageContainer = messageContainer;
    this.messageContainer.chatID = await this.getChatID();
    this.messageContainer.accessLevel = await this.getAccessLevel();
    this.messageContainer.forcedMiddlewareAccesses = this.getForcedMiddlewareAccesses();
    this.messageContainer.command = this.getCommand();
    this.messageContainer.hasForcedCommandAccess = this.hasForcedCommandAccess();
    return this.messageContainer;
  }
  
  static initializeDatabase() {
    this.db = new Database('./access_control.db');
  }

  getAccessLevel() {
    const chatID = this.messageContainer.chatID;
    const chatAccess = this.constructor.db.prepare(
      'SELECT access_level FROM chat_access_levels WHERE chat_id = ?'
    ).get(chatID);
    return chatAccess?.access_level || 0;
  }

  getForcedMiddlewareAccesses() {
    const chatID = this.messageContainer.chatID;
    const middlewareAccess = this.constructor.db.prepare(
      'SELECT middleware FROM chat_middleware_access WHERE chat_id = ?'
    ).all(chatID);
    return new Set(middlewareAccess.map(row => row.middleware));
  }

  hasForcedCommandAccess() {
    const chatID = this.messageContainer.chatID;
    const command = this.getCommand();
    const commandAccess = this.constructor.db.prepare(
      'SELECT 1 FROM chat_command_access WHERE chat_id = ? AND command = ?'
    ).get(chatID, command);
    return !!commandAccess;
  }

  getCommand() {
    const firstWord = this.messageContainer.message.body.split(' ')[0];
    if (firstWord.startsWith('!')) {
      return firstWord.substring(1);
    }
    return null;
  }

  async getSenderID() {
    const contact = await this.messageContainer.message.getContact();
    return contact.id._serialized;
  }

  async getChatID() {
    const chat = await this.messageContainer.message.getChat();
    return chat.id._serialized;
  }
}

export default new AccessEvaluator();

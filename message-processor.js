import { readdirSync } from 'fs';
import accessEvaluator from './access-evaluator.js';

//middlewares execute on every message, before any commands. execution order is not guaranteed
const middlewaresPath = './middlewares/';
const middlewareFiles = readdirSync(middlewaresPath).filter(file => file.endsWith('.js'));
const middlewares = {};
await Promise.all(middlewareFiles.map(async file => {
  middlewares[file.replace('.js', '')] = (await import(middlewaresPath + file)).default;
}));

//commands execute on messages starting with !<command file name>
const commandsPath = './commands/';
const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));
const commands = {};
await Promise.all(commandFiles.map(async file => {
  commands[file.replace('.js', '')] = (await import(commandsPath + file)).default;
}));

export const processMessage = async (message) => {
  let messageContainer = { message };
  messageContainer = await accessEvaluator.execute(messageContainer);

  for (const middlewareName of Object.keys(middlewares)) {
    if (messageContainer.forcedMiddlewareAccesses.has(middlewareName) || messageContainer.accessLevel >= middlewares[middlewareName].getAccessLevel()) {
      try {
        messageContainer = await middlewares[middlewareName].execute(messageContainer);
      } catch (error) {
        console.error(`Error executing middleware ${middlewareName}:`, error);
        return null;
      }
      if (messageContainer === null) {
        return null;
      }
    }
  }

  if(commands[messageContainer.command]){
    if(messageContainer.hasForcedCommandAccess || messageContainer.accessLevel >= commands[messageContainer.command].getAccessLevel()){
      try {
        messageContainer = await commands[messageContainer.command].execute(messageContainer);
      } catch (error) {
        console.error(`Error executing command ${messageContainer.command}:`, error);
      }
    }
  }
  
  return messageContainer;
};
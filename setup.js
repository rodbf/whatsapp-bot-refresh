import { existsSync, readFileSync, writeFileSync } from 'fs';
import { createInterface } from 'readline';
import Database from 'better-sqlite3';

const dotenv = '.env';
const currentEnv = {};
const defaultValues = {
  GEMINI_API_KEY: 'your api key'
};

if (existsSync(dotenv)) {
  readFileSync(dotenv, 'utf-8').split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
      currentEnv[key] = value.trim();
    }
  });
}

const consoleInterface = createInterface({
  input: process.stdin,
  output: process.stdout
});

try {
  await setupEnv();
  createTables();
} catch (err) {
  console.error(err);
}

function promptUserForValue(key, currentValue) {
  return new Promise((resolve) => {
    consoleInterface.question(`${key} (${currentValue}): `, (answer) => {
      resolve(answer.trim() || currentValue);
    });
  });
}

async function setupEnv() {
  console.log('Setting up your environment variables...\n');

  const newEnv = {};
  for (const key of Object.keys(defaultValues)) {
    const currentValue = currentEnv[key] || defaultValues[key];
    newEnv[key] = await promptUserForValue(key, currentValue);
  }

  const envContent = Object.entries(newEnv)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n') + '\n';

  writeFileSync(dotenv, envContent);
  console.log(`.env has been updated.`);

  consoleInterface.close();
}

function createTables() {
  const db = new Database('./access_control.db');

  db.exec(`
    CREATE TABLE IF NOT EXISTS chat_access_levels (
      chat_id INTEGER PRIMARY KEY,
      access_level INTEGER
    );

    CREATE TABLE IF NOT EXISTS chat_middleware_access (
      chat_id INTEGER,
      middleware TEXT,
      PRIMARY KEY (chat_id, middleware)
    );

    CREATE TABLE IF NOT EXISTS chat_command_access (
      chat_id INTEGER,
      command TEXT,
      PRIMARY KEY (chat_id, command)
    );
  `);

  console.log('Database has been created.');
  db.close();
}
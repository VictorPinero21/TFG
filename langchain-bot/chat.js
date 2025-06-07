// chat.js
import { askBot } from './index.js';

async function main() {
  let input = '';

  process.stdin.on('data', chunk => {
    input += chunk;
  });

  process.stdin.on('end', async () => {
    try {
      const response = await askBot(input.trim());
      console.log(response);
    } catch (error) {
      console.error('Error al ejecutar el bot:', error);
      process.exit(1);
    }
  });

  process.stdin.resume();
}

main();

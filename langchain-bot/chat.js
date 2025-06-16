import { askBot } from './index.js'; 

async function main() {
  let input = ''; 

  
  process.stdin.on('data', chunk => {
    input += chunk; // Cada vez que el usuario escribe algo, lo agregamos a la variable input.
  });
  //Cuando el usuario termina de escribir y le da a enter 
  process.stdin.on('end', async () => {
    try {
     
      const response = await askBot(input.trim());
      console.log(response); 
    } catch (error) {
     
      console.error('Error al ejecutar el bot:', error);
      process.exit(1); 
    }
  });

  process.stdin.resume(); // el resume es para que siga escuchando el input del usuario.
}

main(); 
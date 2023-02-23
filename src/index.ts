import http from 'http';
import url from 'url';
import * as dotenv from 'dotenv';
// Import { addCountry } from './countrys';

console.log('hola mundos');

dotenv.config();

const PORT = process.env.PORT || 4300; // Puerto definido en el package cuando ejecuto start:mon

const server = http.createServer((req, resp) => {
  console.log('Server', req.method, PORT);
  console.log(process.env.PORT);
  // Console.log('Server', req.method, PORT);
  switch (req.method) {
    case 'GET':
      const parseURL = url.parse(req.url);
      const patname = parseURL.pathname;

      // Con desesstructuración sería lo mismo que:
      // const{pathname}=url.parse(req.url)

      resp.write('Hello Server GET tu pathname es' + patname);
      server.emit('error', new Error('Invalid URL'));

      break;
    case 'POST':
      addCountry();
      break;

    case 'PATCH':
      resp.write('Hello Server');
      break;

    case 'DELETE':
      resp.write('Hello Server. No está implementado');
      break;

    default:
      break;
  }

  // Resp.write('Hello Server');
  resp.end();
});

server.on('listening', () => {
  console.log('Estoy escuchando en http://localhost:' + PORT); // Informándonos como administradores
});

server.on('error', () => {});

server.listen(PORT);

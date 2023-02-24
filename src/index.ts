import http from 'http';
import url from 'url';
import * as dotenv from 'dotenv';
// Import { addCountry } from './countrys';

// console.log('hola mundos');

dotenv.config();

const PORT = process.env.PORT || 8000; // Puerto definido en el package cuando ejecuto start:mon

const serverCalculator = http.createServer((req, resp) => {
  console.log('Server', req.method, PORT);
  console.log(process.env.PORT);
  // Console.log('Server', req.method, PORT);
  switch (req.method) {
    case 'GET':
      if (!req.url) {
        serverCalculator.emit('error', new Error('Error 404'));
        return;
      }

      const parseURL = url.parse(req.url);
      // Const { pathname } = parseURL;
      const userPathname = parseURL.pathname;
      const userQuery = parseURL.query;
      // Const queryIsNull = userQuery?.length;
      const querySyntax =
        userQuery !== null &&
        userQuery?.includes('&') &&
        userQuery?.includes('a=') &&
        userQuery?.includes('b=');

      const queryAPosition = Number(userQuery?.search('a=')) + 2;
      const queryBPosition = Number(userQuery?.search('b=')) + 2;
      const queryAndPosition = Number(userQuery?.search('&'));
      const queryLength = userQuery?.length;

      const queryAValue = Number(
        userQuery?.slice(queryAPosition, queryAndPosition)
      );
      const queryBValue = Number(userQuery?.slice(queryBPosition, queryLength));

      if (
        userPathname === '/calculator' &&
        querySyntax
        // IsNaN(queryAValue)! &&
        // isNaN(queryBValue)!
      ) {
        resp.write(
          `<h1>Welcome to Calculator Service</h1><div>Your Query is ${userQuery}, so you want to receive the results of basic math operators between A= ${queryAValue} and B=${queryBValue}</div><div>Your results are:</div></div><div>A+B=${
            queryAValue + queryBValue
          }</div><div>A-B=${queryAValue - queryBValue}</div><div>A*B=${
            queryAValue * queryBValue
          }</div><div>A/B=${queryAValue / queryBValue}</div>`
        );
      } else {
        resp.write('<h1>Syntax Error</h1>');
      }

      // Con desesstructuración sería lo mismo que:
      // const{pathname}=url.parse(req.url)

      // serverCalculator.emit('error', new Error('Invalid URL'));

      break;
    case 'POST':
      // AddCountry();
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

serverCalculator.on('listening', () => {
  console.log('Estoy escuchando en http://localhost:' + PORT); // Informándonos como administradores
});

serverCalculator.on('error', () => {});

serverCalculator.listen(PORT);

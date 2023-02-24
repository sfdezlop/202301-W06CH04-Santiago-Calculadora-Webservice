import { program } from 'commander';
import fs from 'fs/promises';
// Commander
program.option('--install').option('-p, --port');

program.parse();

const options = program.opts();
if (options.port) {
  fs.writeFile(('.env', `PORT = ${port}`, { encoding: 'utf-8' })).then;
}

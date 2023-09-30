import { CLI, Shim } from 'clime';
import * as path from 'path';

// Path to the directory containing command modules.
const commandsPath = path.join(__dirname, 'commands');

const cli = new CLI('r/Scraper', commandsPath);

const shim = new Shim(cli);
shim.execute(process.argv);


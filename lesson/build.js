import { readFileSync, writeFileSync } from 'fs';
const args = process.argv.slice(2);
const name = args[0] ?? 'lesson';
const CONTENT = readFileSync(`./lesson/${name}.html`, 'base64');
const GRAPH = JSON.parse(readFileSync('./lesson/diagram.drawing.json', 'utf8'));
const META = JSON.parse(readFileSync('./lesson/diagram.meta.json', 'utf8'));
const output = { CONTENT, GRAPH, META };
writeFileSync(`./lesson/${name}.json`, JSON.stringify(output));

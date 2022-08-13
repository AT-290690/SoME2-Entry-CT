import { readFileSync, writeFileSync } from 'fs';

const CONTENT = readFileSync('./lesson/lesson.html', 'base64');
const GRAPH = JSON.parse(readFileSync('./lesson/diagram.drawing.json', 'utf8'));
const META = JSON.parse(readFileSync('./lesson/diagram.meta.json', 'utf8'));
const output = { CONTENT, GRAPH, META };
writeFileSync('./lesson/lesson.json', JSON.stringify(output));

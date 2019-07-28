const calc = require('./modules/calc');
const _ = require('lodash');
const fs = require('fs');
const safeFileRead = require('./modules/file-reader').safeFileRead;

console.log('Application is ready');
console.log('Number: ', calc.sum(2, 5));
console.log('Lodash: ', _.assign({a: 1}, {b: 3}));
console.log('Env: ', getEnv());
safeFileRead('files/content.txt');

function getEnv() {
    let content;
    try {
        content = fs.readFileSync('./env/environment.prod.json', 'utf-8');
    } catch (ex) {
        console.log(ex);
    }
    return JSON.parse(content);
}
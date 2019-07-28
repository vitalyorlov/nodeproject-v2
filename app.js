const calc = require('./modules/calc');
const _ = require('lodash');
const fs = require('fs');
const safeFileRead = require('./modules/file-reader').safeFileRead;
const http = require('http');
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');

console.log('Application is ready');
console.log('Number: ', calc.sum(2, 5));
console.log('Lodash: ', _.assign({ a: 1 }, { b: 3 }));
const env = getEnv();
//safeFileRead('files/content.txt');

app.use((req, res, next) => {
    console.log(req.headers);
    next();
});

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (request, response) => {
    response.render('home', {
        name: 'Vitaly'
    });
});
app.get('/error', (req, res) => { throw new Error('Error') });

app.listen(env.port, (err) => {
    err && console.log(`Unable to create dev server`);
    console.log(`Listen port ${env.port}...`);
});


function getEnv() {
    let content;
    try {
        content = fs.readFileSync('./env/environment.prod.json', 'utf-8');
    } catch (ex) {
        console.log(ex);
    }
    return JSON.parse(content);
}


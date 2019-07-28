const fs = require('fs');
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const env = getEnv();
var mysql = require('mysql');
var mysqlConnection = mysql.createConnection(env.mysql);

mysqlConnection.connect((err) => {
    console.log(err ? err : 'Database is connected');
});

app.use((req, res, next) => {
    console.log(req.headers);
    next();
});

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (request, response) => {

    mysqlConnection.query('select * from users', (err, rows, fields) => {
        mysqlConnection.end();
        
        if (err) {
            console.log('SWW');
            return;
        }

        console.log('Rows: ', rows);

        response.render('home', {
            name: rows[0].title
        });
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


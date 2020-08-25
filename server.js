// Import Express Module
const fs = require('fs');
const express = require('express');
const https = require('https');
const app = express();
const favicon = require('serve-favicon');

// Set Pug as our template engine
app.set('view engine', 'pug');

app.use(favicon(__dirname + '/public/images/favicon.ico'));

// serve static files from the `public` folder
app.use(express.static(__dirname + '/public'));

// serve assets from node_modules
app.use('/assets', express.static(__dirname + '/node_modules/'));

/*https.createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
}, app).listen(5000);
*/


// Set the server listening on port 7000
const server = app.listen(7000, () => {
    console.log(`Express running → PORT ${server.address().port}`);
});

// Routing / to default.pug and set the title to Accueil
app.get('/', (req, res) => {
    res.render('default', {
        title:  'Accueil',
        description: 'Bienvenue sur le Portfolio de Benjamin Catouillard'
    });
});
// Import Express Module
const express = require('express');
const app = express();

// Set Pug as our template engine
app.set('view engine', 'pug');

// serve static files from the `public` folder
app.use(express.static(__dirname + '/public'));

// Set the server listening on port 7000
const server = app.listen(7000, () => {
    console.log(`Express running → PORT ${server.address().port}`);
});

// Routing / to index.pug and set the title to Accueil
app.get('/', (req, res) => {
    res.render('index', {
        title:  'Accueil'
    });
});
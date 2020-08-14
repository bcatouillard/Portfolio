// Import Express Module
const express = require('express');
const app = express();
const favicon = require('serve-favicon');

// Set Pug as our template engine
app.set('view engine', 'pug');

app.use(favicon(__dirname + '/public/images/favicon.ico'));

// serve static files from the `public` folder
app.use(express.static(__dirname + '/public'));

// serve assets from node_modules
app.use('/assets', express.static(__dirname + '/node_modules/'));

// Set the server listening on port 7000
const server = app.listen(7000, () => {
    console.log(`Express running → PORT ${server.address().port}`);
});

// Routing / to index.pug and set the title to Accueil
app.get('/', (req, res) => {
    res.render('index', {
        title:  'Accueil',
        description: 'Bienvenue sur le Portfolio de Benjamin Catouillard'
    });
});

// Routing /skills to skills.pug and set the title to Mes compétences
app.get('/skills', (req, res) => {
    res.render('skills', {
        title:  'Mes compétences',
        description: 'Bienvenue sur le Portfolio de Benjamin Catouillard - Ici vous retrouverez mes compétences'
    });
});

// Routing /projects to projects.pug and set the title to Mes projets
app.get('/projects', (req, res) => {
    res.render('projects', {
        title:  'Mes projets',
        description: 'Bienvenue sur le Portfolio de Benjamin Catouillard - Ici vous retrouverez mes projets'
    });
});

// Routing /contact to contact.pug and set the title to Contactez-moi !
app.get('/contact', (req, res) => {
    res.render('contact', {
        title:  'Contactez-moi !',
        description: 'Bienvenue sur le Portfolio de Benjamin Catouillard - Ici vous pouvez me contacter !'
    });
});
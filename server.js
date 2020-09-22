// Import Express Module
const express = require('express');
const app = express();
const favicon = require('serve-favicon');
const controller = require('./src/controllers/homeController');

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

// Set Pug as our template engine
app.set('view engine', 'pug');

// Use HTTPS
//app.use('trust proxy');

app.use(favicon(__dirname + '/public/images/favicon.ico'));

// serve static files from the `public` folder
app.use(express.static(__dirname + '/public'));

// serve assets from node_modules
app.use('/assets', express.static(__dirname + '/node_modules/'));

// Set the server listening on port 7000
const server = app.listen(7000, () => {
    console.log(`Express running → PORT ${server.address().port}`);
});

// Routing / to default.pug and set the title to Accueil
app.get('/', (req, res) => {
    res.render('default', {
        title:  'Accueil',
        description: 'Bienvenue sur le Portfolio de Benjamin Catouillard',
    });
});

app.post('/', (req, res) => {
    controller.handleContactForm(req)
    res.render('default', {
        message: true,
        anchor: "contact"
    })
})

app.get('/projects/', (req, res) => {
    res.render('seeProject', {
        title:  'Accueil',
        description: 'Bienvenue sur le Portfolio de Benjamin Catouillard - voici la page détaillée d\'un projet'
    });
});

app.get('/admin', (req, res) => {
    res.render('admin', {
        title: 'Admin',
        description: 'Bienvenue sur la partie administration de mon Portfolio'
    })
});

app.get('/admin/projects', (req, res) => {
    res.render('addProject', {
        title: 'Ajout d\'un projet',
        description: 'Bienvenue sur la partie administration de mon Portfolio - ajout d\'un projet'
    })
});
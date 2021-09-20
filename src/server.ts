// Import Express Module
import express from 'express';
import favicon from 'serve-favicon';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import path from 'path';
import { urlencoded } from 'body-parser';
import { handleContactForm } from './controllers/homeController';

const app = express();
const privateEnv = dotenv.config().parsed;

app.use(urlencoded({ extended: false }));

// Set Pug as our template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

// Use HTTPS
//app.use('trust proxy');

app.use(helmet.hidePoweredBy());

// Set the server listening on port defined by dotenv file
const server = app.listen(privateEnv.PORT, () => {
    console.log(`Express running → PORT ${privateEnv.PORT}`);
});

app.use(favicon(__dirname + '/../public/images/favicon.ico'));

app.use(compression());

// serve static files from the `public` folder
app.use(express.static(__dirname + '/../public'));

// serve assets from node_modules
app.use('/assets', express.static(__dirname + '/../../node_modules/'));

// Routing / to default.pug and set the title to Accueil
app.get('/', (req, res) => {
    res.render('default', {
        title:  'Accueil',
        description: 'Bienvenue sur le Portfolio de Benjamin Catouillard',
    });
});

app.post('/', (req, res) => {
    handleContactForm(req, res);
});
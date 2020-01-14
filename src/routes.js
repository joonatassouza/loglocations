const express = require('express');
const LocationController = require('./controllers/LocationController');

const routes = new express.Router();

routes.get('/log', LocationController.create);
routes.get('/allLogs', LocationController.index);
routes.get('/clearLog', LocationController.delete);

module.exports = routes;
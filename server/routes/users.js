const express = require('express');
const routes = express.Router();
const UserController = require('../controllers/UserController')
const Authentication = require('../middlewares/authentication')

routes.post('/signup', UserController.signup)
routes.post('/signin', UserController.signin)
routes.get('/:id', UserController.findOne)

module.exports = routes
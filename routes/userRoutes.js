// src/routes/usersRoutes.js
const express = require('express');
const router = express.Router();
const { createUser, getUsers, updateUser, deleteUser, getSingleUser } = require('../controllers/userController');
const checkAuth = require('../middlewares/checkAuth');

router.post('/', checkAuth, createUser)
.get('/', checkAuth, getUsers)
.get('/:id', checkAuth, getSingleUser)
.put('/:id', checkAuth, updateUser)
.delete('/:id', checkAuth, deleteUser);

module.exports = router;

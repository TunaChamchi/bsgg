const express = require('express');
const mongoose = require('mongoose');
const Users = require('../schemas/users');

const router = express.Router();

router.get('/', async (req, res, next) => {
    const users = await Users.find({});
    res.json(users);
});

module.exports = router;
const express = require('express');
const mongoose = require('mongoose');
const UserStat = require('../schemas/userStat');

const router = express.Router();

router.get('/', async (req, res, next) => {
    const users = await UserStat.find({});
    res.json(users);
});

module.exports = router;
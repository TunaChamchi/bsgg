const express = require('express');
const mongoose = require('mongoose');
const rank = require('../schemas/rank');

const router = express.Router();

router.get('/', async (req, res, next) => {
    const ranker = await rank.find({});
    res.json(ranker);
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Quote = require('../models/Quotes');

// 목록 가져오기 엔드포인트
router.get('/', async (req, res) => {
    try {
        const quotes = await Quote.find();
        res.json(quotes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching quotes', error });
    }
});

module.exports = router;

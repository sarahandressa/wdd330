

const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes';

router.get('/books', async (req, res) => {
    const query = req.query.q;
    const key = process.env.GOOGLE_BOOKS_KEY;

    if (!query) {
        return res.status(400).json({ error: 'Missing query parameter' });
    }

    if (!key) {
        return res.status(500).json({ error: 'Google Books API key not found' });
    }

    const url = `${GOOGLE_BOOKS_API}?q=${encodeURIComponent(query)}&key=${key}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            return res.status(500).json({ error: data.error.message });
        }

        res.json(data.items || []);
    } catch (error) {
        console.error('Erro na requisição para a API do Google Books:', error.message);
        res.status(500).json({ error: 'Failed to fetch books' });
    }
});

module.exports = router;
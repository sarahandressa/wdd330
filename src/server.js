

import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.static('src/public'));

app.get('/api/books', async (req, res) => {
  const query = req.query.q;
  const apiKey = process.env.GOOGLE_BOOKS_KEY;

  if (!query || !apiKey) {
    return res.status(400).json({ error: 'Missing query or API key' });
  }

  try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${apiKey}`);
    const data = await response.json();

    if (!data.items || !Array.isArray(data.items)) {
      return res.status(404).json({ error: 'No books found' });
    }

    res.json(data.items);
  } catch (error) {
    console.error('Erro ao buscar livros:', error);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
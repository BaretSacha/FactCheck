const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = 'AIzaSyB1lz0eog42IEf7oTVfPIt6SSKvC4LC31w'; // clé API

app.use(cors());

app.get('/fact-check', async (req, res) => {
    const query = req.query.query;
    const url = `https://factchecktools.googleapis.com/v1alpha1/claims:search?query=${query}&key=${API_KEY}`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Adresse de l'API FastAPI
const FASTAPI_URL = 'http://localhost:2000/process-text';

app.use(cors());

app.get('/fact-check', async (req, res) => {
    const query = req.query.query;

    try {
        // Envoyer la requête à l'API FastAPI
        const response = await axios.post(
            FASTAPI_URL, 
            new URLSearchParams({ text_input: query }), 
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );
        
        // Renvoyer le résultat traité par l'API FastAPI
        res.json(response.data);
    } catch (error) {
        console.error("Erreur lors de la requête vers FastAPI :", error.message);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération et du traitement des données.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



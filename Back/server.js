const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8082;
const API_KEY = 'AIzaSyDwNuDme1R6csMIz0N_CqRzWY3OPXLSaIc';

app.use(cors());


app.get('/fact-check', async (req, res) => {
    const query = req.query.query;
    
    // If query parameter is missing, respond with a 400 status code
    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    const url = `https://factchecktools.googleapis.com/v1alpha1/claims:search?query=${encodeURIComponent(query)}&key=${API_KEY}`;

    try {
        // Send request to the API
        const response = await axios.get(url);
        // Return the API response to the client
        res.json(response.data);
    } catch (error) {
        // Handle Axios error
        if (error.response) {
            // API responded with a status outside of the 2xx range
            return res.status(error.response.status).json({
                error: {
                    message: error.response.data.error.message || 'API Error',
                    status: error.response.status,
                },
            });
        } else if (error.request) {
            // The request was made, but no response was received
            return res.status(502).json({ error: 'No response received from the API' });
        } else {
            // Something else happened while setting up the request
            return res.status(500).json({ error: 'Server error while processing the request' });
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


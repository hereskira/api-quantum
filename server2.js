// IMPORT PACKAGES
const express = require('express');
const fs = require('fs');

let app = express();

// Function to fetch quantum news from the JSON file
const fetchQuantumNews = () => {
    let quantumNews = JSON.parse(fs.readFileSync('./data/quantum_news.json'));
    return quantumNews;
};

// GET - api/quantum-news
app.get('', (req, res) => {
    try {
        // Fetch quantum news articles
        let quantumNews = fetchQuantumNews();

        // Respond with success status and quantum news data
        res.status(200).json({
            status: 'success',
            count: quantumNews.length,
            data: {
                quantumNews: quantumNews
            }
        });
    } catch (err) {
        // Handle errors gracefully
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch quantum news',
            error: err.message
        });
    }
});

// CREATE A SERVER
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

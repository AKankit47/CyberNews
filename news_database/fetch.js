const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static files from the root directory
app.use(express.static(path.join(__dirname))); // This will serve index.html

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/cyber_news', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// News Article Schema
const newsArticleSchema = new mongoose.Schema({
    author: String,
    content: String,
    description: String,
    publishedAt: Date,
    source: String,
    title: String,
});

const NewsArticle = mongoose.model('NewsArticle', newsArticleSchema);

// API Endpoint to get news articles
app.get('/api/news', async (req, res) => {
    try {
        const newsArticles = await NewsArticle.find().select('author content description publishedAt source title');
        res.json(newsArticles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

require('dotenv').config();
const express = require('express');
const axios = require('axios');
const { MongoClient } = require('mongodb');
const cron = require('node-cron');

const app = express();
const port = 3000;
const NEWS_API_KEY = process.env.NEWS_API_KEY;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";
const dbName = 'cyber_news'; // Updated database name
const collectionName = 'cyber_news'; // Updated collection name

const client = new MongoClient(MONGO_URI);
let collection;

// Connect to MongoDB
async function connectToDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db(dbName);
        collection = db.collection(collectionName); // Use the updated collection name
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

// Fetch news from News API
async function fetchCybersecurityNews() {
    const articlesToFetch = 100; // Total articles to fetch
    let articlesFetched = 0;
    let page = 1;

    while (articlesFetched < articlesToFetch) {
        try {
            const response = await axios.get('https://newsapi.org/v2/everything', {
                params: {
                    q: 'cybersecurity OR cybercrime',
                    apiKey: NEWS_API_KEY,
                    language: 'en',
                    sortBy: 'publishedAt',
                    pageSize: 100,
                    page: page
                }
            });

            const articles = response.data.articles;

            if (articles.length === 0) break; // Exit if no more articles

            for (const article of articles) {
                const newsItem = {
                    title: article.title,
                    author: article.author,
                    description: article.description,
                    content: article.content,
                    url: article.url,
                    publishedAt: article.publishedAt,
                    source: article.source.name
                };
                const exists = await collection.findOne({ title: newsItem.title });
                if (!exists) {
                    await collection.insertOne(newsItem);
                    console.log(`Inserted article: ${newsItem.title}`);
                    articlesFetched++;
                } else {
                    console.log(`Article already exists: ${newsItem.title}`);
                }
                
                // Stop if we've fetched enough articles
                if (articlesFetched >= articlesToFetch) break;
            }

            page++; // Move to the next page
        } catch (error) {
            console.error('Error fetching news:', error);
            break; // Exit the loop on error
        }
    }
}

// Schedule task to run every hour using cron
cron.schedule('0 * * * *', () => {
    fetchCybersecurityNews();
});

app.get('/news', async (req, res) => {
    try {
        const news = await collection.find({}).toArray();
        res.json(news);
    } catch (error) {
        res.status(500).send('Error retrieving news from database');
    }
});

app.listen(port, async () => {
    console.log(`Server running on port ${port}`);
    await connectToDB();
    fetchCybersecurityNews();  // Run once on startup
});

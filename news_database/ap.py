from fastapi import FastAPI, HTTPException
from pymongo import MongoClient
import requests
import threading
import time
from datetime import datetime

app = FastAPI()

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client.Cyber_news
news_collection = db.news  # Collection to store news articles

NEWS_API_KEY = "af9c97c4a320465082ff864a1d26ba14"  # Replace with your actual News API key
FETCH_INTERVAL = 3600  # Fetch news every hour (3600 seconds)

def fetch_cybersecurity_news():
    while True:
        try:
            response = requests.get('https://newsapi.org/v2/everything', params={
                'q': 'cybersecurity OR cybercrime',
                'apiKey': NEWS_API_KEY,
                'language': 'en',
                'sortBy': 'publishedAt',
                'pageSize': 100
            })

            articles = response.json().get('articles', [])
            for article in articles:
                news_item = {
                    'title': article.get('title'),
                    'author': article.get('author'),
                    'publishedAt': article.get('publishedAt'),
                    'type_of_attack': "Unknown",  # Placeholder, you can implement a way to categorize this
                    'sector': "Cybersecurity",  # Placeholder
                    'image': article.get('urlToImage'),
                    'summary': article.get('description'),
                    'fetched_at': datetime.utcnow()
                }

                # Insert if not exists
                if news_collection.find_one({'title': news_item['title']}) is None:
                    news_collection.insert_one(news_item)
                    print(f"Inserted article: {news_item['title']}")
                else:
                    print(f"Article already exists: {news_item['title']}")

            time.sleep(FETCH_INTERVAL)

        except Exception as e:
            print(f"Error fetching news: {str(e)}")
            time.sleep(10)  # Wait before retrying

@app.get("/")
async def read_root():
    return {"message": "Welcome to the Cybersecurity News API. Available endpoints: /api/news"}

@app.get("/api/news")
async def get_news():
    try:
        news = list(news_collection.find({}, {'_id': 0}))  # Exclude the MongoDB ID field
        return news
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    # Start the news fetching thread
    threading.Thread(target=fetch_cybersecurity_news, daemon=True).start()
    uvicorn.run(app, host="127.0.0.1", port=5000)

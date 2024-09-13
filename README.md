

Live News Aggregator

Overview

The Live News Aggregator project collects and displays live news from various sources, including websites, forums, social media platforms, and blogs. This tool aggregates real-time information to provide a comprehensive view of the latest developments in various domains, such as cybersecurity.

Features
1. Real-time News Collection: Fetches and aggregates news articles from multiple sources.
2. Multi-source Aggregation: Collects news from websites, forums, social media, and blogs.
3. Customizable Sources: Easily add or modify sources as needed.
4. Search and Filter: Allows users to search and filter news articles based on keywords and categories.

Getting Started
Prerequisites
Ensure you have the following installed:

1. Python 3.7+
2. SQLite3
3. Required Python libraries (see requirements.txt)

Installation
Clone the Repository

bash
Copy code
git clone https://github.com/AKankit47/CyberNews.git
cd live-news-aggregator

Install Dependencies

Install the required Python packages using pip:

bash
Copy code
pip install -r requirements.txt
Set Up Database

The application uses an SQLite database to store collected news. Initialize the database by running:

bash
Copy code
python setup_database.py
Configuration

Configure the sources for news collection. Update the config.py file with the URLs and API keys (if needed) for the news sources you want to include.

Usage
Run the Aggregator

Start the news collection process with:

bash
Copy code
python news_aggregator.py
View Live News

The application provides a web interface to view live news. Open your web browser and navigate to:

arduino
Copy code
http://localhost:8000
Search and Filter

Use the search and filter features on the web interface to find news articles relevant to your interests.

Example
To fetch live news about cybersecurity from a specific forum, configure the source URL and run the aggregator. The fetched articles will be displayed on the web interface.

Configuration
The configuration is managed via the config.py file. Here’s an example configuration:

python
Copy code
# config.py

# API keys and URLs for news sources
NEWS_SOURCES = {
   
    'example_blog': {
        'url': 'https://www.example.com/cybersecurity-blog',
        'type': 'website'
    },
    'twitter': {
        'api_key': 'your_twitter_api_key',
        'api_secret_key': 'your_twitter_api_secret_key',
        'access_token': 'your_twitter_access_token',
        'access_token_secret': 'your_twitter_access_token_secret',
        'type': 'social_media'
    }
}
Contributing
We welcome contributions to the project! To contribute:

Fork the repository.

Create a new branch (git checkout -b feature/YourFeature).
Make your changes.
Commit your changes (git commit -am 'Add new feature').
Push to the branch (git push origin feature/YourFeature).
Create a new Pull Request.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
BeautifulSoup: For web scraping and parsing HTML.
Requests: For making HTTP requests.
Tweepy: For accessing the Twitter API.
PRAW: For accessing the Reddit API.

Contact
For any questions or feedback, please contact:

Your Name - ankitkumarbhambhoo@gmail.com

GitHub Profile - https://github.com/AKankit47

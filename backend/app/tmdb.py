import requests
from .config import TMDB_API_KEY, TMDB_BASE_URL
import random

import time
import requests

def tmdb_get(endpoint, params=None, retries=3):
    if params is None:
        params = {}
    params["api_key"] = TMDB_API_KEY
    url = f"{TMDB_BASE_URL}/{endpoint}"

    for attempt in range(retries):
        try:
            r = requests.get(url, params=params, timeout=10)
            r.raise_for_status()
            return r.json()
        except (requests.ConnectionError, requests.Timeout) as e:
            print(f"TMDB connection error, retry {attempt+1}/{retries}")
            time.sleep(2)
    raise ConnectionError(f"Failed to connect to TMDB after {retries} retries")

def get_trending_movies(limit=30):
    data = tmdb_get("trending/movie/day")
    return data["results"][:limit]

def get_random_movies(limit=30):
    page = random.randint(1, 500)
    data = tmdb_get("discover/movie", params={"page": page})
    return data["results"][:limit]

def get_recommendations(movie_id=603692, limit=40):
    data = tmdb_get(f"movie/{movie_id}/recommendations")
    return data["results"][:limit]

def get_movie_details(movie_id):
    return tmdb_get(f"movie/{movie_id}")
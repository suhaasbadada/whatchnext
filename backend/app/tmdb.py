import requests
from .config import TMDB_API_KEY, TMDB_BASE_URL

def tmdb_get(endpoint, params=None):
    if params is None:
        params = {}
    params["api_key"] = TMDB_API_KEY
    url = f"{TMDB_BASE_URL}/{endpoint}"
    r = requests.get(url, params=params)
    r.raise_for_status()
    return r.json()


def get_movie_details(movie_id: int):
    return tmdb_get(f"movie/{movie_id}")
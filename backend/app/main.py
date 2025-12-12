from fastapi import FastAPI
from app.tmdb import get_movie_details

app = FastAPI()

@app.get("/movie/{movie_id}")
def movie_details(movie_id: int):
    data = get_movie_details(movie_id)
    return data
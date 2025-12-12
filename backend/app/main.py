import random
from pydantic import BaseModel
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.tmdb import get_trending_movies, get_random_movies, get_recommendations
from app.queue_manager import init_queue, pop_next_movie, record_swipe, append_movies, user_queues

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          
    allow_credentials=True,
    allow_methods=["*"],          
    allow_headers=["*"],
)

USER_ID = "suhaasbadada"

class SwipeRequest(BaseModel):
    movie_id: int
    action: str

def refill_queue_if_empty():
    """Ensure the user's queue always has movies. Refill if empty."""
    if USER_ID not in user_queues or not user_queues[USER_ID]:
        try:
            trending = get_trending_movies(10)
            random_movies = get_random_movies(10)
            recs = get_recommendations(limit=10)
            initial_movies = trending + random_movies + recs
            random.shuffle(initial_movies)
            init_queue(USER_ID, initial_movies)
        except Exception as e:
            print("TMDB fetch failed:", e)
            raise HTTPException(status_code=503, detail="TMDB fetch failed, try again later")

@app.get("/next_movie")
def next_movie():
    refill_queue_if_empty()

    movie = pop_next_movie(USER_ID)

    if not movie:
        refill_queue_if_empty()
        movie = pop_next_movie(USER_ID)
        if not movie:
            raise HTTPException(status_code=503, detail="Unable to fetch movies, try again later")

    return {"movie": movie}


@app.post("/swipe")
def swipe(req: SwipeRequest):
    """Frontend sends: { movie_id: 123, action: 'right' }"""

    movie_id = req.movie_id
    action = req.action

    if action not in ["right", "left", "up"]:
        raise HTTPException(status_code=400, detail="Invalid action")

    record_swipe(USER_ID, movie_id, action)

    if action == "right":
        try:
            recs = get_recommendations(movie_id, limit=5)
            append_movies(USER_ID, recs)
        except Exception as e:
            print("Failed to fetch recommendations:", e)

    refill_queue_if_empty()

    return {"status": "ok", "movie_id": movie_id, "action": action}
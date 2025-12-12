import random
from typing import Dict, List

user_queues: Dict[str, List[dict]] = {}
user_history: Dict[str, List[int]] = {}

def init_queue(user_id: str, movies: list):
    if user_id not in user_queues:
        user_queues[user_id] = movies.copy()
        user_history[user_id] = []

def pop_next_movie(user_id: str):
    if user_id not in user_queues or not user_queues[user_id]:
        return None
    movie = user_queues[user_id].pop(0)
    return movie

def record_swipe(user_id: str, movie_id: int, action: str):
    if user_id not in user_history:
        user_history[user_id] = []
    user_history[user_id].append({"movie_id": movie_id, "action": action})

def append_movies(user_id: str, movies: list):
    if user_id not in user_queues:
        user_queues[user_id] = []
    existing_ids = {m["id"] for m in user_queues[user_id]}
    for m in movies:
        if m["id"] not in existing_ids:
            user_queues[user_id].append(m)
from app.models import Query
from app.database import SessionLocal

def save_query(source, destination, distance):
    db = SessionLocal()
    try:
        new_entry = Query(source=source, destination=destination, distance_km=distance)
        db.add(new_entry)
        db.commit()
        db.refresh(new_entry)
    finally:
        db.close()

def get_history():
    db = SessionLocal()
    try:
        return db.query(Query).all()
    finally:
        db.close()

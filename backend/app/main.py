import logging
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from app.schemas import AddressRequest, DistanceResponse, QueryRecord
from app.crud import save_query, get_history
from app.utils import geocode_address, calculate_distance
from app.database import SessionLocal, engine, Base
import uvicorn

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/distance", response_model=DistanceResponse)
def get_distance(
    data: AddressRequest,
    unit: str = Query("mi", enum=["mi", "km", "both"])
):
    logger.info(f"Received distance request: source='{data.source}', destination='{data.destination}', unit='{unit}'")
    try:
        loc1 = geocode_address(data.source)
        loc2 = geocode_address(data.destination)

        if not loc1 or not loc2:
            logger.warning("Invalid address provided.")
            raise HTTPException(status_code=400, detail="Invalid address provided. Please check and try again.")

        distance_km = calculate_distance(loc1, loc2)
        distance_mi = distance_km * 0.621371

        save_query(data.source, data.destination, distance_km)

        response = {
            "source": data.source,
            "destination": data.destination,
            "distance_km": round(distance_km, 2) if unit in ["km", "both"] else None,
            "distance_mi": round(distance_mi, 2) if unit in ["mi", "both"] else None
        }
        logger.info(f"Distance calculation successful: {response}")
        return response

    except HTTPException as e:
        raise e
    except Exception as e:
        logger.exception("Internal server error during distance calculation")
        raise HTTPException(status_code=500, detail="Internal server error. Please try again later.")

@app.get("/history", response_model=list[QueryRecord])
def history():
    try:
        logger.info("Retrieving historical queries")
        return get_history()
    except Exception as e:
        logger.exception("Failed to fetch query history")
        raise HTTPException(status_code=500, detail="Could not retrieve history")

# Main function
if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)

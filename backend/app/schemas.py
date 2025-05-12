from pydantic import BaseModel

class AddressRequest(BaseModel):
    source: str
    destination: str

class DistanceResponse(BaseModel):
    source: str
    destination: str
    distance_km: float | None = None
    distance_mi: float | None = None

class QueryRecord(BaseModel):
    id: int
    source: str
    destination: str
    distance_km: float

    class Config:
        orm_mode = True

import requests
from math import radians, cos, sin, asin, sqrt

def geocode_address(address: str):
    url = "https://nominatim.openstreetmap.org/search"
    params = {
        "q": address,
        "format": "json",
        "limit": 1
    }
    headers = {
        "User-Agent": "bain-tech-assessment"
    }
    response = requests.get(url, params=params, headers=headers)
    data = response.json()
    if not data:
        return None
    return float(data[0]["lat"]), float(data[0]["lon"])

def calculate_distance(loc1, loc2):
    # Haversine formula
    lat1, lon1 = map(radians, loc1)
    lat2, lon2 = map(radians, loc2)
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat/2)**2 + cos(lat1)*cos(lat2)*sin(dlon/2)**2
    c = 2 * asin(sqrt(a))
    r = 6371  # Radius of earth in km
    return c * r

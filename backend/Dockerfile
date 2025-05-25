FROM python:3.12-slim

# Install netcat for wait-for-postgres.sh
RUN apt-get update && apt-get install -y netcat-openbsd && apt-get clean

# Set working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend source code
COPY . .

# Expose FastAPI port
EXPOSE 8000

COPY wait-for-postgres.sh .
CMD ["./wait-for-postgres.sh", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

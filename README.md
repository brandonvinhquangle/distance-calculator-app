# Distance Calculator App

A web application for calculating the distance between two addresses. Built with FastAPI (Python) for the backend, React.js for the frontend, and PostgreSQL for the database. The app is fully containerized with Docker.

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/brandonvinhquangle/distance-calculator-app.git
cd distance-calculator-app
```

### 2. Run the App

Make sure you have Docker installed, then run:

```bash
docker-compose up --build
```

This will build and start the backend, frontend, and database services.

---

## Access the Application

- Frontend: http://localhost:3000  
- API Docs (Swagger): http://localhost:8000/docs

---

## Stopping the App

To stop and remove all containers and volumes:

```bash
docker-compose down -v
```

---

## Notes

- The `.env` file is already included and contains the necessary configuration for connecting the backend to the database.
- No manual setup is required for the database — Docker Compose will handle it.

---

## Repository

https://github.com/brandonvinhquangle/distance-calculator-app
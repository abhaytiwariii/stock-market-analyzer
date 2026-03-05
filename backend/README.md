# Stock Market Analyzer - Backend

This is the backend service for the Stock Market Analyzer dashboard. It is built using FastAPI and Python, providing a clean and high-performance REST API.

## Features

- **FastAPI Framework**: High performance, easy to learn, fast to code, ready for production.
- **Stock Data Service**: Fetches historical and real-time stock data.
- **Timeframe Support**: Serves data aggregated by 1D, 1W, 1M, 3M, 1Y, and 5Y.
- **Pydantic Validation**: Robust input parsing and validation using Pydantic models.
- **CORS Configured**: Cross-Origin Resource Sharing is set up for easy connectivity from the frontend.

## Prerequisites

- Python 3.9+
- pip or uv (for fast dependency management)

## Installation

1. Create a virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Running the Application

To start the development server with live reload:

```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`.

## API Documentation

FastAPI automatically generates comprehensive API documentation. Wait for the server to spin up and visit:

- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## Project Structure

```text
backend/
├── app/
│   ├── main.py              # Application entry point and routing config
│   ├── routes/              # API router definitions maps
│   ├── services/            # Business logic and external API integrations
│   ├── models/              # Pydantic models for request/response serialization
│   └── utils/               # Helper scripts
├── requirements.txt         # Project dependencies
└── README.md                # Backend documentation
```

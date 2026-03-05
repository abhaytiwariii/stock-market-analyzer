# Stock Market Analyzer

A full-stack, production-grade project scaffold for a Stock Market Analysis Dashboard. Built to track real-time stock data and historical trends with a powerful user interface.

## Project Structure

- `frontend/`: Next.js 14 (App Router), TypeScript, Tailwind CSS, Recharts, Framer Motion.
- `backend/`: FastAPI Python project with high-performance async endpoints for data analysis.

## Project Documentation

- [Architecture Overview](architecture.md): High-level system design and component interaction.
- [Frontend Documentation](frontend/README.md): Details to run, configure, and build the Next.js ui.
- [Backend Documentation](backend/README.md): Details to run, configure, and expand the FastAPI service.

## Getting Started

### Backend Setup

1. Navigate to the `backend/` directory:
   ```bash
   cd backend
   ```
2. Activate the virtual environment:
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```
3. Run the FastAPI server:
   ```bash
   uvicorn app.main:app --reload
   ```
   The backend will be available at [http://127.0.0.1:8000](http://127.0.0.1:8000). You can check the health status at [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health).

### Frontend Setup

1. Navigate to the `frontend/` directory:
   ```bash
   cd frontend
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at [http://localhost:3000](http://localhost:3000).

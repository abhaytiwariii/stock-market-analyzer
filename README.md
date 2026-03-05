# Stock Market Analysis Dashboard

A full-stack project scaffold for an Indian Stock Market Analysis Dashboard.

## Project Structure

- `frontend/`: Next.js 14, TypeScript, Tailwind CSS, Axios
- `backend/`: FastAPI Python project with endpoints for data analysis

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

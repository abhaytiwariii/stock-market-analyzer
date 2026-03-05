from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import stock

app = FastAPI(title="Indian Stock Market Analysis API")

# Setup CORS to allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(stock.router)


@app.get("/health")
def health_check():
    return {"status": "ok"}

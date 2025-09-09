# app/main.py
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from app.core.database import get_db, engine
from app.core.config import settings
from app.models import user, thread, template
from app.api.v1 import auth, threads, templates
from app.api.deps import get_current_user
from app.services.template_service import TemplateService


import os

# Load service account key JSON
current_dir = os.getcwd()

files = os.listdir(current_dir)

# Create tables
user.Base.metadata.create_all(bind=engine)
thread.Base.metadata.create_all(bind=engine)
template.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="FinanceThread API",
    description="API for creating and managing finance Twitter threads",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://34.60.45.128:3000", "https://your-frontend-domain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(threads.router, prefix="/api/v1/threads", tags=["threads"])
app.include_router(templates.router, prefix="/api/v1/templates", tags=["templates"])
# app.include_router(finance.router, prefix="/api/v1/finance", tags=["finance"])

@app.on_event("startup")
async def startup_event():
    """Initialize default templates on startup"""
    db = next(get_db())
    try:
        TemplateService.create_default_templates(db)
    except Exception as e:
        print(f"Error creating default templates: {e}")
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "FinanceThread API", "version": "1.0.0"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}


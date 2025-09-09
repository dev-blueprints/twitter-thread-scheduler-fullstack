# app/schemas/thread.py
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

class ThreadBase(BaseModel):
    title: str
    content: List[Dict[str, Any]]  # Array of tweet objects
    template_id: Optional[int] = None

class ThreadCreate(ThreadBase):
    scheduled_at: Optional[datetime] = None

class ThreadUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[List[Dict[str, Any]]] = None
    scheduled_at: Optional[datetime] = None
    status: Optional[str] = None

class Thread(ThreadBase):
    id: int
    user_id: int
    status: str
    scheduled_at: Optional[datetime] = None
    published_at: Optional[datetime] = None
    twitter_thread_id: Optional[str] = None
    engagement_data: Optional[Dict[str, Any]] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
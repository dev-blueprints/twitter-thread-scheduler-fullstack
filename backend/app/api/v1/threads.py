
# app/api/v1/threads.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.api.deps import get_current_user
from app.models.user import User
from app.models.thread import Thread
from app.schemas.thread import ThreadCreate, ThreadUpdate, Thread as ThreadSchema
# from app.tasks.twitter_tasks import post_thread_task

router = APIRouter()

@router.get("/", response_model=List[ThreadSchema])
def get_threads(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    threads = db.query(Thread).filter(Thread.user_id == current_user.id).offset(skip).limit(limit).all()
    return threads

@router.post("/", response_model=ThreadSchema)
def create_thread(
    thread_data: ThreadCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db_thread = Thread(
        user_id=current_user.id,
        title=thread_data.title,
        content=thread_data.content,
        template_id=thread_data.template_id,
        scheduled_at=thread_data.scheduled_at
    )
    db.add(db_thread)
    db.commit()
    db.refresh(db_thread)
    return db_thread

@router.get("/{thread_id}", response_model=ThreadSchema)
def get_thread(
    thread_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    thread = db.query(Thread).filter(
        Thread.id == thread_id,
        Thread.user_id == current_user.id
    ).first()
    
    if not thread:
        raise HTTPException(status_code=404, detail="Thread not found")
    return thread

@router.put("/{thread_id}", response_model=ThreadSchema)
def update_thread(
    thread_id: int,
    thread_update: ThreadUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    thread = db.query(Thread).filter(
        Thread.id == thread_id,
        Thread.user_id == current_user.id
    ).first()
    
    if not thread:
        raise HTTPException(status_code=404, detail="Thread not found")
    
    update_data = thread_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(thread, field, value)
    
    db.commit()
    db.refresh(thread)
    return thread

# @router.post("/{thread_id}/publish")
# def publish_thread(
#     thread_id: int,
#     current_user: User = Depends(get_current_user),
#     db: Session = Depends(get_db)
# ):
#     thread = db.query(Thread).filter(
#         Thread.id == thread_id,
#         Thread.user_id == current_user.id
#     ).first()
    
#     if not thread:
#         raise HTTPException(status_code=404, detail="Thread not found")
    
#     if not current_user.twitter_access_token:
#         raise HTTPException(status_code=400, detail="Twitter not connected")
    
#     # Extract tweet content from thread
#     tweets = [tweet_obj.get("content", "") for tweet_obj in thread.content]
    
#     if thread.scheduled_at:
#         # Schedule the thread
#         twitter_service = TwitterService()
#         twitter_service.schedule_thread(thread_id, tweets, thread.scheduled_at)
#         thread.status = "scheduled"
#     else:
#         # Post immediately via background task
#         post_thread_task.delay(thread_id, tweets)
#         thread.status = "publishing"
    
#     db.commit()
#     return {"message": "Thread publication initiated", "status": thread.status}
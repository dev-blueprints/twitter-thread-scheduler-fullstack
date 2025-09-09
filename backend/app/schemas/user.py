# app/schemas/user.py
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    username: str
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    twitter_username: Optional[str] = None

class User(UserBase):
    id: int
    is_active: bool
    is_premium: bool
    twitter_username: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True




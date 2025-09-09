

# app/schemas/template.py
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

class TemplateBase(BaseModel):
    name: str
    description: Optional[str] = None
    category: str
    structure: List[Dict[str, Any]]
    compliance_disclaimers: Optional[List[str]] = None

class TemplateCreate(TemplateBase):
    is_premium: Optional[bool] = False

class Template(TemplateBase):
    id: int
    is_active: bool
    is_premium: bool
    created_at: datetime

    class Config:
        from_attributes = True

class CustomTemplateCreate(BaseModel):
    name: str
    description: Optional[str] = None
    structure: List[Dict[str, Any]]
    compliance_disclaimers: Optional[List[str]] = None

class CustomTemplate(CustomTemplateCreate):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True
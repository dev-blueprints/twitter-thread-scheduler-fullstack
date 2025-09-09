# app/api/v1/templates.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.api.deps import get_current_user
from app.models.user import User
from app.models.template import Template, CustomTemplate
from app.schemas.template import Template as TemplateSchema, CustomTemplateCreate, CustomTemplate as CustomTemplateSchema
from app.services.template_service import TemplateService

router = APIRouter()

@router.get("/", response_model=List[TemplateSchema])
def get_templates(
    category: str = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(Template).filter(Template.is_active == True)
    
    if category:
        query = query.filter(Template.category == category)
    
    # Filter premium templates for non-premium users
    if not current_user.is_premium:
        query = query.filter(Template.is_premium == False)
    
    return query.all()

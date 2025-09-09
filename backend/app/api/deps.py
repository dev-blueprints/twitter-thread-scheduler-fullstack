# app/api/deps.py
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from app.core.config import settings
from app.core.database import get_db
from app.models.user import User


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/auth/login")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        print(f"get_current_user token: {token}")
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        print(f"get_current_user payload: {payload}")
        useremail: str = payload.get("email")
        if useremail is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    except Exception as e:
        raise credentials_exception
    
    user = db.query(User).filter(User.email == useremail).first()
    print(f"after db query user: {user}")
    if user is None:
        raise credentials_exception
    
    return user

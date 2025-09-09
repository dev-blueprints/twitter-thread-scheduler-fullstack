from fastapi import Form

class EmailPasswordForm:
    def __init__(
        self,
        email: str = Form(...),
        password: str = Form(...),
    ):
        self.email = email
        self.password = password
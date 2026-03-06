class Config:
    SECRET_KEY = "secretkey"
    SQLALCHEMY_DATABASE_URI = "sqlite:///jobs.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = "jwt-secret"
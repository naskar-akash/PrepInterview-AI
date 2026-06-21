from flask import Flask
from flask_cors import CORS
from .db import Base, engine
from .routes.auth_routes import auth_bp
from .routes.user_routes import user_bp
from .routes.interview_routes import interview_bp
import os
from dotenv import load_dotenv

load_dotenv()

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    
    CORS(app, supports_credentials=True, origins=[os.getenv('FRONTEND_URL')])  # Enable CORS for the frontend

    Base.metadata.create_all(bind=engine)  # Create database tables

    app.register_blueprint(auth_bp)  # Register the auth blueprint
    app.register_blueprint(interview_bp)  # Register the interview blueprint
    app.register_blueprint(user_bp)  # Register the user blueprint
    return app
from flask import Flask
from .db import Base, engine
from .routes.auth_routes import auth_bp
from .routes.resume_routes import resume_bp
import os
from dotenv import load_dotenv

load_dotenv()


def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

    Base.metadata.create_all(bind=engine)  # Create database tables

    app.register_blueprint(auth_bp)  # Register the auth blueprint
    app.register_blueprint(resume_bp)  # Register the resume blueprint

    return app
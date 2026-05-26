from dotenv import load_dotenv
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

load_dotenv()
DATABASE_URL = os.getenv("TIDB_CONNECTION_STRING")

# create sqlalchemy engine
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,   # Check if the connection is alive before using it
    )

# create sessionLocal class db sessions
SessionLocal = sessionmaker(
    bind=engine,
    autocommit=False,
    autoflush=False,
    )

# Base class for models
Base = declarative_base()
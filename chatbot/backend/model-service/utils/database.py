from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from .config import config

engine = create_engine(
    f"mssql+pyodbc://test:{config.database_password}@{config.database_host}/test?driver=SQL+Server"
)

Session = sessionmaker(bind=engine)
session = Session()

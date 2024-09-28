from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Info(Base):
    __tablename__ = "infos"

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    title = Column(String, nullable=True)
    text = Column(String(4000), nullable=False)

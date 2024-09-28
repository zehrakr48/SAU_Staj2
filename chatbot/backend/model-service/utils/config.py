import os
from dotenv import load_dotenv


class Config:

    def __init__(self):
        load_dotenv()
        self.parse_options()

    def parse_options(self):
        self.port = os.getenv("PORT")
        self.model_name = os.getenv("MODEL_NAME")
        self.database_host = os.getenv("DATABASE_HOST")
        self.database_password = os.getenv("DATABASE_PASSWORD")
        self.gemini_key = os.getenv("GEMINI_KEY")


config = Config()

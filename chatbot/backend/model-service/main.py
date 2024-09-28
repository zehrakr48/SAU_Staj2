from routes import model_bp, upload_files
from utils import config
from flask_cors import CORS

from flask import Flask

app = Flask(__name__)
app.register_blueprint(model_bp)

# upload_files()

CORS(
    app,
    resources={
        r"/*": {"origins": "*", "headers": ["Content-Type"], "methods": ["POST"]}
    },
)


app.run(port=config.port)

from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    app.config.from_object("viva_app.config.Config")

    CORS(app)
    db.init_app(app)

    with app.app_context():
        from viva_app import models
        db.create_all()

    @app.route("/api/health")
    def health_check():
        return {
            "status": "ok",
            "message": "Viva Coordination backend is running"
        }

    return app
from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash

from viva_app.models import User

auth_bp = Blueprint("auth_bp", __name__)


@auth_bp.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email", "").lower().strip()
    password = data.get("password", "")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"error": "Invalid email or password"}), 401

    if not check_password_hash(user.password_hash, password):
        return jsonify({"error": "Invalid email or password"}), 401

    if not user.is_active:
        return jsonify({"error": "Account is inactive"}), 403

    return jsonify({
        "message": "Login successful",
        "user": user.to_dict()
    }), 200
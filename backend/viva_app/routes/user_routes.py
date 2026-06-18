from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash

from viva_app import db
from viva_app.models import User

user_bp = Blueprint("user_bp", __name__)


@user_bp.route("/api/users", methods=["GET"])
def get_users():
    users = User.query.order_by(User.id.desc()).all()
    return jsonify([user.to_dict() for user in users]), 200


@user_bp.route("/api/users", methods=["POST"])
def create_user():
    data = request.get_json()

    required_fields = ["full_name", "email", "password", "role"]
    for field in required_fields:
        if field not in data or not data[field]:
            return jsonify({"error": f"{field} is required"}), 400

    existing_user = User.query.filter_by(email=data["email"]).first()
    if existing_user:
        return jsonify({"error": "Email already exists"}), 409

    user = User(
        full_name=data["full_name"],
        email=data["email"].lower().strip(),
        password_hash=generate_password_hash(data["password"]),
        role=data["role"].lower().strip(),
        is_active=True
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({
        "message": "User created successfully",
        "user": user.to_dict()
    }), 201
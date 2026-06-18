from flask import Blueprint, request, jsonify

from viva_app import db
from viva_app.models import Room

room_bp = Blueprint("room_bp", __name__)


@room_bp.route("/api/rooms", methods=["GET"])
def get_rooms():
    rooms = Room.query.order_by(Room.id.desc()).all()
    return jsonify([room.to_dict() for room in rooms]), 200


@room_bp.route("/api/rooms", methods=["POST"])
def create_room():
    data = request.get_json()

    required_fields = ["room_name", "building"]
    for field in required_fields:
        if field not in data or not data[field]:
            return jsonify({"error": f"{field} is required"}), 400

    room = Room(
        room_name=data["room_name"],
        building=data["building"],
        capacity=data.get("capacity"),
        location_notes=data.get("location_notes"),
        is_active=True
    )

    db.session.add(room)
    db.session.commit()

    return jsonify({
        "message": "Room created successfully",
        "room": room.to_dict()
    }), 201
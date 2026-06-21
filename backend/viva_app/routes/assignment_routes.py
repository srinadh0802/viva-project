from datetime import datetime
from flask import Blueprint, request, jsonify

from viva_app import db
from viva_app.models import VivaAssignment

assignment_bp = Blueprint("assignment_bp", __name__)


@assignment_bp.route("/api/assignments", methods=["GET"])
def get_assignments():
    assignments = VivaAssignment.query.order_by(VivaAssignment.id.desc()).all()
    return jsonify([assignment.to_dict() for assignment in assignments]), 200


@assignment_bp.route("/api/assignments", methods=["POST"])
def create_assignment():
    data = request.get_json()

    required_fields = ["student_profile_id", "supervisor_user_id", "second_marker_user_id"]
    for field in required_fields:
        if field not in data or not data[field]:
            return jsonify({"error": f"{field} is required"}), 400

    scheduled_start = None
    if data.get("scheduled_start"):
        try:
            scheduled_start = datetime.strptime(data["scheduled_start"], "%Y-%m-%dT%H:%M")
        except ValueError:
            return jsonify({"error": "Invalid scheduled_start format. Use YYYY-MM-DDTHH:MM."}), 400

    assignment = VivaAssignment(
        student_profile_id=data["student_profile_id"],
        supervisor_user_id=data["supervisor_user_id"],
        second_marker_user_id=data["second_marker_user_id"],
        room_id=data.get("room_id"),
        project_title=data.get("project_title"),
        scheduled_start=scheduled_start,
        status=data.get("status", "awaiting_availability")
    )

    db.session.add(assignment)
    db.session.commit()

    return jsonify({
        "message": "Assignment created successfully",
        "assignment": assignment.to_dict()
    }), 201

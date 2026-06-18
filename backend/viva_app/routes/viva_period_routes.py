from datetime import datetime
from flask import Blueprint, request, jsonify

from viva_app import db
from viva_app.models import VivaPeriod

viva_period_bp = Blueprint("viva_period_bp", __name__)


@viva_period_bp.route("/api/viva-periods", methods=["GET"])
def get_viva_periods():
    periods = VivaPeriod.query.order_by(VivaPeriod.id.desc()).all()
    return jsonify([period.to_dict() for period in periods]), 200


@viva_period_bp.route("/api/viva-periods", methods=["POST"])
def create_viva_period():
    data = request.get_json()

    required_fields = [
        "name",
        "start_date",
        "end_date",
        "working_start_time",
        "working_end_time"
    ]

    for field in required_fields:
        if field not in data or not data[field]:
            return jsonify({"error": f"{field} is required"}), 400

    try:
        viva_period = VivaPeriod(
            name=data["name"],
            start_date=datetime.strptime(data["start_date"], "%Y-%m-%d").date(),
            end_date=datetime.strptime(data["end_date"], "%Y-%m-%d").date(),
            working_start_time=datetime.strptime(
                data["working_start_time"], "%H:%M"
            ).time(),
            working_end_time=datetime.strptime(
                data["working_end_time"], "%H:%M"
            ).time(),
            slot_duration_minutes=data.get("slot_duration_minutes", 60),
            is_active=True
        )

        db.session.add(viva_period)
        db.session.commit()

        return jsonify({
            "message": "Viva period created successfully",
            "viva_period": viva_period.to_dict()
        }), 201

    except ValueError:
        return jsonify({
            "error": "Invalid date or time format. Use YYYY-MM-DD and HH:MM."
        }), 400
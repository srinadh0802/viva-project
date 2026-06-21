from flask import Blueprint, jsonify

from viva_app.models import StaffProfile

staff_bp = Blueprint("staff_bp", __name__)


@staff_bp.route("/api/staff", methods=["GET"])
def get_staff():
    staff = StaffProfile.query.order_by(StaffProfile.id.desc()).all()
    return jsonify([member.to_dict() for member in staff]), 200

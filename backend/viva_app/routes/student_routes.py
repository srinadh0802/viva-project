from flask import Blueprint, jsonify

from viva_app.models import StudentProfile

student_bp = Blueprint("student_bp", __name__)


@student_bp.route("/api/students", methods=["GET"])
def get_students():
    students = StudentProfile.query.order_by(StudentProfile.id.desc()).all()
    return jsonify([student.to_dict() for student in students]), 200

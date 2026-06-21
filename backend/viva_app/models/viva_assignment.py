from viva_app import db


class VivaAssignment(db.Model):
    __tablename__ = "viva_assignments"

    id = db.Column(db.Integer, primary_key=True)

    student_profile_id = db.Column(
        db.Integer,
        db.ForeignKey("student_profiles.id"),
        nullable=False
    )

    supervisor_user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    second_marker_user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    room_id = db.Column(db.Integer, db.ForeignKey("rooms.id"), nullable=True)

    project_title = db.Column(db.String(255), nullable=True)

    scheduled_start = db.Column(db.DateTime, nullable=True)

    status = db.Column(db.String(30), nullable=False, default="awaiting_availability")

    student = db.relationship("StudentProfile", back_populates="assignment")

    supervisor = db.relationship(
        "User",
        foreign_keys=[supervisor_user_id]
    )

    second_marker = db.relationship(
        "User",
        foreign_keys=[second_marker_user_id]
    )

    room = db.relationship("Room")

    def to_dict(self):
        return {
            "id": self.id,
            "student_profile_id": self.student_profile_id,
            "supervisor_user_id": self.supervisor_user_id,
            "second_marker_user_id": self.second_marker_user_id,
            "room_id": self.room_id,
            "project_title": self.project_title,
            "scheduled_start": self.scheduled_start.isoformat() if self.scheduled_start else None,
            "status": self.status,
            "student_name": self.student.user.full_name if self.student and self.student.user else None,
            "supervisor_name": self.supervisor.full_name if self.supervisor else None,
            "second_marker_name": self.second_marker.full_name if self.second_marker else None,
            "room_name": self.room.room_name if self.room else None
        }
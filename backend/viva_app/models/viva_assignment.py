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

    project_title = db.Column(db.String(255), nullable=True)

    student = db.relationship("StudentProfile", back_populates="assignment")

    supervisor = db.relationship(
        "User",
        foreign_keys=[supervisor_user_id]
    )

    second_marker = db.relationship(
        "User",
        foreign_keys=[second_marker_user_id]
    )

    def to_dict(self):
        return {
            "id": self.id,
            "student_profile_id": self.student_profile_id,
            "supervisor_user_id": self.supervisor_user_id,
            "second_marker_user_id": self.second_marker_user_id,
            "project_title": self.project_title
        }
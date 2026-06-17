from viva_app import db


class StudentProfile(db.Model):
    __tablename__ = "student_profiles"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    student_number = db.Column(db.String(50), unique=True, nullable=False)
    programme = db.Column(db.String(120), nullable=True)
    project_title = db.Column(db.String(255), nullable=True)

    user = db.relationship("User", back_populates="student_profile")

    assignment = db.relationship(
        "VivaAssignment",
        back_populates="student",
        uselist=False,
        cascade="all, delete-orphan"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "student_number": self.student_number,
            "programme": self.programme,
            "project_title": self.project_title
        }
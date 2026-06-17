from viva_app import db


class StaffProfile(db.Model):
    __tablename__ = "staff_profiles"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    staff_number = db.Column(db.String(50), unique=True, nullable=True)
    department = db.Column(db.String(120), nullable=True)
    office_location = db.Column(db.String(120), nullable=True)

    user = db.relationship("User", back_populates="staff_profile")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "staff_number": self.staff_number,
            "department": self.department,
            "office_location": self.office_location
        }
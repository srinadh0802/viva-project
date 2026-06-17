from viva_app import db


class VivaPeriod(db.Model):
    __tablename__ = "viva_periods"

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(120), nullable=False)

    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)

    working_start_time = db.Column(db.Time, nullable=False)
    working_end_time = db.Column(db.Time, nullable=False)

    slot_duration_minutes = db.Column(db.Integer, default=60)

    is_active = db.Column(db.Boolean, default=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "start_date": self.start_date.isoformat() if self.start_date else None,
            "end_date": self.end_date.isoformat() if self.end_date else None,
            "working_start_time": self.working_start_time.isoformat() if self.working_start_time else None,
            "working_end_time": self.working_end_time.isoformat() if self.working_end_time else None,
            "slot_duration_minutes": self.slot_duration_minutes,
            "is_active": self.is_active
        }
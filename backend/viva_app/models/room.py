from viva_app import db


class Room(db.Model):
    __tablename__ = "rooms"

    id = db.Column(db.Integer, primary_key=True)

    room_name = db.Column(db.String(120), nullable=False)
    building = db.Column(db.String(120), nullable=False)
    capacity = db.Column(db.Integer, nullable=True)
    location_notes = db.Column(db.Text, nullable=True)

    is_active = db.Column(db.Boolean, default=True)

    def to_dict(self):
        return {
            "id": self.id,
            "room_name": self.room_name,
            "building": self.building,
            "capacity": self.capacity,
            "location_notes": self.location_notes,
            "is_active": self.is_active
        }
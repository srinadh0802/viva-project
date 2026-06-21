from datetime import datetime, date, time

from werkzeug.security import generate_password_hash

from viva_app import create_app, db
from viva_app.models import (
    User, StudentProfile, StaffProfile, Room, VivaPeriod, VivaAssignment
)

LOGIN_USERS = [
    {"full_name": "Admin User", "email": "admin@viva.com", "password": "admin123", "role": "admin"},
    {"full_name": "Demo Student", "email": "student@viva.com", "password": "student123", "role": "student"},
    {"full_name": "Demo Staff", "email": "staff@viva.com", "password": "staff123", "role": "staff"},
]

STAFF = [
    {"full_name": "Dr Lucas Okafor", "email": "lucas.okafor@viva.com", "staff_number": "STF2025001", "department": "School of Computing", "office_location": "ATT-310"},
    {"full_name": "Dr Carmen Wei", "email": "carmen.wei@viva.com", "staff_number": "STF2025002", "department": "School of Computing", "office_location": "ATT-312"},
    {"full_name": "Dr Sara Rossi", "email": "sara.rossi@viva.com", "staff_number": "STF2025003", "department": "School of Computing", "office_location": "KE-204"},
    {"full_name": "Dr Amara Khan", "email": "amara.khan@viva.com", "staff_number": "STF2025004", "department": "School of Computing", "office_location": "KE-208"},
    {"full_name": "Dr Ravi Patel", "email": "ravi.patel@viva.com", "staff_number": "STF2025005", "department": "School of Computing", "office_location": "ATT-318"},
    {"full_name": "Dr Marco Silva", "email": "marco.silva@viva.com", "staff_number": "STF2025006", "department": "School of Computing", "office_location": "ATT-320"},
    {"full_name": "Dr Jane Adams", "email": "jane.adams@viva.com", "staff_number": "STF2025007", "department": "School of Computing", "office_location": "KE-212"},
]
STAFF_PASSWORD = "staff123"

STUDENTS = [
    {"full_name": "Aisha Mensah", "email": "aisha.mensah@viva.com", "student_number": "STU2025001",
     "programme": "MSc Advanced Computer Science",
     "project_title": "Federated Learning for Privacy-Preserving Medical Imaging"},
    {"full_name": "Liam O'Brien", "email": "liam.obrien@viva.com", "student_number": "STU2025002",
     "programme": "MSc Data Analytics",
     "project_title": "Real-Time Anomaly Detection in IoT Sensor Networks"},
    {"full_name": "Priya Nair", "email": "priya.nair@viva.com", "student_number": "STU2025003",
     "programme": "MSc Software Engineering",
     "project_title": "A Microservices Framework for Scalable E-Health Platforms"},
    {"full_name": "Tom Becker", "email": "tom.becker@viva.com", "student_number": "STU2025004",
     "programme": "MSc Cyber Security",
     "project_title": "Adversarial Robustness of Intrusion Detection Models"},
    {"full_name": "Laura Okafor", "email": "laura.okafor@viva.com", "student_number": "STU2025005",
     "programme": "MSc Computer Science",
     "project_title": "Explainable AI for Credit Risk Scoring"},
    {"full_name": "Chen Wei", "email": "chen.wei@viva.com", "student_number": "STU2025006",
     "programme": "MSc Artificial Intelligence",
     "project_title": "Reinforcement Learning for Autonomous Drone Navigation"},
    {"full_name": "Sofia Rossi", "email": "sofia.rossi@viva.com", "student_number": "STU2025007",
     "programme": "MSc Data Science",
     "project_title": "Graph Neural Networks for Fraud Detection"},
]
STUDENT_PASSWORD = "student123"

ROOMS = [
    {"room_name": "ATT-201", "building": "Attenborough Building", "capacity": 4,
     "location_notes": "2nd floor, near the main lecture theatre"},
    {"room_name": "KE-115", "building": "Knowledge Exchange Building", "capacity": 4,
     "location_notes": "1st floor, seminar wing"},
]

VIVA_PERIOD = {
    "name": "Autumn 2025 Viva Period",
    "start_date": date(2025, 9, 22),
    "end_date": date(2025, 10, 3),
    "working_start_time": time(9, 0),
    "working_end_time": time(17, 0),
    "slot_duration_minutes": 60,
}

ASSIGNMENTS = [
    {"student_email": "aisha.mensah@viva.com", "supervisor_email": "staff@viva.com", "marker_email": "lucas.okafor@viva.com",
     "room_name": "ATT-201", "scheduled_start": datetime(2025, 9, 24, 13, 0), "status": "scheduled"},
    {"student_email": "liam.obrien@viva.com", "supervisor_email": "staff@viva.com", "marker_email": "carmen.wei@viva.com",
     "room_name": None, "scheduled_start": datetime(2025, 9, 23, 10, 0), "status": "proposed"},
    {"student_email": "priya.nair@viva.com", "supervisor_email": "staff@viva.com", "marker_email": "sara.rossi@viva.com",
     "room_name": None, "scheduled_start": None, "status": "awaiting_availability"},
    {"student_email": "tom.becker@viva.com", "supervisor_email": "staff@viva.com", "marker_email": "amara.khan@viva.com",
     "room_name": "KE-115", "scheduled_start": datetime(2025, 9, 26, 14, 0), "status": "scheduled"},
    {"student_email": "laura.okafor@viva.com", "supervisor_email": "ravi.patel@viva.com", "marker_email": "staff@viva.com",
     "room_name": "KE-115", "scheduled_start": datetime(2025, 9, 25, 11, 0), "status": "scheduled"},
    {"student_email": "chen.wei@viva.com", "supervisor_email": "marco.silva@viva.com", "marker_email": "staff@viva.com",
     "room_name": None, "scheduled_start": datetime(2025, 9, 24, 15, 0), "status": "proposed"},
    {"student_email": "sofia.rossi@viva.com", "supervisor_email": "jane.adams@viva.com", "marker_email": "staff@viva.com",
     "room_name": None, "scheduled_start": None, "status": "awaiting_availability"},
]


def get_or_create_user(full_name, email, password, role):
    user = User.query.filter_by(email=email).first()
    if user:
        return user, False

    user = User(
        full_name=full_name,
        email=email,
        password_hash=generate_password_hash(password),
        role=role,
        is_active=True,
    )
    db.session.add(user)
    db.session.flush()
    return user, True


def seed():
    app = create_app()

    with app.app_context():
        for demo in LOGIN_USERS:
            user, created = get_or_create_user(demo["full_name"], demo["email"], demo["password"], demo["role"])
            print(("Created" if created else "Skipping") + f" login user {demo['email']}")

        for staff in STAFF:
            user, created = get_or_create_user(staff["full_name"], staff["email"], STAFF_PASSWORD, "staff")
            print(("Created" if created else "Skipping") + f" staff user {staff['email']}")

            if not StaffProfile.query.filter_by(user_id=user.id).first():
                db.session.add(StaffProfile(
                    user_id=user.id,
                    staff_number=staff["staff_number"],
                    department=staff["department"],
                    office_location=staff["office_location"],
                ))
                print(f"  + staff profile for {staff['email']}")

        for student in STUDENTS:
            user, created = get_or_create_user(student["full_name"], student["email"], STUDENT_PASSWORD, "student")
            print(("Created" if created else "Skipping") + f" student user {student['email']}")

            if not StudentProfile.query.filter_by(user_id=user.id).first():
                db.session.add(StudentProfile(
                    user_id=user.id,
                    student_number=student["student_number"],
                    programme=student["programme"],
                    project_title=student["project_title"],
                ))
                print(f"  + student profile for {student['email']}")

        for room in ROOMS:
            if not Room.query.filter_by(room_name=room["room_name"]).first():
                db.session.add(Room(
                    room_name=room["room_name"],
                    building=room["building"],
                    capacity=room["capacity"],
                    location_notes=room["location_notes"],
                    is_active=True,
                ))
                print(f"Created room {room['room_name']}")
            else:
                print(f"Skipping room {room['room_name']} (already exists)")

        if not VivaPeriod.query.filter_by(name=VIVA_PERIOD["name"]).first():
            db.session.add(VivaPeriod(
                name=VIVA_PERIOD["name"],
                start_date=VIVA_PERIOD["start_date"],
                end_date=VIVA_PERIOD["end_date"],
                working_start_time=VIVA_PERIOD["working_start_time"],
                working_end_time=VIVA_PERIOD["working_end_time"],
                slot_duration_minutes=VIVA_PERIOD["slot_duration_minutes"],
                is_active=True,
            ))
            print(f"Created viva period {VIVA_PERIOD['name']}")
        else:
            print(f"Skipping viva period {VIVA_PERIOD['name']} (already exists)")

        db.session.flush()

        for assignment in ASSIGNMENTS:
            student_user = User.query.filter_by(email=assignment["student_email"]).first()
            student_profile = StudentProfile.query.filter_by(user_id=student_user.id).first()

            if VivaAssignment.query.filter_by(student_profile_id=student_profile.id).first():
                print(f"Skipping assignment for {assignment['student_email']} (already exists)")
                continue

            supervisor = User.query.filter_by(email=assignment["supervisor_email"]).first()
            marker = User.query.filter_by(email=assignment["marker_email"]).first()
            room = Room.query.filter_by(room_name=assignment["room_name"]).first() if assignment["room_name"] else None

            db.session.add(VivaAssignment(
                student_profile_id=student_profile.id,
                supervisor_user_id=supervisor.id,
                second_marker_user_id=marker.id,
                room_id=room.id if room else None,
                project_title=student_profile.project_title,
                scheduled_start=assignment["scheduled_start"],
                status=assignment["status"],
            ))
            print(f"Created assignment for {assignment['student_email']}")

        db.session.commit()


if __name__ == "__main__":
    seed()

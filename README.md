[comment]: # (You may find the following markdown cheat sheet useful: https://www.markdownguide.org/cheat-sheet/. You may also consider using an online Markdown editor such as StackEdit.)

## Project title: *Viva Coordination System*

### Student name: *Srinadh Darla*

### Student email: *sd674*

### Project description:
The Viva Coordination System is a full-stack web application designed to support the planning and management of MSc viva examinations. The system will allow students, supervisors, second markers and administrators to coordinate availability, manage constraints, allocate rooms and produce final viva schedules through one central platform. The core aim is to reduce manual communication and timetable clashes by generating suitable one-hour viva slots based on participant availability, room availability and scheduling rules. The application will use a Python Flask backend, HTML/CSS/JavaScript frontend and a persistent database such as SQLite or PostgreSQL. The main technical focus is a conflict-free and explainable scheduling engine, while additional features such as email reminders, calendar support, campus maps and meeting links may be added after the core scheduling workflow is working.

### List of requirements (objectives):

Essential:
- Provide login and role selection for admin, student, supervisor and second marker users.
- Allow the admin to create and manage users, roles, rooms and viva assignments.
- Allow students and staff to submit availability, unavailable times and preferred viva slots.
- Allow the admin to define the viva period, working hours and one-hour viva slot duration.
- Generate candidate viva slots using student, supervisor, second marker and room availability.
- Detect and prevent timetable clashes for students, supervisors, second markers and rooms.
- Display generated timetable suggestions and conflict information to the admin before approval.
- Allow the admin to approve, manually adjust and publish the final viva timetable.
- Allow students and staff to view their confirmed viva date, time, room/location and meeting details.
- Provide clear validation and error messages for missing availability, invalid inputs and impossible schedules.
- Store scheduling actions, conflicts and important changes for evaluation and traceability.
- Provide a responsive interface suitable for laptop, tablet and mobile screens.

Desirable:
- Send or simulate email confirmation and reminder messages for approved viva slots.
- Provide Outlook calendar event support for confirmed viva schedules.
- Store or generate Teams meeting links for online or hybrid viva meetings.
- Show campus room/building location details using a simple map view.
- Provide a rescheduling workflow that suggests alternative valid slots when availability changes.
- Export the final timetable as CSV or PDF for admin records.
- Allow bulk upload of availability data from CSV.
- Collect basic usability feedback from test users.

Optional:
- Provide an AI mock viva chatbot for practice questions based on a student's project title or description.
- Provide Zoom meeting integration as an alternative to Teams.
- Retrieve calendar free/busy information if permissions and API access are available.
- Compare the custom rule-based scheduler with an advanced optimisation solver such as OR-Tools.
- Send automated reminder messages before the viva date and time.

## Information about this repository
This is the repository that I am going to use **individually** for developing my MSc Individual Project. The main project will be developed as a Flask web application with a role-based frontend, backend scheduling logic and a persistent database.

The planned main software artefacts are:

- `app.py` or the Flask application package: main backend routes and application setup.
- `templates/`: HTML pages for login, role selection and dashboards.
- `static/`: CSS, JavaScript and image files for the user interface.
- `models/` or database-related files: user, role, availability, room and schedule data structures.
- `services/` or scheduling-related files: candidate slot generation, conflict checking and timetable scoring logic.
- `tests/`: functional tests, conflict tests and scheduling validation evidence.
- `README.md`: project description, requirements and repository information.

Regarding the use of this repository, once a feature or part of the system is developed and working, I will commit the change and push it to the remote GitLab repository with a clear and concise commit message.

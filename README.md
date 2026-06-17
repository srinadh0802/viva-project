[comment]: # "You may find the following markdown cheat sheet useful: https://www.markdownguide.org/cheat-sheet/. You may also consider using an online Markdown editor such as StackEdit."

## Project title: *Viva Coordination System*

### Student name: *Srinadh Darla*

### Student email: *sd674*

### Project description:

The Viva Coordination System is a full-stack web application designed to support the planning and management of MSc viva examinations. The system allows students, academic staff and administrators to coordinate availability, manage constraints, allocate rooms and produce final viva schedules through one central platform.

The core aim is to reduce manual communication and timetable clashes by generating suitable one-hour viva slots based on student availability, staff availability, room availability and scheduling rules. Each student will have only one viva, while staff members may supervise several students and may also act as second markers for different student projects.

The application will use a React.js frontend, a Python Flask REST API backend and a persistent database such as SQLite or PostgreSQL. The React frontend will provide a modern role-based user interface, while the Flask backend will handle authentication, data management, validation, scheduling logic and API responses.

The main technical focus is a conflict-free and explainable scheduling engine. The backend will generate candidate viva slots, check hard constraints, detect timetable clashes and return scheduling suggestions for review and approval. Additional features such as email reminders, Outlook calendar support, Teams meeting links, campus maps, timetable export, rescheduling support and AI mock viva preparation may be added after the core scheduling workflow is working and tested.

### List of requirements (objectives):

Essential:

* Provide login and automatic role-based dashboard access for admin, student and staff users.
* Allow the admin to create and manage users, roles, rooms and viva assignments.
* Allow students and staff to submit availability, unavailable times and preferred viva slots.
* Allow the admin to define the viva period, working hours and one-hour viva slot duration.
* Allow the admin to assign each student to one supervisor and one second marker.
* Support staff members acting as supervisors for some students and second markers for other students.
* Generate candidate viva slots using student, supervisor, second marker and room availability.
* Detect and prevent timetable clashes for students, supervisors, second markers and rooms.
* Prevent a staff member from being scheduled for two vivas at the same time, even if the duties are different.
* Display generated timetable suggestions and conflict information to the admin before approval.
* Allow the admin to approve, manually adjust and publish the final viva timetable.
* Allow students and staff to view their confirmed viva date, time, room/location and meeting details.
* Provide clear validation and error messages for missing availability, invalid inputs and impossible schedules.
* Store scheduling actions, conflicts and important changes for evaluation and traceability.
* Provide a responsive interface suitable for laptop, tablet and mobile screens.

Desirable:

* Send or simulate email confirmation and reminder messages for approved viva slots.
* Provide Outlook calendar event support for confirmed viva schedules.
* Store or generate Teams meeting links for online or hybrid viva meetings.
* Show campus room/building location details using a simple map view.
* Provide a rescheduling workflow that suggests alternative valid slots when availability changes.
* Export the final timetable as CSV or PDF for admin records.
* Allow bulk upload of availability data from CSV.
* Collect basic usability feedback from test users.

Optional:

* Provide an AI mock viva chatbot for practice questions based on a student's project title or description.
* Retrieve calendar free/busy information if permissions and API access are available.
* Send automated reminder messages before the viva date and time.

## Information about this repository

This is the repository that I am going to use **individually** for developing my MSc Individual Project. The main project will be developed as a full-stack web application with a React.js frontend, a Flask REST API backend, backend scheduling logic and a persistent database.

The planned main software artefacts are:

* `backend/`: Python Flask backend application containing API routes, application configuration, validation logic and scheduling services.
* `backend/app.py`: main backend entry point used to run the Flask application locally.
* `backend/viva_app/`: main Flask application package.
* `backend/viva_app/models/`: database models for users, roles, students, staff, availability, rooms, viva assignments, candidate slots and final schedules.
* `backend/viva_app/routes/`: REST API endpoints for authentication, users, rooms, availability, assignments, timetable generation and final schedules.
* `backend/viva_app/services/`: backend service logic including candidate slot generation, conflict checking, timetable scoring and schedule approval support.
* `backend/tests/`: backend functional tests, conflict tests and scheduling validation evidence.
* `frontend/`: React.js frontend application created with Vite.
* `frontend/src/pages/`: React pages for home, login, admin dashboard, student dashboard, staff dashboard, availability forms, timetable review and final schedule views.
* `frontend/src/components/`: reusable React components such as sidebar, dashboard cards, forms, tables, alerts and timetable components.
* `frontend/src/services/`: frontend API service files used to communicate with the Flask backend.
* `frontend/src/styles/`: frontend styling files for the user interface.
* `README.md`: project description, requirements, setup instructions and repository information.

Regarding the use of this repository, once a feature or part of the system is developed and working, I will commit the change and push it to the remote GitLab repository with a clear and concise commit message.

## Current development approach

The project will be developed using feature branches. The `main` branch will be treated as the stable branch, while new work will be developed and tested in separate feature branches before being merged into `main`.

The current feature branch is:

* `feature/phase-1-foundation`

This branch contains the initial Flask backend foundation, React frontend foundation, frontend-backend health check connection, login page and role-based dashboard pages.

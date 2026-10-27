# Task Management System

A full-stack task management application built with **React** and **Django REST Framework (DRF)**. The application allows users to create, view, update, complete, and delete tasks through REST APIs.

## Features

- Create new tasks
- View all tasks
- Mark tasks as completed or pending
- Delete tasks
- Filter tasks by status
- Dashboard with task statistics
- REST API integration between React and Django
- Cross-Origin Resource Sharing (CORS) configuration

## Tech Stack

### Frontend
- React
- JavaScript
- HTML5
- CSS3
- Vite

### Backend
- Python
- Django
- Django REST Framework
- Django CORS Headers
- SQLite (default Django database, unless configured otherwise)

## Project Structure

```text
task-management-system/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── ...
│   ├── package.json
│   └── .env.example
│
├── backend/
│   ├── manage.py
│   ├── config/
│   ├── tasks/
│   └── requirements.txt
│
└── README.md
```

*Note: Update the folder names above to match your actual repository structure.*

## Getting Started

Follow these steps to run the project locally.

### Prerequisites

Install the following tools:

- Python 3.10 or later (compatible with your Django version)
- Node.js and npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/task-management-system.git
cd task-management-system
```

Replace `YOUR_USERNAME` with your GitHub username.

### 2. Set Up the Django Backend

Navigate to the backend directory:

```bash
cd backend
```

Create and activate a virtual environment.

**Windows PowerShell:**

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

**Ubuntu/Linux:**

```bash
python3 -m venv venv
source venv/bin/activate
```

Install the dependencies:

```bash
pip install django djangorestframework django-cors-headers
```

Apply database migrations:

```bash
python manage.py makemigrations
python manage.py migrate
```

Start the Django development server:

```bash
python manage.py runserver
```

The backend will be available at:

`http://127.0.0.1:8000/`

Tasks API endpoint:

`http://127.0.0.1:8000/api/tasks/`

*Make sure the URL matches the API routes configured in your Django project.*

### 3. Set Up the React Frontend

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env.development` file in the frontend root:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in the terminal, usually:

`http://localhost:5173/`

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks/` | Retrieve all tasks |
| POST | `/api/tasks/` | Create a task |
| GET | `/api/tasks/{id}/` | Retrieve a specific task |
| PATCH | `/api/tasks/{id}/` | Update task details or completion status |
| PUT | `/api/tasks/{id}/` | Replace a task |
| DELETE | `/api/tasks/{id}/` | Delete a task |

## Environment Configuration

The frontend uses a Vite environment variable to configure the backend URL.

Example:

```javascript
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_URLS = {
  tasks: `${BASE_URL}/api/tasks/`,
};
```

For production deployment, replace the local backend URL with your deployed backend URL.

**Security:** Never commit passwords, Django secret keys, database credentials, or other sensitive information to GitHub.

## Future Improvements

- User registration and authentication
- Task deadlines and priorities
- Search and advanced filtering
- Pagination
- Responsive UI improvements
- Deployment to cloud hosting

## Learning Objectives

This project demonstrates practical experience with:

- Building reusable React components
- Managing state using React Hooks
- Integrating REST APIs with `fetch()`
- Creating Django models and serializers
- Implementing CRUD operations using Django REST Framework
- Configuring CORS between frontend and backend
- Managing code with Git and GitHub

## Author

**Your Name**

GitHub: [YOUR_USERNAME](https://github.com/YOUR_USERNAME)

---

If you find this project useful, consider giving the repository a ⭐.

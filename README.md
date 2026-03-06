# JobHub - Job Portal Application

A full-stack job portal web application built with React and Flask, featuring user authentication, job listings, applications, and an admin dashboard.

## Features

- 🔐 User Authentication (JWT-based)
- 💼 Browse and search job listings
- 📝 Apply to jobs
- 👤 User profile management
- 🛡️ Admin dashboard for managing jobs and applications
- 🎨 Modern, responsive UI with gradient design
- 🔍 Advanced search and filtering

## Tech Stack

### Frontend
- **React 18** - UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Vite** - Build tool and dev server

### Backend
- **Flask** - Python web framework
- **Flask-SQLAlchemy** - ORM
- **Flask-JWT-Extended** - JWT authentication
- **Flask-CORS** - Cross-origin resource sharing
- **bcrypt** - Password hashing
- **SQLite** - Database

## Project Structure

```
job portel/
├── backend/
│   ├── app.py              # Flask application and API routes
│   ├── config.py           # Configuration settings
│   ├── database.py         # Database initialization
│   ├── models.py           # Database models
│   ├── requirements.txt    # Python dependencies
│   └── instance/           # SQLite database
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── App.jsx         # Main App component
│   │   ├── main.jsx        # Entry point
│   │   └── api.js          # API configuration
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Installation

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv ../.venv
```

3. Activate the virtual environment:
```bash
# Windows
..\.venv\Scripts\activate

# Linux/Mac
source ../.venv/bin/activate
```

4. Install Python dependencies:
```bash
pip install -r requirements.txt
```

5. Run the Flask server:
```bash
python app.py
```

The backend will start on `http://127.0.0.1:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install Node dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:5173` (or another port if 5173 is busy)

## API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - Login user
- `GET /api/user/me` - Get current user (requires auth)

### Jobs
- `GET /api/jobs` - Get all jobs
- `POST /api/jobs` - Create job (admin only)
- `DELETE /api/jobs/:id` - Delete job (admin only)

### Applications
- `POST /api/apply` - Apply to a job
- `GET /api/my-applications` - Get user's applications

### Profile
- `GET /api/profile` - Get user profile
- `POST /api/profile` - Create/update profile

### Admin
- `GET /api/admin/stats` - Get dashboard statistics
- `GET /api/admin/applications` - Get all applications
- `GET /api/admin/users` - Get all users

## Usage

1. **Start both servers** (backend and frontend)
2. **Open your browser** to the frontend URL (usually `http://localhost:5173`)
3. **Register a new account** or login with the admin credentials
4. **Browse jobs** on the Jobs page
5. **Apply to jobs** by clicking "Apply Now"
6. **Manage your profile** in the Profile page
7. **Admin users** can access the Admin Dashboard to manage jobs and view applications

## Development

### Running in Development Mode

Terminal 1 - Backend:
```bash
cd backend
python app.py
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

### Building for Production

Frontend:
```bash
cd frontend
npm run build
```

The production build will be in `frontend/dist/`

## Features in Detail

### User Features
- Create and manage user accounts
- Search and filter job listings
- Apply to multiple jobs
- Track application status
- Manage personal profile with resume, skills, education, etc.

### Admin Features
- View platform statistics
- Manage all job listings
- View all applications
- Manage user accounts
- Create and delete jobs

## Database Models

- **User** - User accounts with authentication
- **Job** - Job listings
- **Application** - Job applications
- **Profile** - Extended user profile information

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the MIT License.

## Author

Created with ❤️ for connecting job seekers with opportunities

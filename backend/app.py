from flask import Flask, request, jsonify
from flask_cors import CORS
from database import db
from config import Config
from models import User, Job, Application, Profile
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import bcrypt

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
CORS(app)
jwt = JWTManager(app)

def create_sample_data():
    """Create admin user and sample jobs if they don't exist"""
    
    # Create admin user
    admin = User.query.filter_by(email="pjohnpal2004@gmail.com").first()
    if not admin:
        hashed = bcrypt.hashpw("john1234".encode("utf-8"), bcrypt.gensalt())
        admin = User(
            name="Admin",
            email="pjohnpal2004@gmail.com",
            password=hashed.decode("utf-8"),
            role="admin"
        )
        db.session.add(admin)
    
    # Create sample jobs if none exist
    if Job.query.count() == 0:
        sample_jobs = [
            {
                "title": "Senior Full Stack Developer",
                "company": "TechCorp Solutions",
                "location": "San Francisco, CA",
                "description": "We're looking for an experienced Full Stack Developer to join our dynamic team. You'll work on cutting-edge web applications using React, Node.js, and Python.",
                "salary": "120000-150000"
            },
            {
                "title": "Product Manager",
                "company": "InnovateTech",
                "location": "New York, NY",
                "description": "Join our product team to drive innovation and strategy for our flagship SaaS products. Experience with agile methodologies required.",
                "salary": "110000-140000"
            },
            {
                "title": "UI/UX Designer",
                "company": "DesignHub",
                "location": "Remote",
                "description": "Create beautiful and intuitive user experiences for our mobile and web applications. Proficiency in Figma and user research methodologies essential.",
                "salary": "85000-110000"
            },
            {
                "title": "DevOps Engineer",
                "company": "CloudSystems Inc",
                "location": "Austin, TX",
                "description": "Manage and optimize our cloud infrastructure on AWS. Experience with Docker, Kubernetes, and CI/CD pipelines required.",
                "salary": "115000-145000"
            },
            {
                "title": "Data Scientist",
                "company": "DataVerse Analytics",
                "location": "Boston, MA",
                "description": "Use machine learning and statistical analysis to derive insights from large datasets. PhD or Master's in related field preferred.",
                "salary": "130000-160000"
            },
            {
                "title": "Frontend Developer",
                "company": "WebWorks Studio",
                "location": "Seattle, WA",
                "description": "Build responsive and performant web applications using React, TypeScript, and modern CSS frameworks. 3+ years experience required.",
                "salary": "95000-125000"
            },
            {
                "title": "Marketing Manager",
                "company": "GrowthLabs",
                "location": "Los Angeles, CA",
                "description": "Lead our digital marketing initiatives including SEO, content marketing, and social media campaigns. Proven track record in B2B SaaS required.",
                "salary": "90000-120000"
            },
            {
                "title": "Mobile App Developer",
                "company": "AppCrafters",
                "location": "Remote",
                "description": "Develop native iOS and Android applications using Swift and Kotlin. Experience with React Native is a plus.",
                "salary": "100000-130000"
            },
            {
                "title": "Cybersecurity Analyst",
                "company": "SecureNet Solutions",
                "location": "Washington, DC",
                "description": "Protect our infrastructure and applications from security threats. CISSP or CEH certification preferred.",
                "salary": "105000-135000"
            },
            {
                "title": "Business Analyst",
                "company": "Enterprise Solutions Co",
                "location": "Chicago, IL",
                "description": "Bridge the gap between business needs and technical solutions. Strong SQL and data analysis skills required.",
                "salary": "80000-105000"
            }
        ]
        
        for job_data in sample_jobs:
            job = Job(**job_data)
            db.session.add(job)
    
    db.session.commit()

with app.app_context():
    db.create_all()
    create_sample_data()

# ---------------- REGISTER ----------------

@app.route("/api/register", methods=["POST"])
def register():
    data = request.json

    hashed = bcrypt.hashpw(
        data["password"].encode("utf-8"),
        bcrypt.gensalt()
    )

    user = User(
        name=data["name"],
        email=data["email"],
        password=hashed.decode("utf-8"),
        role="applicant"
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User registered"})


# ---------------- LOGIN ----------------

@app.route("/api/login", methods=["POST"])
def login():

    data = request.json
    user = User.query.filter_by(email=data["email"]).first()

    if user and bcrypt.checkpw(
        data["password"].encode("utf-8"),
        user.password.encode("utf-8")
    ):
        token = create_access_token(identity=user.id)
        return jsonify({
            "token": token,
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "role": user.role
            }
        })

    return jsonify({"message": "Invalid credentials"}), 401


# ---------------- GET CURRENT USER ----------------

@app.route("/api/user/me", methods=["GET"])
@jwt_required()
def get_current_user():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if user:
        return jsonify({
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role
        })
    
    return jsonify({"message": "User not found"}), 404


# ---------------- JOBS ----------------

@app.route("/api/jobs", methods=["GET"])
def get_jobs():
    jobs = Job.query.all()

    result = []
    for job in jobs:
        result.append({
            "id": job.id,
            "title": job.title,
            "company": job.company,
            "location": job.location,
            "description": job.description,
            "salary": job.salary
        })

    return jsonify(result)


@app.route("/api/jobs", methods=["POST"])
@jwt_required()
def add_job():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    # Only admin can add jobs
    if user.role != "admin":
        return jsonify({"message": "Unauthorized"}), 403

    data = request.json

    job = Job(
        title=data["title"],
        company=data["company"],
        location=data["location"],
        description=data["description"],
        salary=data.get("salary", "")
    )

    db.session.add(job)
    db.session.commit()

    return jsonify({"message": "Job created"})


@app.route("/api/jobs/<int:job_id>", methods=["DELETE"])
@jwt_required()
def delete_job(job_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    # Only admin can delete jobs
    if user.role != "admin":
        return jsonify({"message": "Unauthorized"}), 403
    
    job = Job.query.get(job_id)
    if job:
        db.session.delete(job)
        db.session.commit()
        return jsonify({"message": "Job deleted"})
    
    return jsonify({"message": "Job not found"}), 404


# ---------------- PROFILE ----------------

@app.route("/api/profile", methods=["GET"])
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()
    profile = Profile.query.filter_by(user_id=user_id).first()
    
    if profile:
        return jsonify({
            "phone": profile.phone,
            "education": profile.education,
            "experience": profile.experience,
            "skills": profile.skills,
            "resume_url": profile.resume_url,
            "certifications": profile.certifications,
            "linkedin": profile.linkedin,
            "github": profile.github
        })
    
    return jsonify({}), 200


@app.route("/api/profile", methods=["POST", "PUT"])
@jwt_required()
def update_profile():
    user_id = get_jwt_identity()
    data = request.json
    
    profile = Profile.query.filter_by(user_id=user_id).first()
    
    if profile:
        # Update existing profile
        profile.phone = data.get("phone", profile.phone)
        profile.education = data.get("education", profile.education)
        profile.experience = data.get("experience", profile.experience)
        profile.skills = data.get("skills", profile.skills)
        profile.resume_url = data.get("resume_url", profile.resume_url)
        profile.certifications = data.get("certifications", profile.certifications)
        profile.linkedin = data.get("linkedin", profile.linkedin)
        profile.github = data.get("github", profile.github)
    else:
        # Create new profile
        profile = Profile(
            user_id=user_id,
            phone=data.get("phone", ""),
            education=data.get("education", ""),
            experience=data.get("experience", ""),
            skills=data.get("skills", ""),
            resume_url=data.get("resume_url", ""),
            certifications=data.get("certifications", ""),
            linkedin=data.get("linkedin", ""),
            github=data.get("github", "")
        )
        db.session.add(profile)
    
    db.session.commit()
    return jsonify({"message": "Profile updated successfully"})


# ---------------- APPLY ----------------

@app.route("/api/apply", methods=["POST"])
@jwt_required()
def apply_job():
    user_id = get_jwt_identity()
    data = request.json

    # Check if already applied
    existing = Application.query.filter_by(
        user_id=user_id,
        job_id=data["job_id"]
    ).first()
    
    if existing:
        return jsonify({"message": "Already applied to this job"}), 400

    application = Application(
        user_id=user_id,
        job_id=data["job_id"]
    )

    db.session.add(application)
    db.session.commit()

    return jsonify({"message": "Application submitted successfully"})


@app.route("/api/my-applications", methods=["GET"])
@jwt_required()
def get_my_applications():
    user_id = get_jwt_identity()
    applications = Application.query.filter_by(user_id=user_id).all()
    
    result = []
    for app in applications:
        job = Job.query.get(app.job_id)
        if job:
            result.append({
                "id": app.id,
                "job": {
                    "id": job.id,
                    "title": job.title,
                    "company": job.company,
                    "location": job.location
                },
                "status": app.status,
                "applied_at": app.created_at.strftime("%Y-%m-%d")
            })
    
    return jsonify(result)


# ---------------- ADMIN ENDPOINTS ----------------

@app.route("/api/admin/applications", methods=["GET"])
@jwt_required()
def get_all_applications():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if user.role != "admin":
        return jsonify({"message": "Unauthorized"}), 403
    
    applications = Application.query.all()
    result = []
    
    for app in applications:
        applicant = User.query.get(app.user_id)
        job = Job.query.get(app.job_id)
        
        if applicant and job:
            result.append({
                "id": app.id,
                "applicant": {
                    "id": applicant.id,
                    "name": applicant.name,
                    "email": applicant.email
                },
                "job": {
                    "id": job.id,
                    "title": job.title,
                    "company": job.company
                },
                "status": app.status,
                "applied_at": app.created_at.strftime("%Y-%m-%d")
            })
    
    return jsonify(result)


@app.route("/api/admin/users", methods=["GET"])
@jwt_required()
def get_all_users():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if user.role != "admin":
        return jsonify({"message": "Unauthorized"}), 403
    
    users = User.query.all()
    result = []
    
    for u in users:
        result.append({
            "id": u.id,
            "name": u.name,
            "email": u.email,
            "role": u.role,
            "created_at": u.created_at.strftime("%Y-%m-%d")
        })
    
    return jsonify(result)


@app.route("/api/admin/stats", methods=["GET"])
@jwt_required()
def get_admin_stats():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if user.role != "admin":
        return jsonify({"message": "Unauthorized"}), 403
    
    total_users = User.query.filter_by(role="applicant").count()
    total_jobs = Job.query.count()
    total_applications = Application.query.count()
    
    return jsonify({
        "total_users": total_users,
        "total_jobs": total_jobs,
        "total_applications": total_applications
    })


if __name__ == "__main__":
    app.run(debug=True)
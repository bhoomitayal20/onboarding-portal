RecruitPortal – Secure Onboarding Management System
RecruitPortal is a full-stack web application that digitizes and streamlines onboarding workflows through secure, role-based access and structured verification processes. It replaces manual tracking with a centralized platform for managing candidate registration, document uploads, approvals, and real-time status monitoring.
🚀 Key Features
Role-based authentication (Candidate / Recruiter)
Secure document upload & metadata tracking
Recruiter dashboard with verification workflow
Police & medical verification assignment
Real-time onboarding timeline & status updates
Bulk CSV data import (Admin functionality)
🛠 Tech Stack
Frontend: HTML, CSS, JavaScript
Backend: Node.js, Express.js
Database: MongoDB
Tools: Git, VS Code
📦 Setup
git clone https://github.com/bhoomitayal20/recruitportal.git
cd recruitportal
npm install
Create a .env file:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
Run the server:
npm start
🔐 Security
Role-Based Access Control (RBAC)
Encrypted authentication tokens
Input validation & route protection

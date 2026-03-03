# 🔐 RecruitPortal – Secure Onboarding Management System

RecruitPortal is a full-stack web application that digitizes and streamlines onboarding workflows through secure, role-based access and structured verification processes. It centralizes candidate registration, document uploads, approvals, and real-time status tracking into a single platform.

---

## 🚀 Features

- Role-based authentication (Candidate / Recruiter)
- Secure document upload & metadata management
- Recruiter dashboard with verification workflow
- Police & medical verification assignment
- Real-time onboarding status timeline
- Bulk CSV data import (Admin functionality)

---

## 🛠 Tech Stack

**Frontend:** HTML, CSS, JavaScript  
**Backend:** Node.js, Express.js  
**Database:** MongoDB  
**Tools:** Git, VS Code  

---

## 📦 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/bhoomitayal20/recruitportal.git
cd recruitportal
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### 4. Start the server

```bash
npm start
```

Server runs on:

```
http://localhost:5000
```

---

## 🔐 Security

- Role-Based Access Control (RBAC)
- Encrypted authentication tokens
- Input validation and protected routes
- Secure document handling

---

## 🧪 Testing

- Functional workflow testing
- Edge case validation (invalid login, duplicate entries, missing documents)
- End-to-end onboarding verification

# 🎓 EduFlow: Admin Dashboard

**EduFlow** is a centralized, high-performance administrative dashboard designed to manage educational content, teacher certifications, and platform-wide student engagement.  
It provides **real-time analytics, secure role-based access, and seamless class management** for a scalable online learning platform.

---

## 🌐 Live Demo

- 🔗 **Client:** https://edu-flow-ef9b1.web.app/  
- 🔗 **Server:** https://eduflow-server-ten.vercel.app/  

---

## 🚀 Key Features

### 🔐 Role-Based Access Control (RBAC)
Secure authentication and authorization using **JSON Web Tokens (JWT)** with three roles:

- **Admin** – Full platform control and analytics
- **Teacher** – Manage classes and view enrollments
- **Student** – Browse, enroll, and interact with courses

---

### 📊 Dynamic Analytics Dashboard
- Real-time system monitoring
- Interactive charts and analytics using **Recharts**
- Revenue tracking and engagement metrics

---

### 📚 Content Management
- Full **CRUD operations** for class management
- Upload and manage class images via **ImgBB API**
- Category-based course organization

---

### ⚡ Performance Optimized
- **TanStack Query (React Query)** for data fetching and caching
- Automatic background refetching
- Reduced unnecessary API calls

---

### 🎨 Interactive UI
- Modern responsive UI built with **Tailwind CSS**
- Smooth animations using **Framer Motion**
- Mobile-first design principles

---

## 🛠 Tech Stack

| Category | Technology |
|--------|-------------|
| **Frontend** | React, TanStack Query, Tailwind CSS, Framer Motion |
| **Backend** | Node.js, Express.js |
| **Authentication** | JSON Web Tokens (JWT) |
| **Database** | MongoDB, Mongoose |
| **Integrations** | ImgBB API, SweetAlert2, Axios, Recharts |
| **Deployment** | Vercel / Netlify (Frontend), Render / Railway (Backend) |

---

## 🏗 Project Architecture

The application follows a **modular full-stack architecture**.
Frontend (React)


---

## 🔐 Security Implementation

Security is handled through multiple layers:

- **JWT Authentication**
- **Protected Routes**
- **Custom Middleware**
  - `verifyToken`
  - `verifyAdmin`
  - `verifyTeacher`

Sensitive routes are protected to ensure **data integrity and proper authorization**.

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/eduflow.git
cd eduflow

2️⃣ Setup Environment Variables

Create a .env file in the root directory and add:

VITE_API_URL=your_backend_url
VITE_IMAGE_HOSTING_KEY=your_imgbb_key
JWT_SECRET=your_secret_key
3️⃣ Install Dependencies
npm install
4️⃣ Run the Development Server
npm run dev
📈 Database Schema (Core)
👤 Users Collection

Stores user profile and role information.

{
  "name": "String",
  "email": "String",
  "role": "admin | teacher | student",
  "image": "String",
  "createdAt": "Date"
}
📚 Classes Collection
{
  "title": "String",
  "description": "String",
  "price": "Number",
  "category": "String",
  "teacherEmail": "String",
  "image": "String",
  "status": "pending | approved | rejected"
}
💳 Payments Collection
{
  "studentEmail": "String",
  "classId": "String",
  "price": "Number",
  "transactionId": "String",
  "date": "Date"
}
📊 Admin Dashboard Features

The Admin dashboard includes:

Total Users

Total Classes

Pending Teacher Requests

Revenue Analytics

Activity Monitoring

Charts and analytics are powered by Recharts.

📁 Project Folder Structure
src
│
├── components
├── pages
│   ├── Dashboard
│   ├── Admin
│   ├── Teacher
│   └── Student
│
├── hooks
├── providers
├── routes
└── utils
🧪 Future Improvements

Planned enhancements:

📈 Advanced analytics dashboard

🔔 Notification system

💬 Course discussion forums

📱 Progressive Web App (PWA)

📊 AI-driven learning insights

🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create.

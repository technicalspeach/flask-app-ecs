# 📋 Full-Stack Enterprise Task Management Board

A decoupled, multi-tier industrial Task Management application designed to demonstrate scalable RESTful API architectures, clean state management, and production-grade debugging methodologies.

---

## 🛠️ Architecture & Core Tech Stack

- **Frontend Tier:** React.js (Component-driven UI, state management, Axios-based dynamic data binding).
- **Backend Tier:** Python Flask (RESTful microservices design, CORS middleware management).
- **Database Engine:** SQLite (Embedded data store with programmatic local failover pipeline architecture).

---

## 🚀 Key Technical Implementations

- **Decoupled Architecture:** Clean separation of concerns between the React user interface and the Flask API layer.
- **Failover Resilience:** Implemented a smart local fallback routine that automatically routes operations to an embedded SQLite datastore if remote instances face network restrictions.
- **Dynamic CRUD Bindings:** High-performance async/await API communications for seamless dataset runtime rendering.

---

## 💻 How To Run Locally

### 1. Backend Setup
```bash
cd backend
python3 app.py
```
*Runs locally on `http://localhost:5000`*

### 2. Frontend Setup
```bash
cd frontend
npm install
npm start
```
*Runs locally on `http://localhost:3000`*

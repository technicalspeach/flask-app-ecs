from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

# Database file auto-create karne ka function
def init_db():
    conn = sqlite3.connect("tasks.db")
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            status TEXT DEFAULT 'Todo'
        )
    ''')
    conn.commit()
    conn.close()

init_db()
print("🚀 SQLite Local Crash-Proof Database Connected!")

# 1. GET API: Saare tasks database se lane ke liye
@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    conn = sqlite3.connect("tasks.db")
    cursor = conn.cursor()
    cursor.execute("SELECT id, title, status FROM tasks")
    rows = cursor.fetchall()
    conn.close()
    
    tasks = [{"_id": row[0], "title": row[1], "status": row[2]} for row in rows]
    return jsonify(tasks), 200

# 2. POST API: Naya task database mein insert karne ke liye
@app.route('/api/tasks', methods=['POST'])
def add_task():
    data = request.json
    if not data or 'title' not in data:
        return jsonify({"error": "Title is required"}), 400
    
    conn = sqlite3.connect("tasks.db")
    cursor = conn.cursor()
    cursor.execute("INSERT INTO tasks (title, status) VALUES (?, ?)", (data["title"], "Todo"))
    conn.commit()
    new_id = cursor.lastrowid
    conn.close()
    
    new_task = {"_id": new_id, "title": data["title"], "status": "Todo"}
    return jsonify(new_task), 201

if __name__ == '__main__':
    print("🎯 Flask Server running on http://localhost:5000")
    app.run(port=5000, debug=True)

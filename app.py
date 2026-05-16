from flask import Flask
from pymongo import MongoClient
import datetime

app = Flask(__name__)

# MongoDB se connect karne ka tarika (Yahan host ka naam 'database' rakhna hai kyunki compose file mein yahi naam hai)
client = MongoClient("mongodb://database:27017/")
db = client.my_database

@app.route('/')
def hello_world():
    # Database mein ek naya record save karein
    db.visits.insert_one({"time": datetime.datetime.now()})
    
    # Total records count karein
    total_visits = db.visits.count_documents({})
    
    return f'🚀 Mubarak Ho! Flask aur MongoDB connect ho gaye hain! Yeh page ab tak {total_visits} baar dekha gaya.'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)





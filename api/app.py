from flask import Flask
from flask_cors import CORS
from flask_mongoengine import MongoEngine
from dotenv import load_dotenv
import os
import bcrypt
import jwt
import json

load_dotenv()

secret = os.getenv('JWT_SECRET')

app = Flask(__name__)

app.config['MONGODB_SETTINGS'] = {
    'db': os.getenv("DB_NAME"),
    'host': os.getenv("DB_HOST"),
    'port': 27017
}

db = MongoEngine()
db.init_app(app)

CORS(app)

class User(db.Document):
    fname = db.StringField()
    lname = db.StringField()
    email = db.StringField()
    type = db.StringField()
    password = db.StringField()
    accessToken = db.StringField()
    events = db.ListField()

class Event(db.Document):
    eventId = db.IntField()
    name = db.StringField()
    date = db.DateField()
    location = db.StringField()
    estimated_attendees = db.IntField()
    venue_type = db.StringField()
    energy_consumption = db.StringField()
    renewable_energy_usage = db.IntField()
    water_consumption = db.IntField()
    waste_diversion = db.IntField()
    recycling_rate = db.IntField()
    food_waste = db.StringField()
    transportation_emissions = db.StringField()
    carbon_offsetting = db.IntField()
    local_sourcing = db.IntField()
    green_procurement = db.IntField()
    sustainable_catering = db.BooleanField()
    digital_integration = db.BooleanField()

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Headers',
                         'Content-Type,Authorization,true')
    response.headers.add('Access-Control-Allow-Methods',
                         'GET,PUT,POST,DELETE,OPTIONS')
    return response

# @app.route('/register', methods=['POST'])


@app.route('/')
def index():
    return "Ceau, lume!"

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

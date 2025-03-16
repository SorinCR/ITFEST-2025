from flask import Flask, request
from flask_cors import CORS
from flask_mongoengine import MongoEngine
from dotenv import load_dotenv
import os
import bcrypt
import jwt
import json
import scraper
import google.generativeai as genai
import requests
from flask import jsonify

load_dotenv()

secret = os.getenv('JWT_SECRET')

app = Flask(__name__)

app.config['MONGODB_SETTINGS'] = {
    'db': os.getenv("DB_NAME"),
    'host': os.getenv("DB_HOST"),
    'password': os.getenv("DB_PASS"),
    'username': os.getenv("DB_USER"),
    'port': int(os.getenv("DB_PORT"))
}

db = MongoEngine()
db.init_app(app)

CORS(app)

class User(db.Document):
    fname = db.StringField()
    lname = db.StringField()
    email = db.StringField()
    userType = db.StringField()
    company = db.StringField()
    plan = db.IntField()
    password = db.StringField()
    accessToken = db.StringField()
    events = db.ListField()
    links = db.ListField()

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
    

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def get_latest_article(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.text
    except requests.exceptions.RequestException as e:
        return {"error": f"Error fetching the webpage: {e}"}

def extract_event_data(text):
    model = genai.GenerativeModel("gemini-2.0-flash-thinking-exp")
    prompt = f"""
    Extract event details from the following text and format them into the given JSON structure:
    {text}
    
    Output JSON structure:
    {{
      "eventDetails": {{
        "eventName": "...",
        "date": "...",
        "location": "...",
        "approximateAttendees": "...",
        "eventDuration": "...",
        "eventLocationType": "...",
        "eventTiming": "...",
        "venueType": "..."
      }},
      "builtInSustainabilityMetrics": {{
        "energyConsumption": ...,
        "renewableEnergyUsage": "...",
        "waterConsumption": "...",
        "wasteDiversion": ...,
        "recyclingRate": ...,
        "foodWaste": ...,
        "transportationEmissions": ...,
        "carbonOffsetting": ...,
        "localSourcing": ...,
        "greenProcurement": ...
      }},
      "environmentalImpactResponses": {{
        "primaryEnergySource": "...",
        "energyEfficientPractices": [...],
        "transportationMode": "...",
        "transportationMeasures": "...",
        "wasteManagementPractices": "...",
        "waterManagement": "...",
        "sustainableMaterials": "..."
      }},
      "governanceAndDigitalResponses": {{
        "sustainabilityPolicy": "...",
        "sustainabilityReporting": "...",
        "vendorEvaluation": "...",
        "independentAudit": "...",
        "digitalPractices": "...",
        "dataCollection": "...",
        "performanceReviewFrequency": "..."
      }}
    }}
    """
    response = model.generate_content(prompt)
    return response.text

@app.route('/extract_event', methods=['POST'])
def extract_event():
    data = request.json
    website_url = data.get("url")
    
    if not website_url:
        return jsonify({"error": "URL is required"}), 400
    
    article_text = get_latest_article(website_url)
    
    structured_data = extract_event_data(article_text)
    # print(structured_data.replace("```json", "").replace("```", ""))
    parsed_data = json.loads(structured_data.replace("```json", "").replace("```", ""))
    return parsed_data

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Headers',
                         'Content-Type,Authorization,true')
    response.headers.add('Access-Control-Allow-Methods',
                         'GET,PUT,POST,DELETE,OPTIONS')
    return response

@app.route('/register', methods=['POST'])
def register():
    data = request.json

    user = User.objects(email=data['email'])
    if user:
        return {"success": False, "message": "User already exists"}

    received_password = bytes(data['password'], 'UTF-8')

    encoded_jwt = jwt.encode(
        {"fname": data['fname'], "lname": data["lname"], "email": data['email'], "userType": data['userType'], "company": data["company"], "plan": 0}, secret, algorithm="HS256")

    hashed_password = bcrypt.hashpw(received_password, bcrypt.gensalt())

    User(fname=data['fname'], lname=data['lname'], email=data['email'],
         userType=data["userType"], company=data["company"], plan=0, password=hashed_password, accessToken=encoded_jwt).save()
    return {"success": True, 'accessToken': encoded_jwt}

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    try:
        user = User.objects.get(email=data['email'])
    except:
        return {"success": False, "message": "This e-mail doesn't exist."}
    if bcrypt.checkpw(data['password'].encode('utf-8'), user['password'].encode('utf-8')):
        return {"success": True, "accessToken": user['accessToken'], "fname": user['fname'], "lname": user["lname"], "email": user['email'], "userType": user['userType'], "company": user["company"], "plan": user['plan']}
    else:
        return {"success": False, "message": "Wrong password."}

@app.route('/tokenLogin', methods=['POST'])
def tokenLogin():
    data = request.json
    try:
        user = jwt.decode(data['accessToken'], secret, algorithms=['HS256'])
    except:
        return {"success": False}

    if user['email'] == data['email']:
        return {"success": True, "user": user}
    else:
        return {"success": False}

@app.route('/')
def index():
    return "Ceau, lume!"

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

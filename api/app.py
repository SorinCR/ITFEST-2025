from flask import Flask, request
from flask_cors import CORS
from flask_mongoengine import MongoEngine
from dotenv import load_dotenv
import os
import bcrypt
import jwt
import json
from scraper import text_webpage, cooler_remover
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
    eventName = db.StringField()
    eventDate = db.StringField()
    eventLocation = db.StringField()
    approximateAttendees = db.StringField()
    eventDuration = db.StringField()
    venueType = db.StringField()
    eventTiming = db.StringField()
    energyConsumption = db.StringField()
    renewableEnergyUsage = db.StringField()
    waterConsumption = db.StringField()
    wasteDiversion = db.StringField()
    recyclingRate = db.StringField()
    foodWaste = db.StringField()
    transportationEmissions = db.StringField()
    carbonOffsetting = db.StringField()
    localSourcing = db.StringField()
    greenProcurement = db.StringField()
    energySource = db.StringField()
    energyEfficientPractices = db.ListField(db.StringField())
    sustainabilityPolicy = db.StringField()
    sustainabilityReporting = db.StringField()
    vendorEvaluation = db.StringField()
    independentAudit = db.StringField()
    digitalPractices = db.StringField()
    dataCollection = db.StringField()
    performanceReviewFrequency = db.StringField()
    totalPoints = db.FloatField()
    sustainabilityFactor = db.FloatField()

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
        "eventName": "...",
        "eventDate": <YYYY-MM-DD>,
        "eventLocation": "...",
        "approximateAttendees": <lessThan50/50-200/200-1000/moreThan1000/Not specified>,
        "eventDuration": <fewHours/oneDay/multipleDays/overAWeek/Not specified>,
        "venueType": <Outdoor/Virtual/Hybrid/Indoor/Not specified>,
        "eventTiming": <daylight/mixed/night/Not specified>,
        "energyConsumption": <low/medium/high/Not specified>,
        "renewableEnergyUsage": <low/medium/high/Not specified>,
        "waterConsumption": <low/medium/high/Not specified>,
        "wasteDiversion": <low/medium/high/Not specified>,
        "recyclingRate": <low/medium/high/Not specified>,
        "foodWaste": <low/medium/high/Not specified>,
        "transportationEmissions": <low/medium/high/Not specified>,
        "carbonOffsetting": <low/medium/high/Not specified>,
        "localSourcing": <low/medium/high/Not specified>,
        "greenProcurement": <poor/good/excellent/Not specified>,
        "energySource": <100Renewable/mostlyRenewable/predominantlyConventional>,
        "energyEfficientPractices": [LED/SmartHVAC/EnergyManagement/NaturalLighting/None],
        "sustainabilityPolicy": <fullyDocumented/informal/no/Not specified>,
        "sustainabilityReporting": <yesFramework/adHoc/noReporting/Not specified>,
        "vendorEvaluation": <formalEvaluation/occasional/no/Not specified>,
        "independentAudit": <yesAudit/planned/no/Not specified>,
        "digitalPractices": <entirelyDigital/mixed/primarilyPaper/Not specified>,
        "dataCollection": <comprehensieDigital/manualTracking/noData/Not specified>,
        "performanceReviewFrequency": <afterEveryEvent/periodically/rarely/Not specified>,
    }}
    """
    response = model.generate_content(prompt)
    return response.text


@app.route('/create_event', methods=['POST'])
def create_event():
    data = request.json
    last_event = Event.objects().order_by('-eventId').first()
    new_event_id = last_event.eventId + 1 if last_event else 1
    event = Event(eventId=new_event_id, eventName=data['eventName'], eventDate=data['eventDate'], eventLocation=data['eventLocation'], approximateAttendees=data['approximateAttendees'], eventDuration=data['eventDuration'], venueType=data['venueType'], eventTiming=data['eventTiming'], energyConsumption=data['energyConsumption'], renewableEnergyUsage=data['renewableEnergyUsage'], waterConsumption=data['waterConsumption'], wasteDiversion=data['wasteDiversion'], recyclingRate=data['recyclingRate'], foodWaste=data['foodWaste'], transportationEmissions=data['transportationEmissions'], carbonOffsetting=data['carbonOffsetting'], localSourcing=data['localSourcing'], greenProcurement=data['greenProcurement'], energySource=data['energySource'], energyEfficientPractices=data['energyEfficientPractices'], sustainabilityPolicy=data['sustainabilityPolicy'], sustainabilityReporting=data['sustainabilityReporting'], vendorEvaluation=data['vendorEvaluation'], independentAudit=data['independentAudit'], digitalPractices=data['digitalPractices'], dataCollection=data['dataCollection'], performanceReviewFrequency=data['performanceReviewFrequency'], totalPoints=data['totalPoints'], sustainabilityFactor=data['sustainabilityFactor'])
    event.save()

    user = User.objects.get(email=data['email'])
    user['events'].append(new_event_id)
    User.update(user, events=user['events'])
    return {"success": True, "eventId": new_event_id}

@app.route('/extract_event', methods=['POST'])
def extract_event():
    data = request.json
    website_url = data.get("url")
    
    if not website_url:
        return jsonify({"error": "URL is required"}), 400
    
    # article_text = get_latest_article(website_url)
    article_text = cooler_remover(text_webpage(website_url))
    # print("Article text:", article_text)
    structured_data = extract_event_data(article_text)
    # print(structured_data.replace("```json", "").replace("```", ""))
    parsed_data = json.loads(structured_data.replace("```json", "").replace("```", ""))
    return parsed_data

dummy = "Participate in the 'Bike to Work' day in Timișoara, reducing urban pollution and encouraging sustainable transportation within the city. The event will take place on 15th of May, 2022, starting at 8:00 AM in the city center. The event is expected to attract around 500 participants, with a duration of 4 hours. The event will take place in the city center, with a mix of indoor and outdoor activities. The event will include a bike parade, a bike maintenance workshop, and a bike-sharing program. The event will be powered by renewable energy sources, with solar panels and wind turbines providing electricity. The event will also feature a water station, recycling bins, and composting facilities to reduce waste and promote sustainability. The event will have a recycling rate of 80%, with waste diversion and food waste reduction programs in place. The event will also include a transportation plan, with shuttle buses and bike lanes provided for participants. The event will offset its carbon footprint through tree planting and other carbon offsetting measures. The event will source local food and beverages, with an emphasis on organic and sustainable products. The event will also feature sustainable catering options, with vegetarian and vegan food choices available. The event will be digitally integrated, with a website, social media pages, and a mobile app providing information and updates. The event will be promoted through online and offline channels, with a focus on sustainability and environmental awareness."

@app.route('/create_event_ai', methods=['POST'])
def create_event_ai():
    data = request.json
    structured_data = extract_event_data(data['text'])
    
    parsed_data = json.loads(structured_data.replace("```json", "").replace("```", ""))
    return parsed_data

@app.route('/get_events', methods=['POST'])
def get_events():
    data = request.json
    user = User.objects.get(email=data['email'])
    events = Event.objects(eventId__in=user['events'])
    return {"events": events}    

@app.route('/get_event', methods=['POST'])
def get_event():
    data = request.json
    event = Event.objects.get(eventId=data['eventId'])
    return {"event": event}

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
        user = User.objects.get(email=data['email'])
        return {"success": True, "user": {"accessToken": user['accessToken'], "fname": user['fname'], "lname": user["lname"], "email": user['email'], "userType": user['userType'], "company": user["company"], "plan": user['plan']}}
    else:
        return {"success": False}

@app.route('/')
def index():
    return "Ceau, lume!"

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

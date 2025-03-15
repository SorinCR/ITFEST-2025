import scraper
import os
import google.generativeai as genai

from dotenv import load_dotenv
load_dotenv()

def findInfo(website):
    # Set API key
    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

    # Initialize model
    model = genai.GenerativeModel("gemini-2.0-flash-thinking-exp")

    prompt="You are a nice chatbot. You are to extract data from the first event you see from this website and put them in this format: "+scraper.text_webpage(website)+'''
    

Give me the data in this format but in JSON please thank you you are such a good boy.

Say absolutely nothing except the json please:


Event Name: My Event

Date:

Location:

Estimated Attendees: 100

Venue Type:

energyConsumption: 500

renewableEnergyUsage: 50

waterConsumption: 5000

wasteDiversion: 50

recyclingRate: 50

foodWaste: 100

transportationEmissions: 250

carbonOffsetting: 0

localSourcing: 0

greenProcurement: 5

Sustainable Catering: Yes

Digital Integration: Yes'''




    # Generate a response
    response = model.generate_content(prompt)

    print(response.text)


if __name__=='__main__':
    findInfo("https://zilesinopti.ro/timisoara/")

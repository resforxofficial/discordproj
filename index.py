from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import requests
from riotwatcher import LolWatcher, ApiError
import json

app = Flask(__name__)
CORS(app)
load_dotenv()
APIKEY = os.getenv("RG_API")
watcher = LolWatcher(APIKEY)
matchList = []

@app.route("/riot", methods=["POST"])
def process_riot():
    data = request.json
    gamename, tagline = data.get("message", "")
    url = f"https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{gamename}/{tagline}"
    headers = {"X-Riot-Token": APIKEY}
    res = requests.get(url, headers=headers)
    puuid = res.json()["puuid"]
    try:
        summoner = watcher.summoner.by_puuid("kr", puuid)
        matchIds = watcher.match.matchlist_by_puuid("asia", puuid, start=0, count=5)
        print(summoner)
        print(matchIds)
        for mid in matchIds:
            matchdetails = watcher.match.by_id("asia", mid)
            matchList.append(matchdetails)
        
        with open(f"./dist/{puuid[:9]}.json", "w", encoding="utf-8") as f:
            json.dump(matchList, f, ensure_ascii=False, indent=4)

        return jsonify({ "ifi" :"if this has shown then test is success" })
    except ApiError as err:
        if err.response.status_code == 429:
            print(err.response.headers.get("Retry-After"))
        else:
            print(err.response.status_code)

if __name__ == "__main__":
    app.run(port=5050)

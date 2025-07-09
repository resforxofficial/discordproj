from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/riot", methods=["POST"])
def process_riot():
    data = request.json()
    print(data)

if __name__ == "__main__":
    app.run(port=5050)
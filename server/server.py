from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

cities = [
    "Belgorod",
    "Moscow",
    "Kaluga"
]

@app.route('/cities', methods=['GET'])
def get_cities():
    return jsonify({'cities': cities})
    

if __name__ == '__main__':
    app.run()
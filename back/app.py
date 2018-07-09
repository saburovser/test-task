from time import sleep
from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from werkzeug.utils import secure_filename
from data import cities, plans, prices
# from mongo import writeData

app = Flask(__name__)
CORS(app)

@app.route('/cities', methods=['GET'])
def get_cities():
    return jsonify(cities)

@app.route('/plans/<city_id>', methods=['GET'])
def get_plans_by_city_id(city_id):
    return jsonify(plans[city_id])

@app.route('/prices/<plan_name>', methods=['GET'])
def get_price_by_plan_name(plan_name):
    return jsonify(prices[plan_name])

@app.route('/uploadfile', methods = ['POST'])
def upload_file():
    if request.method == 'POST':
        f = request.files['file']
        f.save(secure_filename(f.filename))
        sleep(5)
        return 'file uploaded successfully'
    return 'some error happened'

@app.route('/getfile')
def get_file():
    return send_file('get_test.txt')

# @app.route('/request', methods = ['POST'])
# def get_request():
#     if request.method == 'POST':
#         writeData(request.get_json())
#     return 'ok'

@app.route('/request', methods = ['POST'])
def get_request():
    print(request.get_json())
    return 'ok'

if __name__ == '__main__':
    app.run(host = '0.0.0.0')
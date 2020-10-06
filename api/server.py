from flask import Flask, request, jsonify
import util
from gevent.pywsgi import WSGIServer

app = Flask(__name__)
CORS(app)


@app.route('/get_location_names')
def get_location_names():
    response = jsonify({
        'locations': util.get_location_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


@app.route('/match_home_types', methods=['GET', 'POST'])
def match_home_types():
    area = request.form['area']

    response = jsonify({
        'home_types': util.match_area_with_types(area)
    })

    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


@app.route('/predict_home_price', methods=['GET', 'POST'])
def predict_home_price():
    area = request.form['area']
    types = request.form['types']
    bedroom = int(request.form['bedroom'])
    bathroom = int(request.form['bathroom'])

    response = jsonify({
        'estimated_price': util.get_estimated_price(area, types, bedroom, bathroom)
    })

    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


if __name__ == "__main__":
    print('Starting Python Flask Server for Home Prediction')
    util.load_saved_artifacts()
    app.run()
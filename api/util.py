import json
import pickle
import numpy as np
import pandas as pd

# __locations = None
# __data_columns = None
# __model = None

data = {"data_columns": ["bedroom", "bathroom", "detached_bungalow", "detached_duplex", "duplex", "house", "semi_detached_bungalow", "semi_detached_duplex", "terraced_bungalow", "terraced_duplex", "2nd toll gate lekki", "abijo ibeju lekki", "abraham adesanya ajah", "adeniyi jones ikeja", "ado ajah", "ago palace isolo", "aguda surulere", "agungi lekki", "ajah", "ajiwe ajah", "allen ikeja", "anthony maryland", "awoyaya ibeju lekki", "badore ajah", "banana island ikoyi", "bode thomas surulere", "bogije ibeju lekki", "chervon lekki", "chevy view estate ajah", "crown estate ajah", "ebute ikorodu", "egbeda alimosho", "eleko ibeju lekki", "fagba agege", "festac amuwo odofin", "g r a ikeja", "g r a isheri north", "g r a magodo", "g r a ogudu", "gbagada phase 1 gbagada", "idado lekki", "ifako gbagada", "igando ikotun", "igbo efon lekki", "igbogbo ikorodu", "ijegun ikotun", "ikate lekki",
                         "ikota ajah", "ikoyi", "ilaje ajah", "ilasan lekki", "ilupeju estate ilupeju", "isheri olofin alimosho", "jakande lekki", "lafiaji lekki", "lakowe ibeju lekki", "lekki", "lekki expressway lekki", "lekki gardens estate ajah", "lekki phase 1", "lekki phase 2 lekki", "maryland maryland", "mende maryland", "mojisola onikoyi estate ikoyi", "nicon town lekki", "ogba ikeja", "ogombo ajah", "ogunlana surulere", "oke afa isolo", "oko oba agege", "old ikoyi ikoyi", "ologolo lekki", "olokonla ajah", "omole phase 1 ikeja", "omole phase 1 ojodu", "omole phase 2 ikeja", "oniru vi", "opebi ikeja", "opic isheri north", "oral estate lekki", "orchid road lekki", "oregun ikeja", "oribanwa ibeju lekki", "osapa london lekki", "osborne ikoyi", "parkview ikoyi", "pinnock beach estate lekki", "royal garden estate ajah", "sangotedo ajah", "thomas estate ajah", "vgc ajah", "victoria island"]}

global __data_columns
global __locations
# global __model

__data = json.dumps(data)
__data_columns = json.loads(__data)['data_columns']
__locations = __data_columns[10:]

with open('./artifacts/lagos_home_prices_model.pickle', 'rb') as f:
    global __model
    __model = pickle.load(f)
    print('Loading artifacts done')

properties = pd.read_csv("./artifacts/properties.csv")
locality = properties.pivot_table(
    index='types', values='price', columns='area')


def match_area_with_types(area):
    check = locality[[area]].groupby(
        "types", as_index=True).max().sort_values(by=area, ascending=False)
    check.reset_index(inplace=True)
    my_list = check.values
    avail_areas = []

    for x in my_list:
        if not pd.isna(x[1]):
            avail_areas.append(x[0])

    return avail_areas


def get_estimated_price(area, types, bedroom, bathroom):
    area_index = __data_columns.index(
        area.lower()) if area.lower() in __data_columns else -1
    types_index = __data_columns.index(
        types.lower()) if types.lower() in __data_columns else -1

    # try:
    #     area_index = __data_columns.index(area.lower()) and types_index = __data_columns.index(types.lower())
    # except:
    #     area_index = -1 and types_index = -1

    x = np.zeros(len(__data_columns))
    x[0] = bedroom
    x[1] = bathroom
    if area_index >= 0:
        x[area_index] = 1
    if types_index >= 0:
        x[types_index] = 1

    return round(__model.predict([x])[0], 2)


def get_location_names():
    return __locations


def load_saved_artifacts():
    print('loading saved artifacts... start')
    # global __data_columns
    # global __locations
    # global __model

    # __data = json.dumps(data)
    # __data_columns = json.loads(__data)['data_columns']
    # __locations = __data_columns[10:]

    # with open('artifacts/columns.json', 'r') as f:
    #     # read the data
    #     data = f.read()
    #     __data_columns = json.load(data)
    #     __locations = __data_columns[10:]

    # with open('./artifacts/lagos_home_prices_model.pickle', 'rb') as f:
    #     __model = pickle.load(f)
    # print('Loading artifacts done')


if __name__ == '__main__':
    load_saved_artifacts()
    print(__data_columns)
    print(get_location_names())
    print(get_estimated_price('Omole Phase 1_Ikeja', 'detached_duplex', 5, 5))
    print(get_estimated_price('Oniru_VI', 'detached_duplex', 4, 4))
    print(get_estimated_price('Oniru_VI', 'semi_detached_bungalow', 3, 3))
    print(match_area_with_types('Ado_Ajah'))

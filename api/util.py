import json
import pickle
import numpy as np
import pandas as pd

__locations = None
__data_columns = None
__model = None

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
    global __data_columns
    global __locations
    global __model

    with open('./artifacts/columns.json', 'r') as f:
        __data_columns = json.load(f)['data_columns']
        __locations = __data_columns[11:]

    with open('./artifacts/lagos_home_prices_model.pickle', 'rb') as f:
        __model = pickle.load(f)
    print('Loading artifacts done')


if __name__ == '__main__':
    load_saved_artifacts()
    print(get_location_names())
    print(get_estimated_price('Omole Phase 1_Ikeja', 'detached_duplex', 5, 5))
    print(get_estimated_price('Oniru_VI', 'detached_duplex', 4, 4))
    print(get_estimated_price('Oniru_VI', 'semi_detached_bungalow', 3, 3))
    print(match_area_with_types('Ado_Ajah'))

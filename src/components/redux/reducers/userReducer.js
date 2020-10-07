import {
  GET_LOCATIONS,
  MATCH_TYPES,
  PREDICT_PRICE,
  LOADING_USER,
  CLEAR_LOADING,
} from "../types";

const initialState = {
  loading: null,
  location: "",
  currentHomeDetails: {},
  homeTypes: [],
  estimatedPrice: "",
  locations: [],
  hide_params: true,
  hide_details: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case MATCH_TYPES:
      return {
        ...state,
        loading: null,
        hide_params: false,
        hide_details: true,
        homeTypes: action.payload,
        location: action.text,
      };
    // case SET_UNAUTHENTICATED:
    //     return initialState;
    case GET_LOCATIONS:
      return {
        ...state,
        loading: null,
        locations: action.payload,
      };
    case PREDICT_PRICE:
      return {
        ...state,
        loading: null,
        hide_details: false,
        estimatedPrice: action.payload,
        currentHomeDetails: action.obj,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_LOADING:
      return {
        ...state,
        loading: null,
      };
    default:
      return state;
  }
}

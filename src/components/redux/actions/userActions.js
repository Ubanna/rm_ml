import {
  GET_LOCATIONS,
  MATCH_TYPES,
  PREDICT_PRICE,
  LOADING_USER,
  CLEAR_LOADING,
} from "../types";
import axios from "axios";

export const getLocations = () => (dispatch) => {
  axios
    .get("/api/get_location_names")
    .then((res) => {
      dispatch({
        type: GET_LOCATIONS,
        payload: res.data.locations,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_LOCATIONS,
        payload: [],
      });
    });
};

export const matchHouseTypes = (formData) => (dispatch) => {
  axios
    .post("/api/match_home_types", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      dispatch({
        type: MATCH_TYPES,
        payload: res.data.home_types,
        text: formData.get("area"),
      });
    })
    .catch((error) => {
      console.log(error.response);
    });
};

export const predictHomePrice = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/api/predict_home_price", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      dispatch({
        type: PREDICT_PRICE,
        payload: res.data.estimated_price,
        obj: Object.fromEntries(formData),
      });
      // dispatch({ type: CLEAR_LOADING });
    })
    .catch((error) => {
      console.log(error);
    });
};

import axios from "axios";
import { setAlert } from "./alert";

import {
    ADD_GONGSI,
    REMOVE_GONGSI,
    UPDATE_GONGSI,
    GET_GONGSI,
    GET_GONGSI_DETAIL,
    POST_ERROR
         } from "./types";


export const getGongsi = () => async dispatch => {
    try {
        const res = await axios.get("/api/bulletin");
        console.log("액션 실행 잘 된다")
        dispatch({
            type: GET_GONGSI,
            payload: res.data
        });
        console.log(res.data)
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

export const deleteGonsi = id => async dispatch => {
    try {
      await axios.delete(`/api/bulletin/${id}`);
  
      dispatch({
        type: REMOVE_GONGSI,
        payload: id
      });
  
      dispatch(setAlert("Post Removed", "success"));
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
  
  export const addGongsi = formData => async dispatch => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
  
    try {
      const res = await axios.post("/api/bulletin", formData, config);
  
      dispatch({
        type: ADD_GONGSI,
        payload: res.data
      });
  
      dispatch(setAlert("Post Created", "success"));
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

  export const getGongsiDetail = id => async dispatch => {
    try {     
      const res = await axios.get(`/api/bulletin/${id}`);
      console.log("앙")
      dispatch({
        type: GET_GONGSI_DETAIL,
        payload: res.data
      });
  
      dispatch(setAlert("success"));
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
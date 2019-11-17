import axios from "axios";
import { setAlert } from "./alert";
import {
    MAKE_VOTE,
    UPDATE_VOTE,
    REMOVE_VOTE,
    GET_VOTE,
    VOTING
} from "./types";

export const makeVote = ({
    corp,
    contents,
    token,
    char,
    place,
    date
  }) => async dispatch => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
  
    const body = JSON.stringify({ corp, contents, token, char, place, date });
  
    console.log(body);
      const res = await axios.post("/api/makevote", body, config);
  
      dispatch({
        type: MAKE_VOTE,
        payload: res.data
      });
    };

export const getVote = () => async dispatch => {
  // const body = JSON.stringify({ corp, contents, token, char, place, date });
  console.log('작동!')
  const res = axios.get('/api/getvote');
  dispatch({
    type: GET_VOTE,
    payload: res.data
  });
};


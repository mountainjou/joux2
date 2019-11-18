import axios from "axios";
import { setAlert } from "./alert";
import {
  MAKE_VOTE,
  UPDATE_VOTE,
  REMOVE_VOTE,
  GET_VOTE,
  VOTING,
  POST_ERROR
} from "./types";
import { async } from "rxjs/internal/scheduler/async";

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
  const res = await axios.post("/api/vote/makevote", body, config);

  dispatch({
    type: MAKE_VOTE,
    payload: res.data
  });
};

export const getVote = async () => {
  console.log('get vote')
  const res = await axios.get('/api/vote/getvote');
  return res;
};
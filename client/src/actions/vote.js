import axios from 'axios';
import { setAlert } from './alert';
import {
  MAKE_VOTE,
  UPDATE_VOTE,
  REMOVE_VOTE,
  GET_VOTE,
  VOTING,
  POST_ERROR
} from './types';
import { async } from 'rxjs/internal/scheduler/async';

export const makeVote = ({
  tokenCA,
  corp,
  contents,
  token,
  char,
  place,
  date
}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    tokenCA,
    corp,
    contents,
    token,
    char,
    place,
    date
  });

  console.log(body + '안녕');
  const res = await axios.post('/api/vote/makevote', body, config);

  dispatch({
    type: MAKE_VOTE,
    payload: res.data
  });

  dispatch(setAlert('전자투표가 등록되었습니다', 'success'));
};

export const getVote = async () => {
  // const body = JSON.stringify({ corp, contents, token, char, place, date });
  // try {
  const res = await axios.get('/api/vote/getvote');
  console.log('작동!');
  // dispatch({
  //   type: GET_VOTE,
  //   payload: res.data
  // });
  // console.log(res.data);
  // }
  // catch (err) {
  //   dispatch({
  //       type: POST_ERROR,
  //       payload: { msg: err.response.statusText, status: err.response.status }
  //   });
  // }
  return res.data;
};

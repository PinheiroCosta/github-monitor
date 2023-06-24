import * as types from './ActionTypes';

export const getCommitsSuccess = response => ({
  type: types.GET_COMMITS_SUCCESS,
  payload: response.results,
});

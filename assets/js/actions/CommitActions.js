import * as types from './ActionTypes';

export const getCommitsSuccess = commits => ({
  type: types.GET_COMMITS_SUCCESS,
  payload: commits,
});

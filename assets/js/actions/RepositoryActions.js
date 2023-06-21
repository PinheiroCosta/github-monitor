import * as types from './ActionTypes';

export const createRepositorySuccess = (response, successMessage) => ({
  type: types.CREATE_REPOSITORY_SUCCESS,
  payload: {response, successMessage},
});

export const createRepositoryFailure = (response, errorMessage) => ({
  type: types.CREATE_REPOSITORY_FAILURE,
  payload: {response, errorMessage},
});

export const getRepositorySuccess = repositories => ({
  type: types.GET_REPOSITORY_SUCCESS,
  payload: repositories,
});

export const renderRepositoryMessage = renderMessage => ({
  type: types.RENDER_REPOSITORY_MESSAGE,
  payload: renderMessage,
});

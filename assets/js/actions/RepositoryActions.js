import * as types from './ActionTypes';

export const createRepositorySuccess = (successMessage) => ({
  type: types.CREATE_REPOSITORY_SUCCESS,
  payload: {successMessage},
});

export const createRepositoryFailure = (errorMessage) => ({
  type: types.CREATE_REPOSITORY_FAILURE,
  payload: {errorMessage},
});

export const getRepositorySuccess = repositories => ({
  type: types.GET_REPOSITORY_SUCCESS,
  payload: repositories,
});

export const renderRepositoryMessage = renderMessage => ({
  type: types.RENDER_REPOSITORY_MESSAGE,
  payload: renderMessage,
});

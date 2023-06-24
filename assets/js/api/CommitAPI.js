import axios from 'axios';
import {reset, stopSubmit} from 'redux-form';
import store from '../store';
import {
  getCommitsSuccess, 
} from '../actions/CommitActions';
import {
  createRepositorySuccess, 
  createRepositoryFailure,
  getRepositorySuccess,
  renderRepositoryMessage,
} from '../actions/RepositoryActions';

export const getCommits = () => 
  axios
    .get(`/api/commits/`)
    .then((response) => {
      store.dispatch(getCommitsSuccess({...response.data}));
    });

export const createCommits = (values, headers, formDispatch) => 
  axios
    .post('/api/commits/create/', values, {headers})
    .then((response) => {
    }).catch((error) => {
      console.error(error);
    });

export const createRepository = (values, headers, formDispatch) => 
  axios
    .post('/api/repositories/create/', values, {headers})
    .then((response) => {
      const successMessage = `Repository '${values.name}' added successfully!`
      store.dispatch(renderRepositoryMessage(`${successMessage}`));
      store.dispatch(createRepositorySuccess(true));
      formDispatch(reset('repoCreate'));
      getRepository();
    }).catch((error) => {
      store.dispatch(renderRepositoryMessage(`${error.message}`));
      store.dispatch(createRepositoryFailure(true));
      throw error;
    });

export const getRepository = (dispatch) => {
  const endpoint = '/api/repositories/';
  return axios
    .get(endpoint)
    .then((response) => {
      store.dispatch(getRepositorySuccess({...response.data}));
    }).catch((error) => {
      store.dispatch(renderRepositoryMessage(`${error.message}`));
      throw error;
    });
};

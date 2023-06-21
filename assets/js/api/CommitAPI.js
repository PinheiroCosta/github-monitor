import axios from 'axios';
import {reset, stopSubmit} from 'redux-form';
import store from '../store';
import {
  getCommitsSuccess, 
  createCommitsSuccess,
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
      store.dispatch(createCommitsSuccess(response.data, true));
    }).catch((error) => {
      const err = error.response;
      console.error(err);
    });

export const createRepository = (values, headers, formDispatch) => 
  axios
    .post('/api/repositories/create/', values, {headers})
    .then((response) => {
      store.dispatch(renderRepositoryMessage(`Repository '${values.name}' added successfully!`));
      store.dispatch(createRepositorySuccess(response.data, true));
      formDispatch(reset('repoCreate'));
    }).catch((error) => {
      store.dispatch(renderRepositoryMessage(`Error: [${error.message}]`));
      store.dispatch(createRepositoryFailure(null, true));
      throw error;
    });


export const getRepository = (values) => {
  const repository = values && values.name ? values.name : '';
  const endpoint = repository ? `/api/repositories/?name=${repository}` : '/api/repositories/';
  return axios
    .get(endpoint)
    .then((response) => {
      store.dispatch(getRepositorySuccess({...response.data}));
    }).catch((error) => {
      console.error(error);
      throw error;
    });
};

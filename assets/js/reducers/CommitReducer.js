import * as types from '../actions/ActionTypes';

const initialState = {
  commits: [],
  successMessage: false,
  errorMessage: false,
};

const commitReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_COMMITS_SUCCESS:
      return {
        ...state,
        commits: Object.values(action.payload),
      };
    default:
      return state;
  }
};

export default commitReducer;

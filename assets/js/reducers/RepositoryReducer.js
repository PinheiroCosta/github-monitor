import * as types from '../actions/ActionTypes';

const initialState = {
  repositories: [],
  successMessage: false,
  errorMessage: false,
  renderMessage: "",
};

const repositoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_REPOSITORY_SUCCESS:
      return {
        ...state,
        repositories: Object.values(action.payload),
      };
    case types.CREATE_REPOSITORY_SUCCESS: 
      return {
        ...state, 
        successMessage: action.payload.successMessage,
        errorMessage: action.payload.successMessage ? false : state.errorMessage
      };
    case types.CREATE_REPOSITORY_FAILURE:
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
        successMessage: action.payload.errorMessage ? false : state.successMessage
      };
    case types.RENDER_REPOSITORY_MESSAGE:
      return {
        ...state,
        renderMessage: action.payload,
      };
    default:
      return state;
  }
};

export default repositoryReducer;

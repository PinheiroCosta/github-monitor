import React from 'react';
import PropTypes from 'prop-types';
import Form from '../components/RepoCreateForm';
import {connect} from 'react-redux';
import {reset, stopSubmit} from 'redux-form';
import {
  createRepository, 
  getRepository
} from '../api/CommitAPI';
import {
  getRepositorySuccess, 
  createRepositoryFailure, 
  createRepositorySuccess,
  renderRepositoryMessage,
} from '../actions/RepositoryActions';

class RepoCreateContainer extends React.Component {
  submit = (values, dispatch) => {
    const token = document.getElementById('main').dataset.csrftoken;
    const name = values.name.split('/')[1];
    const v = {...values, name};

    const {repositories} = this.props;
    const repositoryAlreadyAdded = repositories.map(object => object.name).includes(name);
    if (repositoryAlreadyAdded) {
      dispatch(renderRepositoryMessage(`Repository '${name}' already added`));
      dispatch(createRepositoryFailure(null, true));
      return;
    } 

    const repoDoesntExists = 0; //TODO
    if (repoDoesntExists){
      dispatch(renderRepositoryMessage(`Repository '${name}' doesn't exists in your github account`));
      dispatch(createRepositoryFailure(null, true));
      return
    }

    return createRepository(v, {'X-CSRFToken': token}, dispatch)
      .then(getRepository(name));
  };

  render() {
    const {successMessage, errorMessage, renderMessage} = this.props;
    return (
      <Form 
        onSubmit={this.submit} 
        successMessage={successMessage}
        errorMessage={errorMessage}
        renderMessage={renderMessage}
      />
    );
  }
}

RepoCreateContainer.propTypes = {
  successMessage: PropTypes.bool.isRequired,
  errorMessage: PropTypes.bool.isRequired,
  repositories: PropTypes.arrayOf(PropTypes.object).isRequired,
  renderMessage: PropTypes.string,
};

const mapStateToProps = state => ({
  successMessage: state.repositoryState.successMessage,
  errorMessage: state.repositoryState.errorMessage,
  repositories: state.repositoryState.repositories,
  renderMessage: state.repositoryState.renderMessage,
});

export default connect(mapStateToProps)(RepoCreateContainer);

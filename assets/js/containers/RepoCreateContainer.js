import React from 'react';
import PropTypes from 'prop-types';
import Form from '../components/RepoCreateForm';
import {connect} from 'react-redux';
import {
  createRepository, 
  getRepository
} from '../api/CommitAPI';
import {
  getRepositorySuccess, 
  createRepositoryFailure, 
  createRepositorySuccess
} from '../actions/RepositoryActions';

class RepoCreateContainer extends React.Component {
  submit = (values, dispatch) => {
    const token = document.getElementById('main').dataset.csrftoken;
    const name = values.name.split('/')[1];
    const v = {...values, name};

    const {repositories} = this.props;
    const repositoryExists = repositories.some(object => object.name === name);
    if (!repositoryExists) {
      return createRepository(v, {'X-CSRFToken': token}, dispatch)
        .then(getRepository(name));
    }

    dispatch(createRepositoryFailure(null, true));
    dispatch(createRepositorySuccess(null, false));
  };

  render() {
    const {successMessage, errorMessage} = this.props;
    return (
      <Form 
        onSubmit={this.submit} 
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
    );
  }
}

RepoCreateContainer.propTypes = {
  successMessage: PropTypes.bool.isRequired,
  errorMessage: PropTypes.bool.isRequired,
  repositories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  successMessage: state.repositoryState.successMessage,
  errorMessage: state.repositoryState.errorMessage,
  repositories: state.repositoryState.repositories,
});

export default connect(mapStateToProps)(RepoCreateContainer);

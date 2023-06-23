import React from 'react';
import PropTypes from 'prop-types';
import Form from '../components/RepoCreateForm';
import {connect} from 'react-redux';
import {reset, stopSubmit} from 'redux-form';
import {getGithubCommits} from '../api/GithubAPI';
import {
  createRepository, 
  getRepository,
} from '../api/CommitAPI';
import {
  getRepositorySuccess, 
  createRepositoryFailure, 
  createRepositorySuccess,
  renderRepositoryMessage,
} from '../actions/RepositoryActions';

class RepoCreateContainer extends React.Component {
  submit = (values, dispatch) => {
    const {repositories} = this.props;
    const token = document.getElementById('main').dataset.csrftoken;
    const [user, name] = values.name.split('/');
    const v = {...values, name, user};
    console.log(v);

    const repositoryAdded = repositories.map(object => object.name).includes(name);
    if (repositoryAdded) {
      dispatch(renderRepositoryMessage(`Repository '${name}' already added`));
      dispatch(createRepositoryFailure(true));
      return;
    } 
    return createRepository(v, {'X-CSRFToken': token}, dispatch)
      .then(getRepository(dispatch))
      .catch(error => {
        console.error(error);
      });
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

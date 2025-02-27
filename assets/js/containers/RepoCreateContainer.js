import React from 'react';
import PropTypes from 'prop-types';
import Form from '../components/RepoCreateForm';
import {connect} from 'react-redux';
import {reset} from 'redux-form';
import {getGithubCommits, mapCommitsData} from '../api/GithubAPI';
import {
  createRepository, 
  getRepository,
  createCommits,
  getCommits,
} from '../api/CommitAPI';
import {
  createRepositoryFailure, 
  renderRepositoryMessage,
} from '../actions/RepositoryActions';

class RepoCreateContainer extends React.Component {
  submit = (values, dispatch) => {
    const {repositories, commits} = this.props;
    const token = document.getElementById('main').dataset.csrftoken;
    const [user, name] = values.name.split('/');
    const v = {...values, name, user};

    const repositoryAdded = repositories.map(object => object.name).includes(name);
    if (repositoryAdded) {
      dispatch(renderRepositoryMessage(`Repository '${name}' already added`));
      dispatch(createRepositoryFailure(true));
      dispatch(reset('repoCreate'));
      return;
    } 

    return getGithubCommits(user, name, dispatch)
      .then((response) => {
        if (response.status === 404) {
          const errorMessage = `Repository '${name}' not found in GitHub.`
          dispatch(renderRepositoryMessage(`${errorMessage}`));
          dispatch(createRepositoryFailure(true));
          dispatch(reset('repoCreate'));
          return;
        }

        if (response.status === 200) {
          return createRepository(v, {'X-CSRFToken': token}, dispatch)
            .then(() => {
              const {data} = response;
              const commits = mapCommitsData(name, data); 
              return createCommits(commits, {'X-CSRFToken': token}, dispatch);
            })
            .then(() => {
              getCommits();
            })
            .catch((error) => {
              const errorMessage = `Error creating commits: ${error.message}`;
              dispatch(renderRepositoryMessage(errorMessage));
              dispatch(createRepositoryFailure(true));
            });
        } else {
          const errorMessage = `Failed to communicate with Github.`
          dispatch(renderRepositoryMessage(`${errorMessage}`));
          dispatch(createRepositoryFailure(true));
          return;
        }

      })
      .catch(error => {
        dispatch(renderRepositoryMessage(`${error}`));
        dispatch(createRepositoryFailure(true));
        dispatch(reset('repoCreate'));
        return;
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

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getRepository} from '../api/CommitAPI';
import {getRepositorySuccess} from '../actions/RepositoryActions'
import RepoList from '../components/RepoList';

class RepoListContainer extends React.Component {
  componentDidMount() {
    getRepository(); 
  }

  render() {
    const {repositories} = this.props;
    return (
      <div>
        <RepoList repositories={repositories} />
      </div>
    );
  }
}

RepoListContainer.propTypes = {
  repositories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = store => ({
    repositories: store.repositoryState.repositories,
});

export default connect(mapStateToProps)(RepoListContainer);

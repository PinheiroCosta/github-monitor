import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getRepository} from '../api/CommitAPI';
import {getRepositorySuccess} from '../actions/RepositoryActions'
import Sidebar from '../components/Sidebar';

class SidebarContainer extends React.Component {
  componentDidMount() {
    getRepository(); 
  }

  render() {
    const {repositories} = this.props;
    return (
      <div>
        <Sidebar repositories={repositories} />
      </div>
    );
  }
}

SidebarContainer.propTypes = {
  repositories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = store => ({
    repositories: store.repositoryState.repositories,
});

export default connect(mapStateToProps)(SidebarContainer);

import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Sidebar from '../components/Sidebar';
import {connect} from 'react-redux';
import {getRepository} from '../api/CommitAPI';
import {getRepositorySuccess} from '../actions/RepositoryActions'

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
  repositories: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = store => {
  const {repositories} = store.repositoryState;
  return {
    repositories: repositories,
  };
};

export default connect(mapStateToProps)(SidebarContainer);

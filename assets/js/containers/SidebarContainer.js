import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Sidebar from '../components/Sidebar';
import {getRepositoriesSuccess} from '../actions/RepositoryActions'

class SidebarContainer extends React.Component {
  state = {
    repositories: [],
    loading: true,
  };

  componentDidMount() {
    this.fetchRepositories(); 
  }

  fetchRepositories = () => {
    axios
      .get('/api/repositories/')
      .then(response => {
        const repositories = response.data;
        console.log(repositories);
        this.setState({repositories, loading: false});
      }).catch(error => console.error(error));
  }

  render() {
    const {repositories, loading} = this.state;

    return (
      <div>
        {loading 
          ? (<p>Loading...</p>) 
          : (<Sidebar repositories={repositories} />)
        }
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

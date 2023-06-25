import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getCommits } from '../../api/CommitAPI';


const RepoList = (props) => {
  const {repositories} = props;
  if (!repositories) {
    return null;
  }
  return (
    <div id="sidebar-wrapper">
      <ul className="sidebar-nav">
        <li className="sidebar-brand">
          <Link 
          to="/"
          onClick={() => getCommits()}>
            Github Monitor
          </Link>
        </li>
        {repositories.map((repository) => (
          <li key={repository.id} className="text-center">
            <Link 
            to={"/"}
            onClick={() => getCommits(repository.name)}>
            {repository.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

RepoList.propTypes = {
  repositories: PropTypes.arrayOf(PropTypes.object),
};

export default RepoList;

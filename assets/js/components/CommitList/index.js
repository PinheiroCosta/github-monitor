import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getCommits } from '../../api/CommitAPI';

const CommitList = (props) => {
  const {commits} = props;
  return (
    <div>
      {commits.length !== 0 && (
        <div>
          <div className="card card-outline-secondary my-4">
            <div className="card-header">
              Commit List
            </div>

            <div className="card-body commit-list">
              {commits.map((commit, index) => (
                <div key={commit.sha}>
                  <div className="avatar">
                    <img alt={commit.author} className="img-author" src={commit.avatar} />
                  </div>
                  <div className="commit-details">
                    <p>
                      {commit.message}
                    </p>
                    <small className="text-muted">
                      <Link 
                        to={"/"}
                        onClick={() => getCommits(null, commit.author)}
                      >{commit.author}
                      </Link>
                      {' '}
                      authored
                      {' '}
                      on
                      {' '}
                      <Link 
                        to={"/"}
                        onClick={() => getCommits(commit.repository)}
                      >{commit.repository}
                      </Link>
                      {' '}
                      at
                      {' '}
                      {commit.date}
                    </small>
                    {index !== commits.length - 1 && <hr />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

CommitList.propTypes = {
  commits: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CommitList;

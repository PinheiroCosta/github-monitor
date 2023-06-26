import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCommits} from '../api/CommitAPI';
import CommitList from '../components/CommitList';
import Pagination from '../components/Pagination';

class CommitListContainer extends React.Component {
  componentDidMount() {
    getCommits();
  }

  onPageChange = (page) => {
    console.log('Mudou para a página', page);
  }

  render() {
    const currentPage = 1;
    const totalPages = 10;
    const OnPageChange = () => {};

    const {commits} = this.props;
    return (
      <div>
        <CommitList commits={commits} />
        <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={this.onPageChange}/>
      </div>
    );
  }
}

CommitListContainer.propTypes = {
  commits: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = store => ({
  commits: store.commitState.commits,
});

export default connect(mapStateToProps)(CommitListContainer);

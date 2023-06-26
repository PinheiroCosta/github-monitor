import { connect } from 'react-redux';
import Pagination from '../components/Pagination';

class PaginationContainer extends React.Component {
  handleClickPage = (pageNumber) => {
  };

  render() {
    const { currentPage, totalPages } = this.props;
    return (
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={this.handleClickPage}
      />
    );
  }
}

PaginationContainer.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};

const mapStateToProps = (store) => ({
  currentPage: store.paginationState.currentPage,
  totalPages: store.paginationState.totalPages,
});

export default connect(mapStateToProps)(PaginationContainer);

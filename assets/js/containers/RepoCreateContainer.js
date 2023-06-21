import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createRepository, getRepository} from '../api/CommitAPI';
import Form from '../components/RepoCreateForm';

class RepoCreateContainer extends React.Component {
  submit = (values, dispatch) => {
    const token = document.getElementById('main').dataset.csrftoken;
    const name = values.name.split('/')[1];
    const v = {...values, name};
    return createRepository(v, {'X-CSRFToken': token}, dispatch)
      .then(getRepository());
  };

  render() {
    const {successMessage, errorMessage} = this.props;
    return (
      <Form 
        onSubmit={this.submit} 
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
    );
  }
}

RepoCreateContainer.propTypes = {
  successMessage: PropTypes.bool.isRequired,
  errorMessage: PropTypes.bool.isRequired,
};

const mapStateToProps = store => ({
  successMessage: store.repositoryState.successMessage,
  errorMessage: store.repositoryState.errorMessage,
});

export default connect(mapStateToProps)(RepoCreateContainer);

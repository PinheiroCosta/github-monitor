import React from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import validate from '../validations';

const renderField = ({
  input, placeholder, className, type, meta: {touched, error, invalid},
}) => (
    <div>
      <input
        {...input}
        placeholder={placeholder}
        className={`${className} ${touched && invalid ? 'is-invalid' : ''}`}
        type={type}
      />
      {touched
        && ((error && (
          <div className="invalid-feedback">
            {error}
          </div>
        )))
      }
    </div>
  );

renderField.propTypes = {
  input: PropTypes.object.isRequired,
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
};

const RepoCreateForm = (props) => {
  const {
    successMessage, errorMessage, handleSubmit, pristine, submitting, renderMessage,
  } = props;
  return (
    <div>
      {successMessage
        && (
          <div className="alert alert-success" role="alert">
            {renderMessage}
          </div>
        )}
      {errorMessage 
        && (
        <div className="alert alert-danger" role="alert">
          {renderMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="col-10">
            <Field
              name="name"
              placeholder="Enter the repository name, must match {user}/{repo}"
              className="form-control"
              component={renderField}
              type="text"
            />
          </div>
          <div className="col-2">
            <button disabled={pristine || submitting} className="btn btn-block btn-primary" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

RepoCreateForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  successMessage: PropTypes.bool.isRequired,
  errorMessage: PropTypes.bool.isRequired,
  renderMessage: PropTypes.string,
};

export default reduxForm({
  form: 'repoCreate',
  validate,
})(RepoCreateForm);

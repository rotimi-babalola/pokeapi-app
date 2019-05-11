import React from 'react';
import PropTypes from 'prop-types';

import '../styles/loading.scss';

const Loading = ({ size }) => (
  <div className="loading-wrapper">
    <div className={`spinner-border ${size}`} role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

Loading.defaultProps = {
  size: 'large',
};

Loading.propTypes = {
  size: PropTypes.string,
};

export default Loading;

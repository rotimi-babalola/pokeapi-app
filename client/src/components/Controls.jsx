import React from 'react';
import PropTypes from 'prop-types';

import '../styles/controls.scss';

const Controls = ({ onChange, onInputChange }) => (
  <div className="controls-container">
    <div className="select-container">
      <p>Sort by: </p>
      <select className="form-control select" onChange={onChange}>
        <option value="default">Default</option>
        <option value="name">Pokemon Name</option>
      </select>
    </div>
    <input
      type="text"
      className="form-control"
      placeholder="Search by name"
      onChange={onInputChange}
    />
  </div>
);

Controls.propTypes = {
  onChange: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default Controls;

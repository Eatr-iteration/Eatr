import React from 'react';
import PropTypes from 'prop-types';

function HomeScene({ onClick }) {
  return (
    <form>
      <label htmlFor="location" className="hidden">Location:</label>
      <input type="text" id="location" placeholder="Location" />
      <label htmlFor="category" className="hidden">Category:</label>
      <input type="text" id="category" placeholder="Category" />
      <input type="submit" value="Submit " id="submit" onClick={onClick} />
    </form>
  );
}
HomeScene.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default HomeScene;

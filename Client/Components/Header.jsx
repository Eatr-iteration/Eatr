import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function Header({ onClick }) {
  const scene = useSelector((store) => store.setScene.sceneState);
  const hideFavorites = useSelector((store) => store.favs.favsList.length < 4);
  switch (scene) {
    case 'feed':
      return (
        <section className="header">
          <button id="back" onClick={onClick} type="button">Back</button>
          <h1>Eatr</h1>
          <button id="favorites" disabled={hideFavorites} onClick={onClick} type="button">Favorites</button>
        </section>
      );
    case 'favorites':
      return (
        <section className="header">
          <button id="back" onClick={onClick} type="button">Back</button>
          <h1>Eatr</h1>
          <p>Congrats! Here are your liked options</p>
        </section>
      );
    default:
      return (
        <section className="title">
          <h1>Eatr</h1>
        </section>
      );
  }
}

Header.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Header;

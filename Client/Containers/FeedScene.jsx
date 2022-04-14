import React from 'react';
import { useDispatch } from 'react-redux';

import { getNextActionCreator, addToFavActionCreator } from '../Actions/actions.js';

import RestaurantCard from '../Components/RestaurantCard.jsx';

function FeedScene() {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    if (e.target.parentNode.parentNode.id === 'like') dispatch(addToFavActionCreator());
    dispatch(getNextActionCreator());
  };

  return (
    <>
      <RestaurantCard index={null} />
      <aside>
      <button onClick={handleClick} id="dislike" type="button" aria-label="dislike" className="like-dislike"><p><span className="bi bi-emoji-frown" /></p></button>
      <button onClick={handleClick} id="like" type="button" aria-label="like" className="like-dislike"><p><span className="bi bi-emoji-smile" /></p></button>
      </aside>
    </>
  );
}

export default FeedScene;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setSceneActionCreator, getRestaurantsActionCreator } from '../Actions/actions.js';

import Header from '../Components/Header.jsx';
import HomeScene from './HomeScene.jsx';
import FeedScene from './FeedScene.jsx';
import FavoritesScene from './FavoritesScene.jsx';

function MainContainer() {
  const dispatch = useDispatch();
  const scene = useSelector((store) => store.setScene.sceneState);
  const handleSceneChange = (e) => {
    if (scene === 'feed' && e.target.id === 'back') dispatch(setSceneActionCreator('home'));
    else if (scene === 'feed' && e.target.id === 'favorites') dispatch(setSceneActionCreator('favorites'));
    else if (scene === 'favorites' && e.target.id === 'back') dispatch(setSceneActionCreator('feed'));
    else dispatch(setSceneActionCreator('feed'));
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();
    const form = e.target.parentNode;
    const searchLocation = form.children[1].value;
    const searchTerm = form.children[2].value;
    dispatch(getRestaurantsActionCreator({ searchTerm, searchLocation }));
    handleSceneChange(e);
  };

  const renderSwitch = () => {
    switch (scene) {
      case 'feed':
        return (
          <FeedScene />
        );
      case 'favorites':
        return (
          <FavoritesScene />
        );
      default:
        return (
          <HomeScene onClick={handleFormSubmission} />
        );
    }
  };

  return (
    <>
      <Header onClick={handleSceneChange} />
      {renderSwitch()}
    </>
  );
}

export default MainContainer;

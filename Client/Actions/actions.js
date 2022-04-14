import axios from 'axios';
import Cookies from 'js-cookie';
import * as types from '../Constants/actionTypes.js';

export const getRestaurantsActionCreator = (body) => async (dispatch) => {
  const restaurants = await axios.get('/restaurants', {
    params: body,
  });
  dispatch({
    type: types.GET_RESTAURANTS,
    payload: restaurants.data,
  });
};

export const addToFavActionCreator = () => async (dispatch, getState) => {
  const favorite = await getState().restaurants.restaurantList[0];
  console.log('actions', Cookies.get('isLoggedIn'), favorite.id);
  const addFavorite = await axios.post('/addfavorite', {
    userId: Cookies.get('isLoggedIn'),
    restId: favorite.id,
  });
  dispatch({
    type: types.ADD_TO_FAVS,
    payload: favorite,
  });
};

export const getFavsActionCreator = () => async (dispatch) => {
  const favRestaurants = await axios.post('/getfavorites', {
    userId: Cookies.get('isLoggedIn'),
  });
  dispatch({
    type: types.GET_FAVS,
    payload: favRestaurants.data,
  });
};

export const getNextActionCreator = () => ({
  type: types.GET_NEXT,
});

export const setSceneActionCreator = (scene) => ({
  type: types.SET_SCENE,
  payload: scene,
});

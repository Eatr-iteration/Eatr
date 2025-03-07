import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function RestaurantCard({ index }) {
  const scene = useSelector((store) => store.setScene.sceneState);
  const isLoading = useSelector((store) => store.restaurants.restaurantList.length === 0);
  let business;
  // If the scene is favorites, display the info for the restaurant at the current index of the
  // favsList array
  if (scene === 'favorites') business = useSelector((store) => store.favs.favsList[index]);
  // otherwise display whatever is the first restaurant in the restaurantsList array
  else business = useSelector((store) => store.restaurants.restaurantList[0]);

  switch (isLoading) {
    case true:
      return (<p className="loading">loading...</p>);
    default: {
      const { location } = business;
      const formattedAddress = `${location.address1} ${location.address2 ? location.address2 : ''}\n${location.city}, ${location.state} ${location.zip_code}`;
      return (
        <article className="restaurant-card">
          <h3>{business.name}</h3>
          <img className="restaurantImg" src={business.image_url} alt="main restaurant profile pic" />
          <section className="review-info">
            <p>
              Avg. Review:
              {business.rating}
            </p>
            <p>
              # of Reviews:
              {business.review_count}
            </p>
          </section>
          <section className="business-info">
            <p>
              Price:
              {business.price}
            </p>
            <p>{business.hours.start}</p>
          </section>
          <section className="location-info">
            Location:
            {formattedAddress}
          </section>
        </article>
      );
    }
  }
}
RestaurantCard.propTypes = {
  index: PropTypes.number,
};
export default RestaurantCard;

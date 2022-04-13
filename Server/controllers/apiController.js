// const apiSearch = require('../api');
import express from 'express';
import yelp from 'yelp-fusion';
// import Scraper from '../scraper.js';

('use strict');
const client = yelp.client(
  'xKtPwI4Rj7xRNlLYekgqpwlRmgtq0dUxBeYWDsbCTQhqUnqFSRluOURoDbvvXQ3G9kLWR7c3rmmNB92Ofr8cBgpy5mk4U2WdQIKWINQFGyXWG7anfSLSenMmWEFUYnYx',
);

const apiController = {
  async getRestaurantList(req, res, next) {
    const { searchTerm, searchLocation } = req.query;
    try {
      const queryObj = {
        term: searchTerm,
        location: searchLocation,
        limit: 10,
        sort_by: 'best_match',
        categories: 'restaurants',
      };
      const response = await client.search(queryObj);
      const { businesses } = response.jsonBody;
      // console.log(businesses.length)

      const now = new Date();
      const day = now.getDay();
      // only return restaurants that are currently open
      for (let i = 0; i < businesses.length; i++) {
        const respo = await client.business(businesses[i].alias);
        businesses[i].hours = respo.jsonBody.hours[0].open[day];
        // console.log("calling:", i)
        // const photos = await Scraper.scrapePhotos(businesses[i].alias);
        // businesses[i].photos = photos;
      }

      // this works if we can get around rate limiting
      // await Promise.allSettled(businesses.map(async (business) => {
      //   const resp = await client.business(business.alias)
      //   business.hours = resp.jsonBody.hours[0].open[day];
      //   // console.log("calling:", i)
      //   // const photos = await Scraper.scrapePhotos(businesses[i].alias);
      //   // businesses[i].photos = photos;
      // }));
      res.locals.restaurants = businesses;
      return next();
    } catch (error) {
      console.log(error);
      return next({
        log: `Error caught in apiController.getRestaurantList middleware ${error}`,
        message: {
          error: 'apiController.getRestaurantList ERROR: Check server logs for details',
        },
      });
    }
  },
};

export default apiController;

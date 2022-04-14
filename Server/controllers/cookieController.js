const cookieController = {};

cookieController.setLoginCookie = (req, res, next) => {
  console.log('in cookies!');
  try {
    res.cookie('isLoggedIn', `${res.locals.userId}`);
  } catch (err) {
    return next(err);
  }
  return next();
};

export default cookieController;

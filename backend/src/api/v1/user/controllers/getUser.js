const getUser = (req, res, next) => {
  try {
    res.status(200).json({ data: req.user });
  } catch (error) {
    next(error);
  }
};

module.exports = getUser;

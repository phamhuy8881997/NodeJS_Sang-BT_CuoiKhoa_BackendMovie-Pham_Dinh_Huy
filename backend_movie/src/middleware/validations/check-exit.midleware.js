const checkExit = (Modal) => async (req, res, next) => {
  try {
    const { id } = req.params;
    const Details = await Modal.findByPk(id);
    if (Details) {
      req.DetailsInfo = Details;
      next();
    } else {
      res.status(200).send({
        message: "id không tồn tại",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "loi sever",
      error,
    });
  }
};

module.exports = {
  checkExit,
};

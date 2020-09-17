const { Cookie, Bakery } = require("../db/models");

exports.fetchCookie = async (cookieId, next) => {
  try {
    const cookie = await Cookie.findByPk(cookieId);
    return cookie;
  } catch (error) {
    next(error);
  }
};

exports.cookieList = async (req, res) => {
  try {
    const cookies = await Cookie.findAll({
      attributes: { exclude: ["bakeryId", "createdAt", "updatedAt"] },
      include: {
        model: Bakery,
        as: "bakery",
        attributes: ["name"],
      },
    });
    res.json(cookies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.cookieUpdate = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    await req.cookie.update(req.body);
    res.status(204).end();
  } catch (err) {
    next(error);
  }
};

exports.cookieDelete = async (req, res) => {
  try {
    await req.cookie.destroy();
    res.status(204).end();
  } catch (err) {
    next(error);
  }
};

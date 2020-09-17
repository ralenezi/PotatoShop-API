const { Bakery, Cookie } = require("../db/models");

exports.fetchBakery = async (bakeryId, next) => {
  try {
    const bakery = await Bakery.findByPk(bakeryId);
    return bakery;
  } catch (error) {
    next(error);
  }
};

exports.cookieCreate = async (req, res, next) => {
  try {
    if (req.user.id === req.bakery.userId) {
      if (req.file) {
        req.body.image = `${req.protocol}://${req.get("host")}/media/${
          req.file.filename
        }`;
      }
      req.body.bakeryId = req.bakery.id;
      const newCookie = await Cookie.create(req.body);
      res.status(201).json(newCookie);
    } else {
      const err = new Error("Unauthorized");
      err.status = 401;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

exports.bakeryCreate = async (req, res, next) => {
  try {
    const foundBakery = await Bakery.findOne({
      where: { userId: req.user.id },
    });
    if (foundBakery) {
      const err = new Error("You already have a bakery");
      err.status = 400;
      next(err);
    }

    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    req.body.userId = req.user.id;
    const newbakery = await Bakery.create(req.body);
    res.status(201).json(newbakery);
  } catch (error) {
    next(error);
  }
};

exports.bakeryList = async (req, res) => {
  try {
    const bakeries = await Bakery.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Cookie,
          as: "cookies",
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });
    res.json(bakeries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.bakeryUpdate = async (req, res, next) => {
  try {
    if (req.user.role === "admin" || req.user.id === req.bakery.userId) {
      if (req.file) {
        req.body.image = `${req.protocol}://${req.get("host")}/media/${
          req.file.filename
        }`;
      }
      await req.bakery.update(req.body);
      res.status(204).end();
    } else {
      const err = new Error("Unauthorized");
      err.status = 401;
      next(err);
    }
  } catch (err) {
    next(error);
  }
};

exports.bakeryDelete = async (req, res, next) => {
  try {
    if (req.user.role === "admin" || req.user.id === req.bakery.userId) {
      await req.bakery.destroy();
      res.status(204).end();
    } else {
      const err = new Error("Unauthorized");
      err.status = 401;
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

const express = require("express");
const router = express.Router();
const {
  cookieList,
  cookieUpdate,
  cookieDelete,
  fetchCookie,
} = require("../controllers/cookieController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${+new Date()}${file.originalname}`);
  },
});

const upload = multer({
  storage,
});

router.param("cookieId", async (req, res, next, cookieId) => {
  const cookie = await fetchCookie(cookieId, next);
  if (cookie) {
    req.cookie = cookie;
    next();
  } else {
    const err = new Error("Cookie Not Found");
    err.status = 404;
    next(err);
  }
});

// Cookie List
router.get("/", cookieList);

// Cookie Update
router.put("/:cookieId", upload.single("image"), cookieUpdate);

// Cookie Delete
router.delete("/:cookieId", cookieDelete);

module.exports = router;

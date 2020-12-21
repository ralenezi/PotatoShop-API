const express = require('express')
const multer = require('multer')
const passport = require('passport')
const {
  bakeryCreate,
  bakeryList,
  bakeryUpdate,
  bakeryDelete,
  fetchBakery,
  cookieCreate,
} = require('../controllers/bakeryController')

const storage = multer.diskStorage({
  destination: './media',
  filename: (req, file, cb) => {
    cb(null, `${+new Date()}${file.originalname}`)
  },
})

const upload = multer({
  storage,
})

const router = express.Router()

router.param('bakeryId', async (req, res, next, bakeryId) => {
  const bakery = await fetchBakery(bakeryId, next)
  if (bakery) {
    req.bakery = bakery
    next()
  } else {
    const err = new Error('Bakery Not Found')
    err.status = 404
    next(err)
  }
})

// Bakery List
router.get('/', bakeryList)

// Bakery Create
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  upload.single('image'),
  bakeryCreate
)

// Bakery Update
router.put(
  '/:bakeryId',
  passport.authenticate('jwt', { session: false }),
  upload.single('image'),
  bakeryUpdate
)

// Bakery Delete
router.delete(
  '/:bakeryId',
  passport.authenticate('jwt', { session: false }),
  bakeryDelete
)

// Cookie Create
router.post(
  '/:bakeryId/cookies',
  passport.authenticate('jwt', { session: false }),
  upload.single('image'),
  cookieCreate
)

module.exports = router

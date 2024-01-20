const express = require("express");


const KeyController = require('../controllers/keys')

const Key = require("../models/key");
const checkAuth = require('../middleware/check-auth')
const extractFile = require('../middleware/file')

const router = express.Router();



router.post(
  "",
  checkAuth,extractFile
  , KeyController.createKey
);

router.put(
  "/:id",
  checkAuth,
  extractFile, KeyController.updateKey
);

router.get("", KeyController.getKeys);

router.get("/:id", KeyController.getKey);

router.delete("/:id", checkAuth, KeyController.deleteKey);

module.exports = router;

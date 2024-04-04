const express = require('express');
const router = express.Router();

const { createUser, loginUser, uploadPhoto, sendEmailToUser } = require('../controllers/userController');

router.post("/signup", createUser);
router.post("/upload-photo", uploadPhoto);
router.post("/email-verification", sendEmailToUser);
router.post("/login", loginUser);

module.exports = router;

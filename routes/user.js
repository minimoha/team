const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");

router.post("/auth/create-user", userCtrl.createUser);
router.get("/auth/signin", userCtrl.signIn);

module.exports = router;

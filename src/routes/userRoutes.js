const express = require("express");
const UserController = require("../controllers/userController");

const router = express.Router();
const userCtrl = new UserController();

router.post("/", userCtrl.createUser);
router.get("/", userCtrl.getUsers);
router.get("/:_id", userCtrl.getUser);
router.patch("/:_id", userCtrl.editUser);
router.post("/:_id/edit", userCtrl.editUser);

module.exports = router;

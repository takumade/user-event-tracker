const express = require("express");
const UserController = require("../controllers/userController");

const router = express.Router();
const userCtrl = new UserController();

router.post("/", userCtrl.createUser);
router.get("/", userCtrl.getUsers);
router.get("/:_id", userCtrl.getUser);
router.post("/:_id/events", userCtrl.getUserEvents);
router.patch("/:_id", userCtrl.editUser);
router.post("/:_id/edit", userCtrl.editUser);
router.get("/:_id/logs", userCtrl.getUserLogs);

module.exports = router;

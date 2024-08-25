const express = require("express");
const UserController = require("../controllers/userController");

const router = express.Router();
const userCtrl = new UserController();

router.post("/", userCtrl.createUser);
router.get("/", userCtrl.getUsers);
router.post("/:_id/events", userCtrl.getUserEvents);
router.get("/:_id/logs", userCtrl.getUserLogs);

module.exports = router;

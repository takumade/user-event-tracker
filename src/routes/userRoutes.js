const express = require("express");
const UserController = require("../controllers/userController");

const router = express.Router();
const userCtrl = new UserController();

router.post("/api/users", userCtrl.createUser);
router.get("/api/users", userCtrl.getUsers);
router.post("/api/users/:_id/exercises", userCtrl.getUserExercises);
router.get("/api/users/:_id/logs", userCtrl.getUserLogs);

module.exports = router;

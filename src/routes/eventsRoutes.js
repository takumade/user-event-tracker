const express = require("express");
const EventsController = require("../controllers/eventsController");



const router = express.Router();
const eventsCtrl = new EventsController();



router.post("/", eventsCtrl.createEvent);
router.get("/", eventsCtrl.getEvents);
router.get("/:_id", eventsCtrl.getEvent);
router.patch("/:_id", eventsCtrl.editEvent);
router.post("/:_id/edit", eventsCtrl.editEvent);


module.exports = router;
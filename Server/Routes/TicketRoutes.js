const express = require("express");

const {
    createTicket,
    getAllTickets,
} = require("../Controllers/TicketController");

const router = express.Router();

router.post("/",createTicket);
router.get("/",getAllTickets);

module.exports = router;
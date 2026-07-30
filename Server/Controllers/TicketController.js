const Ticket = require("../Models/TicketModels");
// Create Ticket
const createTicket = async(req,res) => {
    try{
        const ticket = await Ticket.create(req.body);
        res.status(201).json({
            success : true,
            message : "Ticket Created Successfully",
            ticket,
        });
        console.log(req.body);
    }catch (error){
        res.status(500).json({
            success : false,
            message : error.message,
        });
        console.log(error.message);
    }
};

// GET All Users
const getAllTickets = async(req,res) => {
    try{
        const tickets = await Ticket.find();
        res.status(200).json({
            success : true,
            totalTickets : tickets.length,
            tickets,
        });
        console.log(tickets);
    }catch(error){
        res.status(500).json({
            success : false,
            message : error.message,
        });
        console.log(error.message);
    }
};

module.exports = {createTicket,getAllTickets};
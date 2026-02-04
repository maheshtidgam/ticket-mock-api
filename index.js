const express = require("express");
const cors = require("cors");
const data = require("./db.json");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const tickets = data;

/* GET all tickets */
app.get("/api/tickets", (req, res) => {
  res.json({
    success: true,
    count: tickets.length,
    data: tickets,
  });
});

/* GET ticket by ticketId */
app.get("/api/tickets/:ticketId", (req, res) => {
  const ticket = tickets.find((t) => t.ticketId === req.params.ticketId);

  if (!ticket) {
    return res.status(404).json({
      success: false,
      message: "Ticket not found",
    });
  }

  res.json({
    success: true,
    data: ticket,
  });
});

/* GET audit trail */
app.get("/api/tickets/:ticketId/audit-trail", (req, res) => {
  const ticket = tickets.find((t) => t.ticketId === req.params.ticketId);

  if (!ticket) {
    return res.status(404).json({
      success: false,
      message: "Ticket not found",
    });
  }

  res.json({
    success: true,
    ticketId: ticket.ticketId,
    data: ticket.auditTrail,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

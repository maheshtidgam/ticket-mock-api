const express = require("express");
const cors = require("cors");
const ticketData = require("./db.json");

const app = express();

// IMPORTANT: use Render-provided PORT
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

/* ---------------- ROOT ROUTE ---------------- */
app.get("/", (req, res) => {
  res.send("Mock Ticket API is running 🚀");
});

/* ---------------- GET ALL TICKETS ---------------- */
app.get("/api/tickets", (req, res) => {
  const tickets = Object.values(ticketData);

  res.json({
    success: true,
    count: tickets.length,
    data: tickets,
  });
});

/* ---------------- GET SINGLE TICKET ---------------- */
app.get("/api/tickets/:ticketId", (req, res) => {
  const { ticketId } = req.params;
  const ticket = ticketData[ticketId];

  if (!ticket) {
    return res.status(404).json({
      success: false,
      message: `Ticket with ID ${ticketId} not found`,
    });
  }

  res.json({
    success: true,
    data: ticket,
  });
});

/* ---------------- GET AUDIT TRAIL ---------------- */
app.get("/api/tickets/:ticketId/audit-trail", (req, res) => {
  const { ticketId } = req.params;
  const ticket = ticketData[ticketId];

  if (!ticket) {
    return res.status(404).json({
      success: false,
      message: `Ticket with ID ${ticketId} not found`,
    });
  }

  res.json({
    success: true,
    ticketId,
    data: ticket.auditTrail,
  });
});

/* ---------------- START SERVER ---------------- */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require("express");
const cors = require("cors");
const ticketData = require("./db.json");
const ckycData = require("./ckyc.json");

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

/* ---------------- GET ALL CKYC RECORDS ---------------- */
app.get("/api/ckyc", (req, res) => {
  res.json({
    success: true,
    count: ckycData.length,
    data: { ckycRecords: ckycData },
  });
});

/* ---------------- GET CKYC BY ID ---------------- */
app.get("/api/ckyc/:id", (req, res) => {
  const { id } = req.params;
  const record = ckycData.find((r) => r.id === id);

  if (!record) {
    return res.status(404).json({
      success: false,
      message: `CKYC record with ID ${id} not found`,
    });
  }

  res.json({
    success: true,
    data: record,
  });
});

/* ---------------- GET CKYC BY CKYC NUMBER ---------------- */
app.get("/api/ckyc/ckycno/:ckycNo", (req, res) => {
  const { ckycNo } = req.params;
  const record = ckycData.find((r) => r.ckycNo === ckycNo);

  if (!record) {
    return res.status(404).json({
      success: false,
      message: `CKYC record with CKYC No ${ckycNo} not found`,
    });
  }

  res.json({
    success: true,
    data: record,
  });
});

/* ---------------- START SERVER ---------------- */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

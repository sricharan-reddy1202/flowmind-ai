const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  executeWorkflow,
} = require("../controllers/workflowController");

router.post(
  "/execute",
  protect,
  executeWorkflow
);

module.exports = router;